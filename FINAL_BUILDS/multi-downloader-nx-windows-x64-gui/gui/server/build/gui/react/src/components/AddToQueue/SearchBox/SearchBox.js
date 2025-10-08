"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var useStore_1 = __importDefault(require("../../../hooks/useStore"));
var MessageChannel_1 = require("../../../provider/MessageChannel");
require("./SearchBox.css");
var ContextMenu_1 = __importDefault(require("../../reusable/ContextMenu"));
var notistack_1 = require("notistack");
var SearchBox = function () {
    var _a, _b, _c;
    var messageHandler = react_1.default.useContext(MessageChannel_1.messageChannelContext);
    var _d = __read((0, useStore_1.default)(), 2), store = _d[0], dispatch = _d[1];
    var _e = __read(react_1.default.useState(''), 2), search = _e[0], setSearch = _e[1];
    var _f = __read(react_1.default.useState(false), 2), focus = _f[0], setFocus = _f[1];
    var _g = __read(react_1.default.useState(), 2), searchResult = _g[0], setSearchResult = _g[1];
    var anchor = react_1.default.useRef(null);
    var enqueueSnackbar = (0, notistack_1.useSnackbar)().enqueueSnackbar;
    var selectItem = function (id) {
        dispatch({
            type: 'downloadOptions',
            payload: __assign(__assign({}, store.downloadOptions), { id: id })
        });
    };
    react_1.default.useEffect(function () {
        if (search.trim().length === 0)
            return setSearchResult({ isOk: true, value: [] });
        var timeOutId = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
            var s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(search.trim().length > 3)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.search({ search: search }))];
                    case 1:
                        s = _a.sent();
                        if (s && s.isOk)
                            s.value = s.value.slice(0, 10);
                        setSearchResult(s);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }, 500);
        return function () { return clearTimeout(timeOutId); };
    }, [search]);
    var anchorBounding = (_a = anchor.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    return ((0, jsx_runtime_1.jsx)(material_1.ClickAwayListener, { onClickAway: function () { return setFocus(false); }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { m: 2 }, children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { ref: anchor, value: search, onClick: function () { return setFocus(true); }, onChange: function (e) { return setSearch(e.target.value); }, variant: "outlined", label: "Search", fullWidth: true }), searchResult !== undefined && searchResult.isOk && searchResult.value.length > 0 && focus && ((0, jsx_runtime_1.jsx)(material_1.Paper, { sx: {
                        position: 'fixed',
                        maxHeight: '50%',
                        width: "".concat(anchorBounding === null || anchorBounding === void 0 ? void 0 : anchorBounding.width, "px"),
                        left: anchorBounding === null || anchorBounding === void 0 ? void 0 : anchorBounding.x,
                        top: ((_b = anchorBounding === null || anchorBounding === void 0 ? void 0 : anchorBounding.y) !== null && _b !== void 0 ? _b : 0) + ((_c = anchorBounding === null || anchorBounding === void 0 ? void 0 : anchorBounding.height) !== null && _c !== void 0 ? _c : 0),
                        zIndex: 99,
                        overflowY: 'scroll'
                    }, children: (0, jsx_runtime_1.jsx)(material_1.List, { children: searchResult && searchResult.isOk ? (searchResult.value.map(function (a, ind, arr) {
                            var imageRef = react_1.default.createRef();
                            var summaryRef = react_1.default.createRef();
                            return ((0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItem, { className: "listitem-hover", onClick: function () {
                                            selectItem(a.id);
                                            setFocus(false);
                                        }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'flex' }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: { width: '20%', height: '100%', pr: 2 }, children: (0, jsx_runtime_1.jsx)("img", { ref: imageRef, src: a.image, style: { width: '100%', height: 'auto' }, alt: "thumbnail" }) }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'flex', flexDirection: 'column', maxWidth: '70%' }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", component: "h6", color: "text.primary", sx: {}, children: a.name }), a.desc && ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "caption", component: "p", color: "text.primary", sx: { pt: 1, pb: 1 }, ref: summaryRef, children: a.desc })), a.lang && ((0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "caption", component: "p", color: "text.primary", sx: {}, children: ["Languages: ", a.lang.join(', ')] })), (0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "caption", component: "p", color: "text.primary", sx: {}, children: ["ID: ", a.id] })] })] }) }), (0, jsx_runtime_1.jsx)(ContextMenu_1.default, { options: [
                                            {
                                                text: 'Copy image URL',
                                                onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, navigator.clipboard.writeText(a.image)];
                                                            case 1:
                                                                _a.sent();
                                                                enqueueSnackbar('Copied URL to clipboard', {
                                                                    variant: 'info'
                                                                });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }
                                            },
                                            {
                                                text: 'Open image in new tab',
                                                onClick: function () {
                                                    window.open(a.image);
                                                }
                                            }
                                        ], popupItem: imageRef }), a.desc && ((0, jsx_runtime_1.jsx)(ContextMenu_1.default, { options: [
                                            {
                                                onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, navigator.clipboard.writeText(a.desc)];
                                                            case 1:
                                                                _a.sent();
                                                                enqueueSnackbar('Copied summary to clipboard', {
                                                                    variant: 'info'
                                                                });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); },
                                                text: 'Copy summary to clipboard'
                                            }
                                        ], popupItem: summaryRef })), ind < arr.length - 1 && (0, jsx_runtime_1.jsx)(material_1.Divider, {})] }, a.id));
                        })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})) }) }))] }) }));
};
exports.default = SearchBox;
