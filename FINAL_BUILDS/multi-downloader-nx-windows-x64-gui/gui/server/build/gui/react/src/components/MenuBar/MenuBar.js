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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var MessageChannel_1 = require("../../provider/MessageChannel");
var useStore_1 = __importDefault(require("../../hooks/useStore"));
var MenuBar = function () {
    var _a = __read(react_1.default.useState(), 2), openMenu = _a[0], setMenuOpen = _a[1];
    var _b = __read(react_1.default.useState(null), 2), anchorEl = _b[0], setAnchorEl = _b[1];
    var _c = __read((0, useStore_1.default)(), 2), store = _c[0], dispatch = _c[1];
    var messageChannel = react_1.default.useContext(MessageChannel_1.messageChannelContext);
    react_1.default.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!messageChannel || store.version !== '')
                            return [2 /*return*/];
                        _a = dispatch;
                        _b = {
                            type: 'version'
                        };
                        return [4 /*yield*/, messageChannel.version()];
                    case 1:
                        _a.apply(void 0, [(_b.payload = _c.sent(),
                                _b)]);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [messageChannel]);
    var transformService = function (service) {
        switch (service) {
            case 'crunchy':
                return 'Crunchyroll';
            case 'hidive':
                return 'Hidive';
            case 'adn':
                return 'AnimationDigitalNetwork';
        }
    };
    var msg = react_1.default.useContext(MessageChannel_1.messageChannelContext);
    var handleClick = function (event, n) {
        setAnchorEl(event.currentTarget);
        setMenuOpen(n);
    };
    var handleClose = function () {
        setAnchorEl(null);
        setMenuOpen(undefined);
    };
    if (!msg)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'flex', marginBottom: '1rem', width: '100%', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { position: 'relative', left: '0%', width: '50%' }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { onClick: function (e) { return handleClick(e, 'settings'); }, children: "Settings" }), (0, jsx_runtime_1.jsx)(material_1.Button, { onClick: function (e) { return handleClick(e, 'help'); }, children: "Help" })] }), (0, jsx_runtime_1.jsxs)(material_1.Menu, { open: openMenu === 'settings', anchorEl: anchorEl, onClose: handleClose, children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, { onClick: function () {
                            msg.openFolder('config');
                            handleClose();
                        }, children: "Open settings folder" }), (0, jsx_runtime_1.jsx)(material_1.MenuItem, { onClick: function () {
                            msg.openFile(['config', 'bin-path.yml']);
                            handleClose();
                        }, children: "Open FFmpeg/Mkvmerge file" }), (0, jsx_runtime_1.jsx)(material_1.MenuItem, { onClick: function () {
                            msg.openFile(['config', 'cli-defaults.yml']);
                            handleClose();
                        }, children: "Open advanced options" }), (0, jsx_runtime_1.jsx)(material_1.MenuItem, { onClick: function () {
                            msg.openFolder('content');
                            handleClose();
                        }, children: "Open output path" })] }), (0, jsx_runtime_1.jsxs)(material_1.Menu, { open: openMenu === 'help', anchorEl: anchorEl, onClose: handleClose, children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, { onClick: function () {
                            msg.openURL('https://github.com/anidl/multi-downloader-nx');
                            handleClose();
                        }, children: "GitHub" }), (0, jsx_runtime_1.jsx)(material_1.MenuItem, { onClick: function () {
                            msg.openURL('https://github.com/anidl/multi-downloader-nx/issues/new?assignees=AnimeDL,AnidlSupport&labels=bug&template=bug.yml&title=BUG');
                            handleClose();
                        }, children: "Report a bug" }), (0, jsx_runtime_1.jsx)(material_1.MenuItem, { onClick: function () {
                            msg.openURL('https://github.com/anidl/multi-downloader-nx/graphs/contributors');
                            handleClose();
                        }, children: "Contributors" }), (0, jsx_runtime_1.jsx)(material_1.MenuItem, { onClick: function () {
                            msg.openURL('https://discord.gg/qEpbWen5vq');
                            handleClose();
                        }, children: "Discord" }), (0, jsx_runtime_1.jsxs)(material_1.MenuItem, { onClick: function () {
                            handleClose();
                        }, children: ["Version: ", store.version] })] }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h5", color: "text.primary", children: transformService(store.service) })] }));
};
exports.default = MenuBar;
