'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const module_cfg_loader_1 = require('../../modules/module.cfg-loader');
const crunchyroll_1 = __importDefault(require('./services/crunchyroll'));
const hidive_1 = __importDefault(require('./services/hidive'));
const adn_1 = __importDefault(require('./services/adn'));
const websocket_1 = __importDefault(require('./websocket'));
const package_json_1 = __importDefault(require('../../package.json'));
class ServiceHandler {
	constructor(server) {
		this.service = undefined;
		this.ws = new websocket_1.default(server);
		this.handleMessages();
		this.state = (0, module_cfg_loader_1.getState)();
	}
	handleMessages() {
		this.ws.events.on('setupServer', ({ data }, respond) => {
			(0, module_cfg_loader_1.writeYamlCfgFile)('gui', data);
			this.state.setup = true;
			(0, module_cfg_loader_1.setState)(this.state);
			respond(true);
			process.exit(0);
		});
		this.ws.events.on('setup', ({ data }) => {
			if (data === 'crunchy') {
				this.service = new crunchyroll_1.default(this.ws);
			} else if (data === 'hidive') {
				this.service = new hidive_1.default(this.ws);
			} else if (data === 'adn') {
				this.service = new adn_1.default(this.ws);
			}
		});
		this.ws.events.on('changeProvider', async (_, respond) => {
			if (await this.service?.isDownloading()) return respond(false);
			this.service = undefined;
			respond(true);
		});
		this.ws.events.on('auth', async ({ data }, respond) => {
			if (this.service === undefined) return respond({ isOk: false, reason: new Error('No service selected') });
			respond(await this.service.auth(data));
		});
		this.ws.events.on('version', async (_, respond) => {
			respond(package_json_1.default.version);
		});
		this.ws.events.on('type', async (_, respond) => respond(this.service === undefined ? undefined : this.service.name));
		this.ws.events.on('checkToken', async (_, respond) => {
			if (this.service === undefined) return respond({ isOk: false, reason: new Error('No service selected') });
			respond(await this.service.checkToken());
		});
		this.ws.events.on('search', async ({ data }, respond) => {
			if (this.service === undefined) return respond({ isOk: false, reason: new Error('No service selected') });
			respond(await this.service.search(data));
		});
		this.ws.events.on('default', async ({ data }, respond) => {
			if (this.service === undefined) return respond({ isOk: false, reason: new Error('No service selected') });
			respond(await this.service.handleDefault(data));
		});
		this.ws.events.on('availableDubCodes', async (_, respond) => {
			if (this.service === undefined) return respond([]);
			respond(await this.service.availableDubCodes());
		});
		this.ws.events.on('availableSubCodes', async (_, respond) => {
			if (this.service === undefined) return respond([]);
			respond(await this.service.availableSubCodes());
		});
		this.ws.events.on('resolveItems', async ({ data }, respond) => {
			if (this.service === undefined) return respond(false);
			respond(await this.service.resolveItems(data));
		});
		this.ws.events.on('listEpisodes', async ({ data }, respond) => {
			if (this.service === undefined) return respond({ isOk: false, reason: new Error('No service selected') });
			respond(await this.service.listEpisodes(data));
		});
		this.ws.events.on('downloadItem', async ({ data }, respond) => {
			this.service?.downloadItem(data);
			respond(undefined);
		});
		this.ws.events.on('openFolder', async ({ data }, respond) => {
			this.service?.openFolder(data);
			respond(undefined);
		});
		this.ws.events.on('openFile', async ({ data }, respond) => {
			this.service?.openFile(data);
			respond(undefined);
		});
		this.ws.events.on('openURL', async ({ data }, respond) => {
			this.service?.openURL(data);
			respond(undefined);
		});
		this.ws.events.on('getQueue', async (_, respond) => {
			respond((await this.service?.getQueue()) ?? []);
		});
		this.ws.events.on('removeFromQueue', async ({ data }, respond) => {
			this.service?.removeFromQueue(data);
			respond(undefined);
		});
		this.ws.events.on('clearQueue', async (_, respond) => {
			this.service?.clearQueue();
			respond(undefined);
		});
		this.ws.events.on('setDownloadQueue', async ({ data }, respond) => {
			this.service?.setDownloadQueue(data);
			respond(undefined);
		});
		this.ws.events.on('getDownloadQueue', async (_, respond) => {
			respond((await this.service?.getDownloadQueue()) ?? false);
		});
		this.ws.events.on('isDownloading', async (_, respond) => respond((await this.service?.isDownloading()) ?? false));
	}
}
exports.default = ServiceHandler;
