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
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var react_1 = __importDefault(require("react"));
var useStore_1 = __importDefault(require("../../../../hooks/useStore"));
var ContextMenu_1 = __importDefault(require("../../../reusable/ContextMenu"));
var notistack_1 = require("notistack");
var EpisodeListing = function () {
    var _a = __read((0, useStore_1.default)(), 2), store = _a[0], dispatch = _a[1];
    var _b = __read(react_1.default.useState('all'), 2), season = _b[0], setSeason = _b[1];
    var enqueueSnackbar = (0, notistack_1.useSnackbar)().enqueueSnackbar;
    var seasons = react_1.default.useMemo(function () {
        var e_1, _a;
        var s = [];
        try {
            for (var _b = __values(store.episodeListing), _c = _b.next(); !_c.done; _c = _b.next()) {
                var season_1 = _c.value.season;
                if (s.includes(season_1))
                    continue;
                s.push(season_1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return s;
    }, [store.episodeListing]);
    var _c = __read(react_1.default.useState([]), 2), selected = _c[0], setSelected = _c[1];
    react_1.default.useEffect(function () {
        setSelected(parseSelect(store.downloadOptions.e));
    }, [store.episodeListing]);
    var close = function () {
        dispatch({
            type: 'episodeListing',
            payload: []
        });
        dispatch({
            type: 'downloadOptions',
            payload: __assign(__assign({}, store.downloadOptions), { e: "".concat(__spreadArray([], __read(new Set(__spreadArray(__spreadArray([], __read(parseSelect(store.downloadOptions.e)), false), __read(selected), false))), false).join(',')) })
        });
    };
    var getEpisodesForSeason = function (season) {
        return store.episodeListing.filter(function (a) { return (season === 'all' ? true : a.season === season); });
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Dialog, { open: store.episodeListing.length > 0, onClose: close, scroll: "paper", maxWidth: "xl", sx: { p: 2 }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'grid', gridTemplateColumns: '1fr 200px 20px' }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", variant: "h5", sx: { textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex' }, children: "Episodes" }), (0, jsx_runtime_1.jsxs)(material_1.FormControl, { sx: { mr: 2, mt: 2 }, children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, { id: "seasonSelectLabel", children: "Season" }), (0, jsx_runtime_1.jsxs)(material_1.Select, { labelId: "seasonSelectLabel", label: "Season", value: season, onChange: function (e) { return setSeason(e.target.value); }, children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: "all", children: "Show all Epsiodes" }), seasons.map(function (a, index) {
                                        return ((0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: a, children: a }, "MenuItem_SeasonSelect_".concat(index)));
                                    })] })] })] }), (0, jsx_runtime_1.jsxs)(material_1.List, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItem, { sx: { display: 'grid', gridTemplateColumns: '25px 1fr 5fr' }, children: (0, jsx_runtime_1.jsx)(material_1.Checkbox, { indeterminate: store.episodeListing.some(function (a) { return selected.includes(a.e); }) && !store.episodeListing.every(function (a) { return selected.includes(a.e); }), checked: store.episodeListing.every(function (a) { return selected.includes(a.e); }), onChange: function () {
                                if (selected.length > 0) {
                                    setSelected([]);
                                }
                                else {
                                    setSelected(getEpisodesForSeason(season).map(function (a) { return a.e; }));
                                }
                            } }) }), getEpisodesForSeason(season).map(function (item, index, _a) {
                        var length = _a.length;
                        var e = isNaN(parseInt(item.e)) ? item.e : parseInt(item.e);
                        var idStr = "S".concat(item.season, "E").concat(e);
                        var isSelected = selected.includes(e.toString());
                        var imageRef = react_1.default.createRef();
                        var summaryRef = react_1.default.createRef();
                        return ((0, jsx_runtime_1.jsxs)(material_1.Box, { mouseData: isSelected, children: [(0, jsx_runtime_1.jsxs)(material_1.ListItem, { sx: {
                                        backdropFilter: isSelected ? 'brightness(1.5)' : '',
                                        '&:hover': { backdropFilter: 'brightness(1.5)' },
                                        display: 'grid',
                                        gridTemplateColumns: '25px 50px 1fr 5fr'
                                    }, onClick: function () {
                                        var arr = [];
                                        if (isSelected) {
                                            arr = __spreadArray([], __read(selected.filter(function (a) { return a !== e.toString(); })), false);
                                        }
                                        else {
                                            arr = __spreadArray(__spreadArray([], __read(selected), false), [e.toString()], false);
                                        }
                                        setSelected(arr.filter(function (a) { return a.length > 0; }));
                                    }, children: [isSelected ? (0, jsx_runtime_1.jsx)(icons_material_1.CheckBox, {}) : (0, jsx_runtime_1.jsx)(icons_material_1.CheckBoxOutlineBlank, {}), (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", sx: { textAlign: 'center' }, children: idStr }), (0, jsx_runtime_1.jsx)("img", { ref: imageRef, style: { width: 'inherit', maxHeight: '200px', minWidth: '150px' }, src: item.img, alt: "thumbnail" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'flex', flexDirection: 'column', pl: 1 }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'grid', gridTemplateColumns: '1fr min-content' }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", variant: "h5", children: item.name }), (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", children: item.time.startsWith('00:') ? item.time.slice(3) : item.time })] }), (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", ref: summaryRef, children: item.description }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { display: 'grid', gridTemplateColumns: 'fit-content 1fr' }, children: (0, jsx_runtime_1.jsxs)(material_1.Typography, { children: [(0, jsx_runtime_1.jsx)("br", {}), "Available audio languages: ", item.lang.join(', ')] }) })] })] }), (0, jsx_runtime_1.jsx)(ContextMenu_1.default, { options: [
                                        {
                                            text: 'Copy image URL',
                                            onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, navigator.clipboard.writeText(item.img)];
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
                                                window.open(item.img);
                                            }
                                        }
                                    ], popupItem: imageRef }), (0, jsx_runtime_1.jsx)(ContextMenu_1.default, { options: [
                                        {
                                            onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, navigator.clipboard.writeText(item.description)];
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
                                    ], popupItem: summaryRef }), index < length - 1 && (0, jsx_runtime_1.jsx)(material_1.Divider, {})] }, "Episode_List_Item_".concat(index)));
                    })] })] }));
};
var parseSelect = function (s) {
    var ret = [];
    s.split(',').forEach(function (item) {
        if (item.includes('-')) {
            var split = item.split('-');
            if (split.length !== 2)
                return;
            var match = split[0].match(/[A-Za-z]+/);
            if (match && match.length > 0) {
                if (match.index && match.index !== 0) {
                    return;
                }
                var letters = split[0].substring(0, match[0].length);
                var number = parseInt(split[0].substring(match[0].length));
                var b = parseInt(split[1]);
                if (isNaN(number) || isNaN(b)) {
                    return;
                }
                for (var i = number; i <= b; i++) {
                    ret.push("".concat(letters).concat(i));
                }
            }
            else {
                var a = parseInt(split[0]);
                var b = parseInt(split[1]);
                if (isNaN(a) || isNaN(b)) {
                    return;
                }
                for (var i = a; i <= b; i++) {
                    ret.push("".concat(i));
                }
            }
        }
        else {
            ret.push(item);
        }
    });
    return __spreadArray([], __read(new Set(ret)), false);
};
exports.default = EpisodeListing;
