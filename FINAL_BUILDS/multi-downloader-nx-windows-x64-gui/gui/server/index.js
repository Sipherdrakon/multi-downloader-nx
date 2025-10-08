'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.cfg = exports.app = void 0;
const express_1 = __importDefault(require('express'));
const module_cfg_loader_1 = require('../../modules/module.cfg-loader');
const cors_1 = __importDefault(require('cors'));
const serviceHandler_1 = __importDefault(require('./serviceHandler'));
const open_1 = __importDefault(require('open'));
const path_1 = __importDefault(require('path'));
const websocket_1 = require('./websocket');
const log_1 = require('../../modules/log');
const package_json_1 = __importDefault(require('../../package.json'));
process.title = 'AniDL';
(0, module_cfg_loader_1.ensureConfig)();
const cfg = (0, module_cfg_loader_1.loadCfg)();
exports.cfg = cfg;
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(module_cfg_loader_1.workingDir, 'gui', 'server', 'build'), { maxAge: 1000 * 60 * 20 }));
log_1.console.info(`\n=== Multi Downloader NX GUI ${package_json_1.default.version} ===\n`);
const server = app.listen(cfg.gui.port, () => {
	log_1.console.info(`GUI server started on port ${cfg.gui.port}`);
});
new websocket_1.PublicWebSocket(server);
new serviceHandler_1.default(server);
(0, open_1.default)(`http://localhost:${cfg.gui.port}`);
