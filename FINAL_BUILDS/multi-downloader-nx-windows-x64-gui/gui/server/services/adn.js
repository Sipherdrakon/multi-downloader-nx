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
const adn_1 = __importDefault(require('../../../adn'));
const module_args_1 = require('../../../modules/module.args');
const module_langsData_1 = require('../../../modules/module.langsData');
const base_1 = __importDefault(require('./base'));
const log_1 = require('../../../modules/log');
const yargs = __importStar(require('../../../modules/module.app-args'));
class ADNHandler extends base_1.default {
	constructor(ws) {
		super(ws);
		this.name = 'adn';
		this.adn = new adn_1.default();
		this.initState();
		this.getDefaults();
	}
	getDefaults() {
		const _default = yargs.appArgv(this.adn.cfg.cli, true);
		if (['fr', 'de'].includes(_default.locale)) this.adn.locale = _default.locale;
	}
	async auth(data) {
		return this.adn.doAuth(data);
	}
	async checkToken() {
		//TODO: implement proper method to check token
		return { isOk: true, value: undefined };
	}
	async search(data) {
		log_1.console.debug(`Got search options: ${JSON.stringify(data)}`);
		const search = await this.adn.doSearch(data);
		if (!search.isOk) {
			return search;
		}
		return { isOk: true, value: search.value };
	}
	async handleDefault(name) {
		return (0, module_args_1.getDefault)(name, this.adn.cfg.cli);
	}
	async availableDubCodes() {
		const dubLanguageCodesArray = [];
		for (const language of module_langsData_1.languages) {
			if (language.adn_locale) dubLanguageCodesArray.push(language.code);
		}
		return [...new Set(dubLanguageCodesArray)];
	}
	async availableSubCodes() {
		const subLanguageCodesArray = [];
		for (const language of module_langsData_1.languages) {
			if (language.adn_locale) subLanguageCodesArray.push(language.locale);
		}
		return ['all', 'none', ...new Set(subLanguageCodesArray)];
	}
	async resolveItems(data) {
		const parse = parseInt(data.id);
		if (isNaN(parse) || parse <= 0) return false;
		log_1.console.debug(`Got resolve options: ${JSON.stringify(data)}`);
		const res = await this.adn.selectShow(parseInt(data.id), data.e, data.but, data.all);
		if (!res.isOk || !res.value) return res.isOk;
		this.addToQueue(
			res.value.map((a) => {
				return {
					...data,
					ids: [a.id],
					title: a.title,
					parent: {
						title: a.show.shortTitle,
						season: a.season
					},
					e: a.shortNumber,
					image: a.image,
					episode: a.shortNumber
				};
			})
		);
		return true;
	}
	async listEpisodes(id) {
		const parse = parseInt(id);
		if (isNaN(parse) || parse <= 0) return { isOk: false, reason: new Error('The ID is invalid') };
		const request = await this.adn.listShow(parse);
		if (!request.isOk || !request.value) return { isOk: false, reason: new Error('Unknown upstream error, check for additional logs') };
		return {
			isOk: true,
			value: request.value.videos.map(function (item) {
				return {
					e: item.shortNumber,
					lang: [],
					name: item.title,
					season: item.season,
					seasonTitle: item.show.title,
					episode: item.shortNumber,
					id: item.id + '',
					img: item.image,
					description: item.summary,
					time: item.duration + ''
				};
			})
		};
	}
	async downloadItem(data) {
		this.setDownloading(true);
		log_1.console.debug(`Got download options: ${JSON.stringify(data)}`);
		const _default = yargs.appArgv(this.adn.cfg.cli, true);
		const res = await this.adn.selectShow(parseInt(data.id), data.e, false, false);
		if (res.isOk) {
			for (const select of res.value) {
				if (
					!(await this.adn.getEpisode(select, {
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
						hslang: data.hslang || 'none',
						dubLang: data.dubLang
					}))
				) {
					const er = new Error(`Unable to download episode ${data.e} from ${data.id}`);
					er.name = 'Download error';
					this.alertError(er);
				}
			}
		} else {
			this.alertError(new Error('Failed to download episode, check for additional logs.'));
		}
		this.sendMessage({ name: 'finish', data: undefined });
		this.setDownloading(false);
		this.onFinish();
	}
}
exports.default = ADNHandler;
