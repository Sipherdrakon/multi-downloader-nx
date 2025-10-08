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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_material_1 = require("@mui/icons-material");
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var DownloadSelector_1 = __importDefault(require("./DownloadSelector/DownloadSelector"));
var EpisodeListing_1 = __importDefault(require("./DownloadSelector/Listing/EpisodeListing"));
var SearchBox_1 = __importDefault(require("./SearchBox/SearchBox"));
var AddToQueue = function () {
    var _a = __read(react_1.default.useState(false), 2), isOpen = _a[0], setOpen = _a[1];
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(EpisodeListing_1.default, {}), (0, jsx_runtime_1.jsx)(material_1.Dialog, { open: isOpen, onClose: function () { return setOpen(false); }, maxWidth: "md", PaperProps: { elevation: 4 }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(SearchBox_1.default, {}), (0, jsx_runtime_1.jsx)(material_1.Divider, { variant: "middle" }), (0, jsx_runtime_1.jsx)(DownloadSelector_1.default, { onFinish: function () { return setOpen(false); } })] }) }), (0, jsx_runtime_1.jsxs)(material_1.Button, { variant: "contained", onClick: function () { return setOpen(true); }, sx: { maxHeight: '2.3rem' }, children: [(0, jsx_runtime_1.jsx)(icons_material_1.Add, {}), "Add to Queue"] })] }));
};
exports.default = AddToQueue;
