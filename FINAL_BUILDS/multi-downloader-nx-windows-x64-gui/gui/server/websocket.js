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
Object.defineProperty(exports, '__esModule', { value: true });
exports.PublicWebSocket = void 0;
const ws_1 = __importStar(require('ws'));
const events_1 = require('events');
const _1 = require('.');
const module_cfg_loader_1 = require('../../modules/module.cfg-loader');
const log_1 = require('../../modules/log');
class ExternalEvent extends events_1.EventEmitter {}
class WebSocketHandler {
	constructor(server) {
		this.events = new ExternalEvent();
		this.wsServer = new ws_1.default.WebSocketServer({ noServer: true, path: '/private' });
		this.wsServer.on('connection', (socket, req) => {
			log_1.console.info(`[WS] Connection from '${req.socket.remoteAddress}'`);
			socket.on('error', (er) => log_1.console.error(`[WS] ${er}`));
			socket.on('message', (data) => {
				const json = JSON.parse(data.toString());
				this.events.emit(json.name, json, (data) => {
					this.wsServer.clients.forEach((client) => {
						if (client.readyState !== ws_1.WebSocket.OPEN) return;
						client.send(
							JSON.stringify({
								data,
								id: json.id,
								name: json.name
							}),
							(er) => {
								if (er) log_1.console.error(`[WS] ${er}`);
							}
						);
					});
				});
			});
		});
		server.on('upgrade', (request, socket, head) => {
			if (!this.wsServer.shouldHandle(request)) return;
			if (!this.authenticate(request)) {
				socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
				socket.destroy();
				log_1.console.info(`[WS] ${request.socket.remoteAddress} tried to connect but used a wrong password.`);
				return;
			}
			this.wsServer.handleUpgrade(request, socket, head, (socket) => {
				this.wsServer.emit('connection', socket, request);
			});
		});
	}
	sendMessage(data) {
		this.wsServer.clients.forEach((client) => {
			if (client.readyState !== ws_1.WebSocket.OPEN) return;
			client.send(JSON.stringify(data), (er) => {
				if (er) log_1.console.error(`[WS] ${er}`);
			});
		});
	}
	authenticate(request) {
		const search = new URL(`http://${request.headers.host}${request.url}`).searchParams;
		return _1.cfg.gui.password === (search.get('password') ?? undefined);
	}
}
exports.default = WebSocketHandler;
class PublicWebSocket {
	constructor(server) {
		this.state = (0, module_cfg_loader_1.getState)();
		this.wsServer = new ws_1.default.WebSocketServer({ noServer: true, path: '/public' });
		this.wsServer.on('connection', (socket, req) => {
			log_1.console.info(`[WS] Connection to public ws from '${req.socket.remoteAddress}'`);
			socket.on('error', (er) => log_1.console.error(`[WS] ${er}`));
			socket.on('message', (msg) => {
				const data = JSON.parse(msg.toString());
				switch (data.name) {
					case 'isSetup':
						this.send(socket, data.id, data.name, this.state.setup);
						break;
					case 'requirePassword':
						this.send(socket, data.id, data.name, _1.cfg.gui.password !== undefined);
						break;
				}
			});
		});
		server.on('upgrade', (request, socket, head) => {
			if (!this.wsServer.shouldHandle(request)) return;
			this.wsServer.handleUpgrade(request, socket, head, (socket) => {
				this.wsServer.emit('connection', socket, request);
			});
		});
	}
	send(client, id, name, data) {
		client.send(
			JSON.stringify({
				data,
				id,
				name
			}),
			(er) => {
				if (er) log_1.console.error(`[WS] ${er}`);
			}
		);
	}
}
exports.PublicWebSocket = PublicWebSocket;
