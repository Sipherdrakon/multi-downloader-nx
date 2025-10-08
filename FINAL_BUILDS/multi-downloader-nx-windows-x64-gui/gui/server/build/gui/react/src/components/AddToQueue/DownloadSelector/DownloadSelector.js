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
var MultiSelect_1 = __importDefault(require("../../reusable/MultiSelect"));
var MessageChannel_1 = require("../../../provider/MessageChannel");
var LoadingButton_1 = __importDefault(require("@mui/lab/LoadingButton"));
var notistack_1 = require("notistack");
var InfoOutlined_1 = __importDefault(require("@mui/icons-material/InfoOutlined"));
var DownloadSelector = function (_a) {
    var onFinish = _a.onFinish;
    var messageHandler = react_1.default.useContext(MessageChannel_1.messageChannelContext);
    var _b = __read((0, useStore_1.default)(), 2), store = _b[0], dispatch = _b[1];
    var _c = __read(react_1.default.useState([]), 2), availableDubs = _c[0], setAvailableDubs = _c[1];
    var _d = __read(react_1.default.useState([]), 2), availableSubs = _d[0], setAvailableSubs = _d[1];
    var _e = __read(react_1.default.useState(false), 2), loading = _e[0], setLoading = _e[1];
    var enqueueSnackbar = (0, notistack_1.useSnackbar)().enqueueSnackbar;
    var ITEM_HEIGHT = 48;
    var ITEM_PADDING_TOP = 8;
    react_1.default.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var dubLang, subLang, q, fileName, dlVideoOnce, result, _a, _b;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: 
                    /* If we don't wait the response is undefined? */
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(undefined); }, 100); })];
                    case 1:
                        /* If we don't wait the response is undefined? */
                        _e.sent();
                        dubLang = messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.handleDefault('dubLang');
                        subLang = messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.handleDefault('dlsubs');
                        q = messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.handleDefault('q');
                        fileName = messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.handleDefault('fileName');
                        dlVideoOnce = messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.handleDefault('dlVideoOnce');
                        return [4 /*yield*/, Promise.all([dubLang, subLang, q, fileName, dlVideoOnce])];
                    case 2:
                        result = _e.sent();
                        dispatch({
                            type: 'downloadOptions',
                            payload: __assign(__assign({}, store.downloadOptions), { dubLang: result[0], dlsubs: result[1], q: result[2], fileName: result[3], dlVideoOnce: result[4] })
                        });
                        _a = setAvailableDubs;
                        return [4 /*yield*/, (messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.availableDubCodes())];
                    case 3:
                        _a.apply(void 0, [(_c = (_e.sent())) !== null && _c !== void 0 ? _c : []]);
                        _b = setAvailableSubs;
                        return [4 /*yield*/, (messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.availableSubCodes())];
                    case 4:
                        _b.apply(void 0, [(_d = (_e.sent())) !== null && _d !== void 0 ? _d : []]);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    var addToQueue = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, (messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.resolveItems(store.downloadOptions))];
                case 1:
                    res = _a.sent();
                    if (!res)
                        return [2 /*return*/, enqueueSnackbar('The request failed. Please check if the ID is correct.', {
                                variant: 'error'
                            })];
                    setLoading(false);
                    if (onFinish)
                        onFinish();
                    return [2 /*return*/];
            }
        });
    }); };
    var listEpisodes = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!store.downloadOptions.id) {
                        return [2 /*return*/, enqueueSnackbar('Please enter a ID', {
                                variant: 'error'
                            })];
                    }
                    setLoading(true);
                    return [4 /*yield*/, (messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.listEpisodes(store.downloadOptions.id))];
                case 1:
                    res = _a.sent();
                    if (!res || !res.isOk) {
                        setLoading(false);
                        return [2 /*return*/, enqueueSnackbar('The request failed. Please check if the ID is correct.', {
                                variant: 'error'
                            })];
                    }
                    else {
                        dispatch({
                            type: 'episodeListing',
                            payload: res.value
                        });
                    }
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '5px' }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                            width: '50rem',
                            height: '21rem',
                            margin: '10px',
                            display: 'flex',
                            justifyContent: 'space-between'
                            //backgroundColor: '#ffffff30',
                        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.7rem'
                                    //backgroundColor: '#ff000030'
                                }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { fontSize: '1.4rem' }, children: "General Options" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: store.downloadOptions.id, required: true, onChange: function (e) {
                                            dispatch({
                                                type: 'downloadOptions',
                                                payload: __assign(__assign({}, store.downloadOptions), { id: e.target.value })
                                            });
                                        }, label: "Show ID" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { type: "number", value: store.downloadOptions.q, required: true, onChange: function (e) {
                                            var parsed = parseInt(e.target.value);
                                            if (isNaN(parsed) || parsed < 0 || parsed > 10)
                                                return;
                                            dispatch({
                                                type: 'downloadOptions',
                                                payload: __assign(__assign({}, store.downloadOptions), { q: parsed })
                                            });
                                        }, label: "Quality Level (0 for max)" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'flex', gap: '5px' }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { sx: { textTransform: 'none' }, onClick: function () { return dispatch({ type: 'downloadOptions', payload: __assign(__assign({}, store.downloadOptions), { noaudio: !store.downloadOptions.noaudio }) }); }, variant: store.downloadOptions.noaudio ? 'contained' : 'outlined', children: "Skip Audio" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { textTransform: 'none' }, onClick: function () { return dispatch({ type: 'downloadOptions', payload: __assign(__assign({}, store.downloadOptions), { novids: !store.downloadOptions.novids }) }); }, variant: store.downloadOptions.novids ? 'contained' : 'outlined', children: "Skip Video" })] }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { textTransform: 'none' }, onClick: function () { return dispatch({ type: 'downloadOptions', payload: __assign(__assign({}, store.downloadOptions), { dlVideoOnce: !store.downloadOptions.dlVideoOnce }) }); }, variant: store.downloadOptions.dlVideoOnce ? 'contained' : 'outlined', children: "Skip Unnecessary" }), (0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: store.service == 'hidive' ? '' : (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "Simulcast is only supported on Hidive" }), arrow: true, placement: "top", children: (0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { textTransform: 'none' }, disabled: store.service != 'hidive', onClick: function () { return dispatch({ type: 'downloadOptions', payload: __assign(__assign({}, store.downloadOptions), { simul: !store.downloadOptions.simul }) }); }, variant: store.downloadOptions.simul ? 'contained' : 'outlined', children: "Download Simulcast ver." }) }) })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.7rem'
                                    //backgroundColor: '#00000020'
                                }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { fontSize: '1.4rem' }, children: "Episode Options" }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1px'
                                        }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                                borderColor: '#595959',
                                                borderStyle: 'solid',
                                                borderWidth: '1px',
                                                borderRadius: '5px',
                                                //backgroundColor: '#ff4567',
                                                width: '15rem',
                                                height: '3.5rem',
                                                display: 'flex',
                                                '&:hover': {
                                                    borderColor: '#ffffff'
                                                }
                                            }, children: [(0, jsx_runtime_1.jsx)(material_1.InputBase, { sx: {
                                                        ml: 2,
                                                        flex: 1
                                                    }, disabled: store.downloadOptions.all, value: store.downloadOptions.e, required: true, onChange: function (e) {
                                                        dispatch({
                                                            type: 'downloadOptions',
                                                            payload: __assign(__assign({}, store.downloadOptions), { e: e.target.value })
                                                        });
                                                    }, placeholder: "Episode Select" }), (0, jsx_runtime_1.jsx)(material_1.Divider, { orientation: "vertical" }), (0, jsx_runtime_1.jsx)(LoadingButton_1.default, { loading: loading, disableElevation: true, disableFocusRipple: true, disableRipple: true, disableTouchRipple: true, onClick: listEpisodes, variant: "text", sx: { textTransform: 'none' }, children: (0, jsx_runtime_1.jsxs)(material_1.Typography, { children: ["List", (0, jsx_runtime_1.jsx)("br", {}), "Episodes"] }) })] }) }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { textTransform: 'none' }, onClick: function () { return dispatch({ type: 'downloadOptions', payload: __assign(__assign({}, store.downloadOptions), { all: !store.downloadOptions.all }) }); }, variant: store.downloadOptions.all ? 'contained' : 'outlined', children: "Download All" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { textTransform: 'none' }, onClick: function () { return dispatch({ type: 'downloadOptions', payload: __assign(__assign({}, store.downloadOptions), { but: !store.downloadOptions.but }) }); }, variant: store.downloadOptions.but ? 'contained' : 'outlined', children: "Download All but" })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.7rem'
                                    //backgroundColor: '#00ff0020'
                                }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { fontSize: '1.4rem' }, children: "Language Options" }), (0, jsx_runtime_1.jsx)(MultiSelect_1.default, { title: "Dub Languages", values: availableDubs, selected: store.downloadOptions.dubLang, onChange: function (e) {
                                            dispatch({
                                                type: 'downloadOptions',
                                                payload: __assign(__assign({}, store.downloadOptions), { dubLang: e })
                                            });
                                        }, allOption: true }), (0, jsx_runtime_1.jsx)(MultiSelect_1.default, { title: "Sub Languages", values: availableSubs, selected: store.downloadOptions.dlsubs, onChange: function (e) {
                                            dispatch({
                                                type: 'downloadOptions',
                                                payload: __assign(__assign({}, store.downloadOptions), { dlsubs: e })
                                            });
                                        } }), (0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: store.service == 'crunchy' ? '' : (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "Hardsubs are only supported on Crunchyroll" }), arrow: true, placement: "top", children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '100%',
                                                gap: '1rem'
                                            }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                                        borderRadius: '5px',
                                                        //backgroundColor: '#ff4567',
                                                        width: '15rem',
                                                        height: '3.5rem',
                                                        display: 'flex'
                                                    }, children: (0, jsx_runtime_1.jsxs)(material_1.FormControl, { fullWidth: true, children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, { id: "hsLabel", children: "Hardsub Language" }), (0, jsx_runtime_1.jsxs)(material_1.Select, { MenuProps: {
                                                                    PaperProps: {
                                                                        style: {
                                                                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                                                            width: 250
                                                                        }
                                                                    }
                                                                }, labelId: "hsLabel", label: "Hardsub Language", disabled: store.service != 'crunchy', value: store.downloadOptions.hslang, onChange: function (e) {
                                                                    dispatch({
                                                                        type: 'downloadOptions',
                                                                        payload: __assign(__assign({}, store.downloadOptions), { hslang: e.target.value === '' ? undefined : e.target.value })
                                                                    });
                                                                }, children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: "", children: "No Hardsub" }), availableSubs.map(function (lang) {
                                                                        if (lang === 'all' || lang === 'none')
                                                                            return undefined;
                                                                        return (0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: lang, children: lang });
                                                                    })] })] }) }), (0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: (0, jsx_runtime_1.jsxs)(material_1.Typography, { children: ["Downloads the hardsub version of the selected subtitle.", (0, jsx_runtime_1.jsx)("br", {}), "Subtitles are displayed ", (0, jsx_runtime_1.jsx)("b", { children: "PERMANENTLY!" }), (0, jsx_runtime_1.jsx)("br", {}), "You can choose only ", (0, jsx_runtime_1.jsx)("b", { children: "1" }), " subtitle per video!"] }), arrow: true, placement: "top", children: (0, jsx_runtime_1.jsx)(InfoOutlined_1.default, { sx: {
                                                            transition: '100ms',
                                                            ml: '0.35rem',
                                                            mr: '0.65rem',
                                                            '&:hover': {
                                                                color: '#ffffff30'
                                                            }
                                                        } }) })] }) })] })] }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { width: '95%', height: '0.3rem', backgroundColor: '#ffffff50', borderRadius: '10px', marginBottom: '20px' } }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            gap: '15px'
                        }, children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: store.downloadOptions.fileName, onChange: function (e) {
                                    dispatch({
                                        type: 'downloadOptions',
                                        payload: __assign(__assign({}, store.downloadOptions), { fileName: e.target.value })
                                    });
                                }, sx: { width: '87%' }, label: "Filename Overwrite" }), (0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "Click here to see the documentation" }), arrow: true, placement: "top", children: (0, jsx_runtime_1.jsx)(material_1.Link, { href: "https://github.com/anidl/multi-downloader-nx/blob/master/docs/DOCUMENTATION.md#filename-template", rel: "noopener noreferrer", target: "_blank", children: (0, jsx_runtime_1.jsx)(InfoOutlined_1.default, { sx: {
                                            transition: '100ms',
                                            '&:hover': {
                                                color: '#ffffff30'
                                            }
                                        } }) }) })] })] }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { width: '95%', height: '0.3rem', backgroundColor: '#ffffff50', borderRadius: '10px', marginTop: '10px' } }), (0, jsx_runtime_1.jsx)(LoadingButton_1.default, { sx: { margin: '15px', textTransform: 'none' }, loading: loading, onClick: addToQueue, variant: "contained", children: "Add to Queue" })] }));
};
exports.default = DownloadSelector;
