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
exports.serviceContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var useStore_1 = __importDefault(require("../hooks/useStore"));
exports.serviceContext = react_1.default.createContext(undefined);
var ServiceProvider = function (_a) {
    var children = _a.children;
    var _b = __read((0, useStore_1.default)(), 2), service = _b[0].service, dispatch = _b[1];
    var setService = function (s) {
        dispatch({
            type: 'service',
            payload: s
        });
    };
    return service === undefined ? ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative', top: '40vh' }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", variant: "h3", sx: { textAlign: 'center', mb: 5 }, children: "Please select your service" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'flex', gap: 2, justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { size: "large", variant: "contained", onClick: function () { return setService('crunchy'); }, startIcon: (0, jsx_runtime_1.jsx)(material_1.Avatar, { src: 'https://static.crunchyroll.com/cxweb/assets/img/favicons/favicon-32x32.png' }), children: "Crunchyroll" }), (0, jsx_runtime_1.jsx)(material_1.Button, { size: "large", variant: "contained", onClick: function () { return setService('hidive'); }, startIcon: (0, jsx_runtime_1.jsx)(material_1.Avatar, { src: 'https://static.diceplatform.com/prod/original/dce.hidive/settings/HIDIVE_AppLogo_1024x1024.0G0vK.jpg' }), children: "Hidive" }), (0, jsx_runtime_1.jsx)(material_1.Button, { size: "large", variant: "contained", onClick: function () { return setService('adn'); }, startIcon: (0, jsx_runtime_1.jsx)(material_1.Avatar, { src: 'https://animationdigitalnetwork.com/favicon.ico' }), children: "AnimationDigitalNetwork" })] })] })) : ((0, jsx_runtime_1.jsx)(exports.serviceContext.Provider, { value: service, children: children }));
};
exports.default = ServiceProvider;
