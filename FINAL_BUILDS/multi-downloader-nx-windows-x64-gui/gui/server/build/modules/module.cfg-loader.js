"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cfgDir = exports.hdPflCfgFile = exports.sessCfgFile = exports.writeYamlCfgFile = exports.setState = exports.getState = exports.loadHDProfile = exports.saveHDProfile = exports.loadNewHDToken = exports.saveNewHDToken = exports.loadHDToken = exports.saveHDToken = exports.loadHDSession = exports.saveHDSession = exports.loadADNToken = exports.saveADNToken = exports.loadCRToken = exports.saveCRToken = exports.loadCRSession = exports.saveCRSession = exports.loadCfg = exports.loadBinCfg = exports.ensureConfig = exports.workingDir = void 0;
var path_1 = __importDefault(require("path"));
var yaml_1 = __importDefault(require("yaml"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var lookpath_1 = require("lookpath");
var log_1 = require("./log");
// new-cfg
var workingDir = process.pkg
    ? path_1.default.dirname(process.execPath)
    : process.env.contentDirectory
        ? process.env.contentDirectory
        : path_1.default.join(__dirname, '/..');
exports.workingDir = workingDir;
var binCfgFile = path_1.default.join(workingDir, 'config', 'bin-path');
var dirCfgFile = path_1.default.join(workingDir, 'config', 'dir-path');
var guiCfgFile = path_1.default.join(workingDir, 'config', 'gui');
var cliCfgFile = path_1.default.join(workingDir, 'config', 'cli-defaults');
var hdPflCfgFile = path_1.default.join(workingDir, 'config', 'hd_profile');
exports.hdPflCfgFile = hdPflCfgFile;
var sessCfgFile = {
    cr: path_1.default.join(workingDir, 'config', 'cr_sess'),
    hd: path_1.default.join(workingDir, 'config', 'hd_sess'),
    adn: path_1.default.join(workingDir, 'config', 'adn_sess')
};
exports.sessCfgFile = sessCfgFile;
var stateFile = path_1.default.join(workingDir, 'config', 'guistate');
var tokenFile = {
    cr: path_1.default.join(workingDir, 'config', 'cr_token'),
    hd: path_1.default.join(workingDir, 'config', 'hd_token'),
    hdNew: path_1.default.join(workingDir, 'config', 'hd_new_token'),
    adn: path_1.default.join(workingDir, 'config', 'adn_token')
};
var ensureConfig = function () {
    if (!fs_extra_1.default.existsSync(path_1.default.join(workingDir, 'config')))
        fs_extra_1.default.mkdirSync(path_1.default.join(workingDir, 'config'));
    if (process.env.contentDirectory)
        [binCfgFile, dirCfgFile, cliCfgFile, guiCfgFile].forEach(function (a) {
            if (!fs_extra_1.default.existsSync("".concat(a, ".yml")))
                fs_extra_1.default.copyFileSync(path_1.default.join(__dirname, '..', 'config', "".concat(path_1.default.basename(a), ".yml")), "".concat(a, ".yml"));
        });
};
exports.ensureConfig = ensureConfig;
var loadYamlCfgFile = function (file, isSess) {
    if (fs_extra_1.default.existsSync("".concat(file, ".user.yml")) && !isSess) {
        file += '.user';
    }
    file += '.yml';
    if (fs_extra_1.default.existsSync(file)) {
        try {
            return yaml_1.default.parse(fs_extra_1.default.readFileSync(file, 'utf8'));
        }
        catch (e) {
            log_1.console.error('[ERROR]', e);
            return {};
        }
    }
    return {};
};
var writeYamlCfgFile = function (file, data) {
    var fn = path_1.default.join(workingDir, 'config', "".concat(file, ".yml"));
    if (fs_extra_1.default.existsSync(fn))
        fs_extra_1.default.removeSync(fn);
    fs_extra_1.default.writeFileSync(fn, yaml_1.default.stringify(data));
};
exports.writeYamlCfgFile = writeYamlCfgFile;
var loadCfg = function () {
    var e_1, _a;
    // load cfgs
    var defaultCfg = {
        bin: {},
        dir: loadYamlCfgFile(dirCfgFile),
        cli: loadYamlCfgFile(cliCfgFile),
        gui: loadYamlCfgFile(guiCfgFile)
    };
    var defaultDirs = {
        fonts: '${wdir}/fonts/',
        content: '${wdir}/videos/',
        trash: '${wdir}/videos/_trash/',
        config: '${wdir}/config'
    };
    if (typeof defaultCfg.dir !== 'object' || defaultCfg.dir === null || Array.isArray(defaultCfg.dir)) {
        defaultCfg.dir = defaultDirs;
    }
    var keys = Object.keys(defaultDirs);
    try {
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            if (!Object.prototype.hasOwnProperty.call(defaultCfg.dir, key) || typeof defaultCfg.dir[key] !== 'string') {
                defaultCfg.dir[key] = defaultDirs[key];
            }
            if (!path_1.default.isAbsolute(defaultCfg.dir[key])) {
                defaultCfg.dir[key] = path_1.default.join(workingDir, defaultCfg.dir[key].replace(/^\${wdir}/, ''));
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (!fs_extra_1.default.existsSync(defaultCfg.dir.content)) {
        try {
            fs_extra_1.default.ensureDirSync(defaultCfg.dir.content);
        }
        catch (e) {
            log_1.console.error('Content directory not accessible!');
            return defaultCfg;
        }
    }
    if (!fs_extra_1.default.existsSync(defaultCfg.dir.trash)) {
        defaultCfg.dir.trash = defaultCfg.dir.content;
    }
    // output
    return defaultCfg;
};
exports.loadCfg = loadCfg;
var loadBinCfg = function () { return __awaiter(void 0, void 0, void 0, function () {
    var binCfg, defaultBin, keys, keys_2, keys_2_1, dir, _a, _b, binFile, e_2_1;
    var e_2, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                binCfg = loadYamlCfgFile(binCfgFile);
                defaultBin = {
                    ffmpeg: 'ffmpeg',
                    mkvmerge: 'mkvmerge',
                    ffprobe: 'ffprobe',
                    mp4decrypt: 'mp4decrypt',
                    shaka: 'shaka-packager'
                };
                keys = Object.keys(defaultBin);
                _d.label = 1;
            case 1:
                _d.trys.push([1, 7, 8, 9]);
                keys_2 = __values(keys), keys_2_1 = keys_2.next();
                _d.label = 2;
            case 2:
                if (!!keys_2_1.done) return [3 /*break*/, 6];
                dir = keys_2_1.value;
                if (!Object.prototype.hasOwnProperty.call(binCfg, dir) || typeof binCfg[dir] != 'string') {
                    binCfg[dir] = defaultBin[dir];
                }
                if (binCfg[dir].match(/^\${wdir}/)) {
                    binCfg[dir] = binCfg[dir].replace(/^\${wdir}/, '');
                    binCfg[dir] = path_1.default.join(workingDir, binCfg[dir]);
                }
                if (!path_1.default.isAbsolute(binCfg[dir])) {
                    binCfg[dir] = path_1.default.join(workingDir, binCfg[dir]);
                }
                _a = binCfg;
                _b = dir;
                return [4 /*yield*/, (0, lookpath_1.lookpath)(binCfg[dir])];
            case 3:
                _a[_b] = _d.sent();
                binCfg[dir] = binCfg[dir] ? binCfg[dir] : undefined;
                if (!!binCfg[dir]) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, lookpath_1.lookpath)(path_1.default.basename(defaultBin[dir]))];
            case 4:
                binFile = _d.sent();
                binCfg[dir] = binFile ? binFile : binCfg[dir];
                _d.label = 5;
            case 5:
                keys_2_1 = keys_2.next();
                return [3 /*break*/, 2];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_2_1 = _d.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (keys_2_1 && !keys_2_1.done && (_c = keys_2.return)) _c.call(keys_2);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/, binCfg];
        }
    });
}); };
exports.loadBinCfg = loadBinCfg;
var loadCRSession = function () {
    var e_3, _a;
    var session = loadYamlCfgFile(sessCfgFile.cr, true);
    if (typeof session !== 'object' || session === null || Array.isArray(session)) {
        session = {};
    }
    try {
        for (var _b = __values(Object.keys(session)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var cv = _c.value;
            if (typeof session[cv] !== 'object' || session[cv] === null || Array.isArray(session[cv])) {
                session[cv] = {};
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return session;
};
exports.loadCRSession = loadCRSession;
var saveCRSession = function (data) {
    var cfgFolder = path_1.default.dirname(sessCfgFile.cr);
    try {
        fs_extra_1.default.ensureDirSync(cfgFolder);
        fs_extra_1.default.writeFileSync("".concat(sessCfgFile.cr, ".yml"), yaml_1.default.stringify(data));
    }
    catch (e) {
        log_1.console.error("Can't save session file to disk!");
    }
};
exports.saveCRSession = saveCRSession;
var loadCRToken = function () {
    var token = loadYamlCfgFile(tokenFile.cr, true);
    if (typeof token !== 'object' || token === null || Array.isArray(token)) {
        token = {};
    }
    return token;
};
exports.loadCRToken = loadCRToken;
var saveCRToken = function (data) {
    var cfgFolder = path_1.default.dirname(tokenFile.cr);
    try {
        fs_extra_1.default.ensureDirSync(cfgFolder);
        fs_extra_1.default.writeFileSync("".concat(tokenFile.cr, ".yml"), yaml_1.default.stringify(data));
    }
    catch (e) {
        log_1.console.error("Can't save token file to disk!");
    }
};
exports.saveCRToken = saveCRToken;
var loadADNToken = function () {
    var token = loadYamlCfgFile(tokenFile.adn, true);
    if (typeof token !== 'object' || token === null || Array.isArray(token)) {
        token = {};
    }
    return token;
};
exports.loadADNToken = loadADNToken;
var saveADNToken = function (data) {
    var cfgFolder = path_1.default.dirname(tokenFile.adn);
    try {
        fs_extra_1.default.ensureDirSync(cfgFolder);
        fs_extra_1.default.writeFileSync("".concat(tokenFile.adn, ".yml"), yaml_1.default.stringify(data));
    }
    catch (e) {
        log_1.console.error("Can't save token file to disk!");
    }
};
exports.saveADNToken = saveADNToken;
var loadHDSession = function () {
    var e_4, _a;
    var session = loadYamlCfgFile(sessCfgFile.hd, true);
    if (typeof session !== 'object' || session === null || Array.isArray(session)) {
        session = {};
    }
    try {
        for (var _b = __values(Object.keys(session)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var cv = _c.value;
            if (typeof session[cv] !== 'object' || session[cv] === null || Array.isArray(session[cv])) {
                session[cv] = {};
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return session;
};
exports.loadHDSession = loadHDSession;
var saveHDSession = function (data) {
    var cfgFolder = path_1.default.dirname(sessCfgFile.hd);
    try {
        fs_extra_1.default.ensureDirSync(cfgFolder);
        fs_extra_1.default.writeFileSync("".concat(sessCfgFile.hd, ".yml"), yaml_1.default.stringify(data));
    }
    catch (e) {
        log_1.console.error("Can't save session file to disk!");
    }
};
exports.saveHDSession = saveHDSession;
var loadHDToken = function () {
    var token = loadYamlCfgFile(tokenFile.hd, true);
    if (typeof token !== 'object' || token === null || Array.isArray(token)) {
        token = {};
    }
    return token;
};
exports.loadHDToken = loadHDToken;
var saveHDToken = function (data) {
    var cfgFolder = path_1.default.dirname(tokenFile.hd);
    try {
        fs_extra_1.default.ensureDirSync(cfgFolder);
        fs_extra_1.default.writeFileSync("".concat(tokenFile.hd, ".yml"), yaml_1.default.stringify(data));
    }
    catch (e) {
        log_1.console.error("Can't save token file to disk!");
    }
};
exports.saveHDToken = saveHDToken;
var saveHDProfile = function (data) {
    var cfgFolder = path_1.default.dirname(hdPflCfgFile);
    try {
        fs_extra_1.default.ensureDirSync(cfgFolder);
        fs_extra_1.default.writeFileSync("".concat(hdPflCfgFile, ".yml"), yaml_1.default.stringify(data));
    }
    catch (e) {
        log_1.console.error("Can't save profile file to disk!");
    }
};
exports.saveHDProfile = saveHDProfile;
var loadHDProfile = function () {
    var profile = loadYamlCfgFile(hdPflCfgFile, true);
    if (typeof profile !== 'object' || profile === null || Array.isArray(profile) || Object.keys(profile).length === 0) {
        profile = {
            // base
            ipAddress: '',
            xNonce: '',
            xSignature: '',
            // personal
            visitId: '',
            // profile data
            profile: {
                userId: 0,
                profileId: 0,
                deviceId: ''
            }
        };
    }
    return profile;
};
exports.loadHDProfile = loadHDProfile;
var loadNewHDToken = function () {
    var token = loadYamlCfgFile(tokenFile.hdNew, true);
    if (typeof token !== 'object' || token === null || Array.isArray(token)) {
        token = {};
    }
    return token;
};
exports.loadNewHDToken = loadNewHDToken;
var saveNewHDToken = function (data) {
    var cfgFolder = path_1.default.dirname(tokenFile.hdNew);
    try {
        fs_extra_1.default.ensureDirSync(cfgFolder);
        fs_extra_1.default.writeFileSync("".concat(tokenFile.hdNew, ".yml"), yaml_1.default.stringify(data));
    }
    catch (e) {
        log_1.console.error("Can't save token file to disk!");
    }
};
exports.saveNewHDToken = saveNewHDToken;
var cfgDir = path_1.default.join(workingDir, 'config');
exports.cfgDir = cfgDir;
var getState = function () {
    var fn = "".concat(stateFile, ".json");
    if (!fs_extra_1.default.existsSync(fn)) {
        return {
            setup: false,
            services: {}
        };
    }
    try {
        return JSON.parse(fs_extra_1.default.readFileSync(fn).toString());
    }
    catch (e) {
        log_1.console.error('Invalid state file, regenerating');
        return {
            setup: false,
            services: {}
        };
    }
};
exports.getState = getState;
var setState = function (state) {
    var fn = "".concat(stateFile, ".json");
    try {
        fs_extra_1.default.writeFileSync(fn, JSON.stringify(state, null, 2));
    }
    catch (e) {
        log_1.console.error('Failed to write state file.');
    }
};
exports.setState = setState;
