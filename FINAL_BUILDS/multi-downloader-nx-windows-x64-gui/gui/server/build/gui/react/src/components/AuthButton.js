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
var icons_material_1 = require("@mui/icons-material");
var react_1 = __importDefault(require("react"));
var MessageChannel_1 = require("../provider/MessageChannel");
var Require_1 = __importDefault(require("./Require"));
var notistack_1 = require("notistack");
var AuthButton = function () {
    var snackbar = (0, notistack_1.useSnackbar)();
    var _a = __read(react_1.default.useState(false), 2), open = _a[0], setOpen = _a[1];
    var _b = __read(react_1.default.useState(''), 2), username = _b[0], setUsername = _b[1];
    var _c = __read(react_1.default.useState(''), 2), password = _c[0], setPassword = _c[1];
    var _d = __read(react_1.default.useState(false), 2), usernameError = _d[0], setUsernameError = _d[1];
    var _e = __read(react_1.default.useState(false), 2), passwordError = _e[0], setPasswordError = _e[1];
    var messageChannel = react_1.default.useContext(MessageChannel_1.messageChannelContext);
    var _f = __read(react_1.default.useState(false), 2), loading = _f[0], setLoading = _f[1];
    var _g = __read(react_1.default.useState(undefined), 2), error = _g[0], setError = _g[1];
    var _h = __read(react_1.default.useState(false), 2), authed = _h[0], setAuthed = _h[1];
    var checkAuth = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = setAuthed;
                    return [4 /*yield*/, (messageChannel === null || messageChannel === void 0 ? void 0 : messageChannel.checkToken())];
                case 1:
                    _a.apply(void 0, [(_c = (_b = (_d.sent())) === null || _b === void 0 ? void 0 : _b.isOk) !== null && _c !== void 0 ? _c : false]);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.default.useEffect(function () {
        checkAuth();
    }, []);
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!messageChannel)
                        throw new Error('Invalid state'); //The components to confirm only render if the messageChannel is not undefinded
                    if (username.trim().length === 0)
                        return [2 /*return*/, setUsernameError(true)];
                    if (password.trim().length === 0)
                        return [2 /*return*/, setPasswordError(true)];
                    setUsernameError(false);
                    setPasswordError(false);
                    setLoading(true);
                    return [4 /*yield*/, messageChannel.auth({ username: username, password: password })];
                case 1:
                    res = _a.sent();
                    if (res.isOk) {
                        setOpen(false);
                        snackbar.enqueueSnackbar('Logged in', {
                            variant: 'success'
                        });
                        setUsername('');
                        setPassword('');
                    }
                    else {
                        setError(res.reason);
                    }
                    return [4 /*yield*/, checkAuth()];
                case 2:
                    _a.sent();
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)(Require_1.default, { value: messageChannel, children: [(0, jsx_runtime_1.jsxs)(material_1.Dialog, { open: open, children: [(0, jsx_runtime_1.jsxs)(material_1.Dialog, { open: !!error, children: [(0, jsx_runtime_1.jsx)(material_1.DialogTitle, { children: "Error during Authentication" }), (0, jsx_runtime_1.jsxs)(material_1.DialogContentText, { children: [error === null || error === void 0 ? void 0 : error.name, error === null || error === void 0 ? void 0 : error.message] }), (0, jsx_runtime_1.jsx)(material_1.DialogActions, { children: (0, jsx_runtime_1.jsx)(material_1.Button, { onClick: function () { return setError(undefined); }, children: "Close" }) })] }), (0, jsx_runtime_1.jsx)(material_1.DialogTitle, { sx: { flexGrow: 1 }, children: "Authentication" }), (0, jsx_runtime_1.jsxs)(material_1.DialogContent, { children: [(0, jsx_runtime_1.jsxs)(material_1.DialogContentText, { children: ["Here, you need to enter your username (most likely your Email) and your password.", (0, jsx_runtime_1.jsx)("br", {}), "These information are not stored anywhere and are only used to authenticate with the service once."] }), (0, jsx_runtime_1.jsx)(material_1.TextField, { error: usernameError, helperText: usernameError ? 'Please enter something before submiting' : undefined, margin: "dense", id: "username", label: "Username", type: "text", fullWidth: true, variant: "standard", value: username, onChange: function (e) { return setUsername(e.target.value); }, disabled: loading }), (0, jsx_runtime_1.jsx)(material_1.TextField, { error: passwordError, helperText: passwordError ? 'Please enter something before submiting' : undefined, margin: "dense", id: "password", label: "Password", type: "password", fullWidth: true, variant: "standard", value: password, onChange: function (e) { return setPassword(e.target.value); }, disabled: loading })] }), (0, jsx_runtime_1.jsxs)(material_1.DialogActions, { children: [loading && (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 30 }), (0, jsx_runtime_1.jsx)(material_1.Button, { disabled: loading, onClick: function () { return setOpen(false); }, children: "Close" }), (0, jsx_runtime_1.jsx)(material_1.Button, { disabled: loading, onClick: function () { return handleSubmit(); }, children: "Authenticate" })] })] }), (0, jsx_runtime_1.jsx)(material_1.Button, { startIcon: authed ? (0, jsx_runtime_1.jsx)(icons_material_1.Check, {}) : (0, jsx_runtime_1.jsx)(icons_material_1.Close, {}), variant: "contained", onClick: function () { return setOpen(true); }, children: "Authenticate" })] }));
};
exports.default = AuthButton;
