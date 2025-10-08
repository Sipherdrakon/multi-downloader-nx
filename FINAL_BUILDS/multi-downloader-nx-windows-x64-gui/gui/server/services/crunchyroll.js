'use strict';
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k];
						}
					};
				}
				Object.defineProperty(o, k2, desc);
			}
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
			});
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, 'default', { enumerable: true, value: v });
			}
		: function (o, v) {
				o['default'] = v;
			});
var __importStar =
	(this && this.__importStar) ||
	(function () {
		var ownKeys = function (o) {
			ownKeys =
				Object.getOwnPropertyNames ||
				function (o) {
					var ar = [];
					for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
					return ar;
				};
			return ownKeys(o);
		};
		return function (mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== 'default') __createBinding(result, mod, k[i]);
			__setModuleDefault(result, mod);
			return result;
		};
	})();
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const crunchy_1 = __importDefault(require('../../../crunchy'));
const module_args_1 = require('../../../modules/module.args');
const module_langsData_1 = require('../../../modules/module.langsData');
const base_1 = __importDefault(require('./base'));
const log_1 = require('../../../modules/log');
const yargs = __importStar(require('../../../modules/module.app-args'));
class CrunchyHandler extends base_1.default {
	constructor(ws) {
		super(ws);
		this.name = 'crunchy';
		this.crunchy = new crunchy_1.default();
		this.crunchy.refreshToken();
		this.initState();
		this.getDefaults();
	}
	getDefaults() {
		const _default = yargs.appArgv(this.crunchy.cfg.cli, true);
		this.crunchy.locale = _default.locale;
	}
	async listEpisodes(id) {
		this.getDefaults();
		await this.crunchy.refreshToken(true);
		return { isOk: true, value: (await this.crunchy.listSeriesID(id)).list };
	}
	async handleDefault(name) {
		return (0, module_args_1.getDefault)(name, this.crunchy.cfg.cli);
	}
	async availableDubCodes() {
		const dubLanguageCodesArray = [];
		for (const language of module_langsData_1.languages) {
			if (language.cr_locale) dubLanguageCodesArray.push(language.code);
		}
		return [...new Set(dubLanguageCodesArray)];
	}
	async availableSubCodes() {
		return module_langsData_1.subtitleLanguagesFilter;
	}
	async resolveItems(data) {
		this.getDefaults();
		await this.crunchy.refreshToken(true);
		log_1.console.debug(`Got resolve options: ${JSON.stringify(data)}`);
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
	async search(data) {
		this.getDefaults();
		await this.crunchy.refreshToken(true);
		if (!data['search-type']) data['search-type'] = 'series';
		log_1.console.debug(`Got search options: ${JSON.stringify(data)}`);
		const crunchySearch = await this.crunchy.doSearch(data);
		if (!crunchySearch.isOk) {
			this.crunchy.refreshToken();
			return crunchySearch;
		}
		return { isOk: true, value: crunchySearch.value };
	}
	async checkToken() {
		if (await this.crunchy.getProfile()) {
			return { isOk: true, value: undefined };
		} else {
			return { isOk: false, reason: new Error('') };
		}
	}
	auth(data) {
		return this.crunchy.doAuth(data);
	}
	async downloadItem(data) {
		this.getDefaults();
		await this.crunchy.refreshToken(true);
		log_1.console.debug(`Got download options: ${JSON.stringify(data)}`);
		this.setDownloading(true);
		const _default = yargs.appArgv(this.crunchy.cfg.cli, true);
		const res = await this.crunchy.downloadFromSeriesID(data.id, {
			dubLang: data.dubLang,
			e: data.e
		});
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
						dlVideoOnce: data.dlVideoOnce,
						force: 'y',
						novids: data.novids,
						noaudio: data.noaudio,
						hslang: data.hslang || 'none'
					}))
				) {
					const er = new Error(`Unable to download episode ${data.e} from ${data.id}`);
					er.name = 'Download error';
					this.alertError(er);
				}
			}
		} else {
			this.alertError(res.reason);
		}
		this.sendMessage({ name: 'finish', data: undefined });
		this.setDownloading(false);
		this.onFinish();
	}
}
exports.default = CrunchyHandler;
