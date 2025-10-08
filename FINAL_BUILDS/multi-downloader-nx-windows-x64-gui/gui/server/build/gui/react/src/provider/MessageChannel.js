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
exports.messageChannelContext = exports.RandomEventHandler = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var useStore_1 = __importDefault(require("../hooks/useStore"));
var material_1 = require("@mui/material");
var uuid_1 = require("uuid");
var notistack_1 = require("notistack");
var icons_material_1 = require("@mui/icons-material");
var RandomEventHandler = /** @class */ (function () {
    function RandomEventHandler() {
        this.handler = {
            progress: [],
            finish: [],
            queueChange: [],
            current: []
        };
    }
    RandomEventHandler.prototype.on = function (name, listener) {
        if (Object.prototype.hasOwnProperty.call(this.handler, name)) {
            this.handler[name].push(listener);
        }
        else {
            this.handler[name] = [listener];
        }
    };
    RandomEventHandler.prototype.emit = function (name, data) {
        var _a;
        ((_a = this.handler[name]) !== null && _a !== void 0 ? _a : []).forEach(function (handler) { return handler(data); });
    };
    RandomEventHandler.prototype.removeListener = function (name, listener) {
        this.handler[name] = this.handler[name].filter(function (a) { return a !== listener; });
    };
    return RandomEventHandler;
}());
exports.RandomEventHandler = RandomEventHandler;
exports.messageChannelContext = react_1.default.createContext(undefined);
function messageAndResponse(socket, msg) {
    return __awaiter(this, void 0, void 0, function () {
        var id, ret, toSend;
        return __generator(this, function (_a) {
            id = (0, uuid_1.v4)();
            ret = new Promise(function (resolve) {
                var handler = function (_a) {
                    var data = _a.data;
                    var parsed = JSON.parse(data.toString());
                    if (parsed.id === id) {
                        socket.removeEventListener('message', handler);
                        resolve(parsed);
                    }
                };
                socket.addEventListener('message', handler);
            });
            toSend = msg;
            toSend.id = id;
            socket.send(JSON.stringify(toSend));
            return [2 /*return*/, ret];
        });
    });
}
var MessageChannelProvider = function (_a) {
    var children = _a.children;
    var _b = __read((0, useStore_1.default)(), 2), store = _b[0], dispatch = _b[1];
    var _c = __read(react_1.default.useState(), 2), socket = _c[0], setSocket = _c[1];
    var _d = __read(react_1.default.useState(), 2), publicWS = _d[0], setPublicWS = _d[1];
    var _e = __read(react_1.default.useState('waiting'), 2), usePassword = _e[0], setUsePassword = _e[1];
    var _f = __read(react_1.default.useState('waiting'), 2), isSetup = _f[0], setIsSetup = _f[1];
    var enqueueSnackbar = (0, notistack_1.useSnackbar)().enqueueSnackbar;
    react_1.default.useEffect(function () {
        var wss = new WebSocket("".concat(location.protocol == 'https:' ? 'wss' : 'ws', "://").concat(process.env.NODE_ENV === 'development' ? 'localhost:3000' : window.location.host, "/public"));
        wss.addEventListener('open', function () {
            setPublicWS(wss);
        });
        wss.addEventListener('error', function () {
            enqueueSnackbar('Unable to connect to server. Please reload the page to try again.', { variant: 'error' });
        });
    }, []);
    react_1.default.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!publicWS)
                            return [2 /*return*/];
                        _a = setUsePassword;
                        return [4 /*yield*/, messageAndResponse(publicWS, { name: 'requirePassword', data: undefined })];
                    case 1:
                        _a.apply(void 0, [(_c.sent()).data ? 'yes' : 'no']);
                        _b = setIsSetup;
                        return [4 /*yield*/, messageAndResponse(publicWS, { name: 'isSetup', data: undefined })];
                    case 2:
                        _b.apply(void 0, [(_c.sent()).data ? 'yes' : 'no']);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [publicWS]);
    var connect = function (ev) {
        var _a;
        var search = new URLSearchParams();
        if (ev) {
            ev.preventDefault();
            var formData = new FormData(ev.currentTarget);
            var password = (_a = formData.get('password')) === null || _a === void 0 ? void 0 : _a.toString();
            if (!password)
                return enqueueSnackbar('Please provide both a username and password', {
                    variant: 'error'
                });
            search = new URLSearchParams({
                password: password
            });
        }
        var wws = new WebSocket("".concat(location.protocol == 'https:' ? 'wss' : 'ws', "://").concat(process.env.NODE_ENV === 'development' ? 'localhost:3000' : window.location.host, "/private?").concat(search));
        wws.addEventListener('open', function () {
            console.log('[INFO] [WS] Connected');
            setSocket(wws);
        });
        wws.addEventListener('error', function (er) {
            console.error('[ERROR] [WS]', er);
            enqueueSnackbar('Unable to connect to server. Please check the password and try again.', {
                variant: 'error'
            });
        });
    };
    var setup = function (ev) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, password, data;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    ev.preventDefault();
                    if (!socket)
                        return [2 /*return*/, enqueueSnackbar('Invalid state: socket not found', { variant: 'error' })];
                    formData = new FormData(ev.currentTarget);
                    password = formData.get('password');
                    data = {
                        port: (_c = parseInt((_b = (_a = formData.get('port')) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '')) !== null && _c !== void 0 ? _c : 3000,
                        password: password ? password.toString() : undefined
                    };
                    return [4 /*yield*/, messageAndResponse(socket, { name: 'setupServer', data: data })];
                case 1:
                    _e.sent();
                    enqueueSnackbar("The following settings have been set: Port=".concat(data.port, ", Password=").concat((_d = data.password) !== null && _d !== void 0 ? _d : 'noPasswordRequired'), {
                        variant: 'success',
                        persist: true
                    });
                    enqueueSnackbar('Please restart the server now.', {
                        variant: 'info',
                        persist: true
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var randomEventHandler = react_1.default.useMemo(function () { return new RandomEventHandler(); }, []);
    react_1.default.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var currentService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!socket)
                            return [2 /*return*/];
                        return [4 /*yield*/, messageAndResponse(socket, { name: 'type', data: undefined })];
                    case 1:
                        currentService = _a.sent();
                        if (currentService.data !== undefined)
                            return [2 /*return*/, dispatch({ type: 'service', payload: currentService.data })];
                        if (store.service !== currentService.data)
                            messageAndResponse(socket, { name: 'setup', data: store.service });
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [store.service, dispatch, socket]);
    react_1.default.useEffect(function () {
        if (!socket)
            return;
        /* finish is a placeholder */
        var listener = function (initalData) {
            var data = JSON.parse(initalData.data);
            randomEventHandler.emit(data.name, data);
        };
        socket.addEventListener('message', listener);
        return function () {
            socket.removeEventListener('message', listener);
        };
    }, [socket]);
    if (usePassword === 'waiting')
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    if (socket === undefined) {
        if (usePassword === 'no') {
            connect(undefined);
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
        }
        return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { mt: 3, display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(material_1.Avatar, { sx: { m: 1, bgcolor: 'secondary.main' }, children: (0, jsx_runtime_1.jsx)(icons_material_1.LockOutlined, {}) }), (0, jsx_runtime_1.jsx)(material_1.Typography, { component: "h1", variant: "h5", color: "text.primary", children: "Login" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { component: "form", onSubmit: connect, sx: { mt: 1 }, children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { name: "password", margin: "normal", type: "password", fullWidth: true, variant: "filled", required: true, label: 'Password' }), (0, jsx_runtime_1.jsx)(material_1.Button, { type: "submit", variant: "contained", sx: { mt: 3, mb: 2 }, fullWidth: true, children: "Login" }), (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.secondary", align: "center", component: "p", variant: "body2", children: "You need to login in order to use this tool." })] })] }));
    }
    if (isSetup === 'no') {
        return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { mt: 3, display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(material_1.Avatar, { sx: { m: 1, bgcolor: 'secondary.main' }, children: (0, jsx_runtime_1.jsx)(icons_material_1.PowerSettingsNew, {}) }), (0, jsx_runtime_1.jsx)(material_1.Typography, { component: "h1", variant: "h5", color: "text.primary", children: "Confirm" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { component: "form", onSubmit: setup, sx: { mt: 1 }, children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { name: "port", margin: "normal", type: "number", fullWidth: true, variant: "filled", required: true, label: 'Port', defaultValue: 3000 }), (0, jsx_runtime_1.jsx)(material_1.TextField, { name: "password", margin: "normal", type: "password", fullWidth: true, variant: "filled", label: 'Password' }), (0, jsx_runtime_1.jsx)(material_1.Button, { type: "submit", variant: "contained", sx: { mt: 3, mb: 2 }, fullWidth: true, children: "Confirm" }), (0, jsx_runtime_1.jsxs)(material_1.Typography, { color: "text.secondary", align: "center", component: "p", variant: "body2", children: ["Please enter data that will be set to use this tool.", (0, jsx_runtime_1.jsx)("br", {}), "Leave blank to use no password (NOT RECOMMENDED)!"] })] })] }));
    }
    var messageHandler = {
        name: 'default',
        auth: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'auth', data: data })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        version: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'version', data: undefined })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        checkToken: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'checkToken', data: undefined })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        search: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'search', data: data })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        handleDefault: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'default', data: data })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        availableDubCodes: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'availableDubCodes', data: undefined })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        availableSubCodes: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'availableSubCodes', data: undefined })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        resolveItems: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'resolveItems', data: data })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        listEpisodes: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'listEpisodes', data: data })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        randomEvents: randomEventHandler,
        downloadItem: function (data) { return messageAndResponse(socket, { name: 'downloadItem', data: data }); },
        isDownloading: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'isDownloading', data: undefined })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        openFolder: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, messageAndResponse(socket, { name: 'openFolder', data: data })];
        }); }); },
        logout: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'changeProvider', data: undefined })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        openFile: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'openFile', data: data })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); },
        openURL: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'openURL', data: data })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); },
        getQueue: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'getQueue', data: undefined })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); },
        removeFromQueue: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'removeFromQueue', data: data })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); },
        clearQueue: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'clearQueue', data: undefined })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); },
        setDownloadQueue: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'setDownloadQueue', data: data })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); },
        getDownloadQueue: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messageAndResponse(socket, { name: 'getDownloadQueue', data: undefined })];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); }
    };
    return (0, jsx_runtime_1.jsx)(exports.messageChannelContext.Provider, { value: messageHandler, children: children });
};
exports.default = MessageChannelProvider;
