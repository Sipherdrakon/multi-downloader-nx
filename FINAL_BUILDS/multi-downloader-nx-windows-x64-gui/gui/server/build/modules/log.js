"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.console = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var module_cfg_loader_1 = require("./module.cfg-loader");
var log4js_1 = __importDefault(require("log4js"));
var logFolder = path_1.default.join(module_cfg_loader_1.workingDir, 'logs');
var latest = path_1.default.join(logFolder, 'latest.log');
var makeLogFolder = function () {
    if (!fs_1.default.existsSync(logFolder))
        fs_1.default.mkdirSync(logFolder);
    if (fs_1.default.existsSync(latest)) {
        var stats = fs_1.default.statSync(latest);
        fs_1.default.renameSync(latest, path_1.default.join(logFolder, "".concat(stats.mtimeMs, ".log")));
    }
};
var makeLogger = function () {
    global.console.log =
        global.console.info =
            global.console.warn =
                global.console.error =
                    global.console.debug =
                        function () {
                            var data = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                data[_i] = arguments[_i];
                            }
                            exports.console.info.apply(exports.console, __spreadArray([data.length >= 1 ? data.shift() : ''], __read(data), false));
                        };
    makeLogFolder();
    log4js_1.default.configure({
        appenders: {
            console: {
                type: 'console',
                layout: {
                    type: 'pattern',
                    pattern: process.env.isGUI === 'true' ? '%[%x{info}%m%]' : '%x{info}%m',
                    tokens: {
                        info: function (ev) {
                            return ev.level.levelStr === 'INFO' ? '' : "[".concat(ev.level.levelStr, "] ");
                        }
                    }
                }
            },
            file: {
                type: 'file',
                filename: latest,
                layout: {
                    type: 'pattern',
                    pattern: '%x{info}%m',
                    tokens: {
                        info: function (ev) {
                            return ev.level.levelStr === 'INFO' ? '' : "[".concat(ev.level.levelStr, "] ");
                        }
                    }
                }
            }
        },
        categories: {
            default: {
                appenders: ['console', 'file'],
                level: 'all'
            }
        }
    });
};
var getLogger = function () {
    if (!log4js_1.default.isConfigured())
        makeLogger();
    return log4js_1.default.getLogger();
};
exports.console = getLogger();
