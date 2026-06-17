import {
	AuthData,
	CheckTokenResponse,
	EpisodeListResponse,
	MessageHandler,
	QueueItem,
	ResolveItemsData,
	ResponseBase,
	SearchData,
	SearchResponse
} from '../../../@types/messageHandler';
import { CrunchyEpMeta } from '../../../@types/crunchyTypes';
import Crunchy from '../../../crunchy';
import { getDefault } from '../../../modules/module.args';
import { languages, subtitleLanguagesFilter } from '../../../modules/module.langsData';
import WebSocketHandler from '../websocket';
import Base from './base';
import { console } from '../../../modules/log';
import * as yargs from '../../../modules/module.app-args';

class CrunchyHandler extends Base implements MessageHandler {
	private crunchy: Crunchy;
	public name = 'crunchy';
	constructor(ws: WebSocketHandler) {
		super(ws);
		this.crunchy = new Crunchy();
		this.crunchy.refreshToken();
		this.initState();
		this.getDefaults();
	}

	public getDefaults() {
		const _default = yargs.appArgv(this.crunchy.cfg.cli, true);
		this.crunchy.locale = _default.locale;
	}

	public async listEpisodes(id: string): Promise<EpisodeListResponse> {
		this.getDefaults();
		await this.crunchy.refreshToken(true);
		const { list } = await this.crunchy.listSeriesID(id);
		if (list.length === 0) {
			const movieList = await this.crunchy.listMovieListingEpisodes(id);
			return { isOk: true, value: movieList };
		}
		return { isOk: true, value: list };
	}

	public async handleDefault(name: string) {
		return getDefault(name, this.crunchy.cfg.cli);
	}

	public async availableDubCodes(): Promise<string[]> {
		const dubLanguageCodesArray: string[] = [];
		for (const language of languages) {
			if (language.cr_locale) dubLanguageCodesArray.push(language.code);
		}
		return [...new Set(dubLanguageCodesArray)];
	}

	public async availableSubCodes(): Promise<string[]> {
		return subtitleLanguagesFilter;
	}

	public async resolveItems(data: ResolveItemsData): Promise<boolean> {
		this.getDefaults();
		await this.crunchy.refreshToken(true);
		console.debug(`Got resolve options: ${JSON.stringify(data)}`);
		const res = await this.crunchy.downloadFromSeriesID(data.id, data);
		if (!res.isOk) return res.isOk;
		this.addToQueue(
			res.value.map((a) => {
				return {
					...data,

					ids: a.data.map((a) => a.mediaId),
					title: a.episodeTitle,
					parent: {
						title: a.seasonTitle,
						season: a.season.toString()
					},
					e: a.e,
					image: a.image,
					episode: a.episodeNumber
				};
			})
		);
		return true;
	}

	public async search(data: SearchData): Promise<SearchResponse> {
		this.getDefaults();
		await this.crunchy.refreshToken(true);
		if (!data['search-type']) data['search-type'] = 'series';
		console.debug(`Got search options: ${JSON.stringify(data)}`);
		const crunchySearch = await this.crunchy.doSearch(data);
		if (!crunchySearch.isOk) {
			this.crunchy.refreshToken();
			return crunchySearch;
		}
		return { isOk: true, value: crunchySearch.value };
	}

	public async checkToken(): Promise<CheckTokenResponse> {
		if (await this.crunchy.getProfile()) {
			return { isOk: true, value: undefined };
		} else {
			return { isOk: false, reason: new Error('') };
		}
	}

	public auth(data: AuthData) {
		return this.crunchy.doAuth(data);
	}

	/** Resolve queue item metadata for download — uses stored media IDs when available. */
	private async resolveForDownload(data: QueueItem): Promise<ResponseBase<CrunchyEpMeta[]>> {
		if (data.ids?.length) {
			const selected = await this.crunchy.getObjectById(data.ids.join(','));
			if (Array.isArray(selected) && selected.length > 0) {
				const seasonNum = parseInt(data.parent.season, 10);
				const queueLang = data.dubLang?.length ? languages.find((l) => l.code === data.dubLang[0]) : undefined;
				const value = selected.map((item) => ({
					...item,
					seriesTitle: item.seriesTitle ?? data.parent.title,
					seasonTitle: item.seasonTitle ?? data.parent.title,
					episodeTitle: item.episodeTitle ?? data.title,
					episodeNumber: item.episodeNumber ?? data.episode,
					e: item.e ?? data.e,
					showID: item.showID ?? data.id,
					seasonID: item.seasonID ?? data.id,
					season: item.season ?? (Number.isNaN(seasonNum) ? 0 : seasonNum),
					image: item.image ?? data.image,
					data: (item.data ?? []).map((d) => ({
						...d,
						lang: d.lang ?? queueLang
					}))
				})) as CrunchyEpMeta[];
				if (value.every((v) => v.data.some((d) => d.playback))) {
					return { isOk: true, value };
				}
			}
		}
		return this.crunchy.downloadFromSeriesID(data.id, {
			dubLang: data.dubLang,
			e: data.e
		});
	}

	public async downloadItem(data: QueueItem) {
		this.getDefaults();
		await this.crunchy.refreshToken(true);
		console.debug(`Got download options: ${JSON.stringify(data)}`);
		this.setDownloading(true);
		const _default = yargs.appArgv(this.crunchy.cfg.cli, true);
		const res = await this.resolveForDownload(data);
		let failed = false;
		let failureError: Error | undefined;
		if (res.isOk) {
			for (const select of res.value) {
				if (
					!(await this.crunchy.downloadEpisode(select, {
						..._default,
						skipsubs: false,
						callbackMaker: this.makeProgressHandler.bind(this),
						q: data.q,
						fileName: data.fileName,
						dlsubs: data.dlsubs,
						dubLang: data.dubLang,
						dlVideoOnce: data.dlVideoOnce,
						force: 'y',
						novids: data.novids,
						noaudio: data.noaudio,
						hslang: data.hslang || 'none',
						all: data.all
					}))
				) {
					failed = true;
					failureError = new Error(`Unable to download episode ${data.e} from ${data.id}`);
					failureError.name = 'Download error';
					break;
				}
			}
		} else {
			failed = true;
			failureError = res.reason instanceof Error ? res.reason : new Error(String(res.reason));
		}
		if (failed && failureError) {
			this.handleItemFailure(data, failureError);
		}
		this.sendMessage({ name: 'finish', data: undefined });
		this.setDownloading(false);
		this.onFinish();
	}
}

export default CrunchyHandler;
