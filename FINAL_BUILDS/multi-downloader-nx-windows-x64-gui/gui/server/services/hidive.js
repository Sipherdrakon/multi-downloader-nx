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
const hidive_1 = __importDefault(require('../../../hidive'));
const module_args_1 = require('../../../modules/module.args');
const module_langsData_1 = require('../../../modules/module.langsData');
const base_1 = __importDefault(require('./base'));
const log_1 = require('../../../modules/log');
const yargs = __importStar(require('../../../modules/module.app-args'));
class HidiveHandler extends base_1.default {
	constructor(ws) {
		super(ws);
		this.name = 'hidive';
		this.hidive = new hidive_1.default();
		this.initState();
	}
	async auth(data) {
		return this.hidive.doAuth(data);
	}
	async checkToken() {
		//TODO: implement proper method to check token
		return { isOk: true, value: undefined };
	}
	async search(data) {
		log_1.console.debug(`Got search options: ${JSON.stringify(data)}`);
		const hidiveSearch = await this.hidive.doSearch(data);
		if (!hidiveSearch.isOk) {
			return hidiveSearch;
		}
		return { isOk: true, value: hidiveSearch.value };
	}
	async handleDefault(name) {
		return (0, module_args_1.getDefault)(name, this.hidive.cfg.cli);
	}
	async availableDubCodes() {
		const dubLanguageCodesArray = [];
		for (const language of module_langsData_1.languages) {
			if (language.new_hd_locale) dubLanguageCodesArray.push(language.code);
		}
		return [...new Set(dubLanguageCodesArray)];
	}
	async availableSubCodes() {
		const subLanguageCodesArray = [];
		for (const language of module_langsData_1.languages) {
			if (language.new_hd_locale) subLanguageCodesArray.push(language.locale);
		}
		return ['all', 'none', ...new Set(subLanguageCodesArray)];
	}
	async resolveItems(data) {
		const parse = parseInt(data.id);
		if (isNaN(parse) || parse <= 0) return false;
		log_1.console.debug(`Got resolve options: ${JSON.stringify(data)}`);
		const res = await this.hidive.selectSeries(parseInt(data.id), data.e, data.but, data.all);
		if (!res.isOk || !res.value) return res.isOk;
		this.addToQueue(
			res.value.map((item) => {
				return {
					...data,
					ids: [item.id],
					title: item.title,
					parent: {
						title: item.seriesTitle,
						season: item.episodeInformation.seasonNumber + ''
					},
					image: item.thumbnailUrl,
					e: item.episodeInformation.episodeNumber + '',
					episode: item.episodeInformation.episodeNumber + ''
				};
			})
		);
		return true;
	}
	async listEpisodes(id) {
		const parse = parseInt(id);
		if (isNaN(parse) || parse <= 0) return { isOk: false, reason: new Error('The ID is invalid') };
		const request = await this.hidive.listSeries(parse);
		if (!request.isOk || !request.value) return { isOk: false, reason: new Error('Unknown upstream error, check for additional logs') };
		return {
			isOk: true,
			value: request.value.map(function (item) {
				const description = item.description.split('\r\n');
				return {
					e: item.episodeInformation.episodeNumber + '',
					lang: [],
					name: item.title,
					season: item.episodeInformation.seasonNumber + '',
					seasonTitle: request.series.seasons[item.episodeInformation.seasonNumber - 1]?.title ?? request.series.title,
					episode: item.episodeInformation.episodeNumber + '',
					id: item.id + '',
					img: item.thumbnailUrl,
					description: description ? description[0] : '',
					time: ''
				};
			})
		};
	}
	async downloadItem(data) {
		this.setDownloading(true);
		log_1.console.debug(`Got download options: ${JSON.stringify(data)}`);
		const _default = yargs.appArgv(this.hidive.cfg.cli, true);
		const res = await this.hidive.selectSeries(parseInt(data.id), data.e, false, false);
		if (!res.isOk || !res.showData) return this.alertError(new Error('Download failed upstream, check for additional logs'));
		for (const ep of res.value) {
			await this.hidive.downloadEpisode(ep, {
				..._default,
				callbackMaker: this.makeProgressHandler.bind(this),
				dubLang: data.dubLang,
				dlsubs: data.dlsubs,
				fileName: data.fileName,
				q: data.q,
				force: 'y',
				noaudio: data.noaudio,
				novids: data.novids
			});
		}
		this.sendMessage({ name: 'finish', data: undefined });
		this.setDownloading(false);
		this.onFinish();
	}
}
exports.default = HidiveHandler;
