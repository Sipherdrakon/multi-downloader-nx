'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const open_1 = __importDefault(require('open'));
const __1 = require('..');
const path_1 = __importDefault(require('path'));
const log_1 = require('../../../modules/log');
const module_cfg_loader_1 = require('../../../modules/module.cfg-loader');
const package_json_1 = __importDefault(require('../../../package.json'));
class Base {
	constructor(ws) {
		this.ws = ws;
		this.name = 'default';
		this.downloading = false;
		this.queue = [];
		this.workOnQueue = false;
		this.state = (0, module_cfg_loader_1.getState)();
	}
	version() {
		return new Promise(() => {
			return package_json_1.default.version;
		});
	}
	initState() {
		if (this.state.services[this.name]) {
			this.queue = this.state.services[this.name].queue;
			this.queueChange();
		} else {
			this.state.services[this.name] = {
				queue: []
			};
		}
	}
	setDownloading(downloading) {
		this.downloading = downloading;
	}
	getDownloading() {
		return this.downloading;
	}
	alertError(error) {
		log_1.console.error(`${error}`);
	}
	makeProgressHandler(videoInfo) {
		return (data) => {
			this.sendMessage({
				name: 'progress',
				data: {
					downloadInfo: videoInfo,
					progress: data
				}
			});
		};
	}
	sendMessage(data) {
		this.ws.sendMessage(data);
	}
	async isDownloading() {
		return this.downloading;
	}
	async openFolder(folderType) {
		switch (folderType) {
			case 'content':
				(0, open_1.default)(__1.cfg.dir.content);
				break;
			case 'config':
				(0, open_1.default)(__1.cfg.dir.config);
				break;
		}
	}
	async openFile(data) {
		switch (data[0]) {
			case 'config':
				(0, open_1.default)(path_1.default.join(__1.cfg.dir.config, data[1]));
				break;
			case 'content':
				throw new Error('No subfolders');
		}
	}
	async openURL(data) {
		(0, open_1.default)(data);
	}
	async getQueue() {
		return this.queue;
	}
	async removeFromQueue(index) {
		this.queue.splice(index, 1);
		this.queueChange();
	}
	async clearQueue() {
		this.queue = [];
		this.queueChange();
	}
	addToQueue(data) {
		this.queue = this.queue.concat(...data);
		this.queueChange();
	}
	setDownloadQueue(data) {
		this.workOnQueue = data;
		this.queueChange();
	}
	async getDownloadQueue() {
		return this.workOnQueue;
	}
	async queueChange() {
		this.sendMessage({ name: 'queueChange', data: this.queue });
		if (this.workOnQueue && this.queue.length > 0 && !(await this.isDownloading())) {
			this.setDownloading(true);
			this.sendMessage({ name: 'current', data: this.queue[0] });
			this.downloadItem(this.queue[0]);
			this.queue = this.queue.slice(1);
			this.queueChange();
		}
		this.state.services[this.name].queue = this.queue;
		(0, module_cfg_loader_1.setState)(this.state);
	}
	async onFinish() {
		this.sendMessage({ name: 'current', data: undefined });
		this.queueChange();
	}
	//Overriten
	// eslint-disable-next-line
	async downloadItem(_) {
		throw new Error('downloadItem not overriden');
	}
}
exports.default = Base;
