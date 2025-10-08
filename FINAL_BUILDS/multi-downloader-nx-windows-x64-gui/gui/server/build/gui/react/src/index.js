"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var client_1 = require("react-dom/client");
var App_1 = __importDefault(require("./App"));
var ServiceProvider_1 = __importDefault(require("./provider/ServiceProvider"));
var Style_1 = __importDefault(require("./Style"));
var MessageChannel_1 = __importDefault(require("./provider/MessageChannel"));
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var notistack_1 = require("notistack");
var Store_1 = __importDefault(require("./provider/Store"));
var ErrorHandler_1 = __importDefault(require("./provider/ErrorHandler"));
var QueueProvider_1 = __importDefault(require("./provider/QueueProvider"));
document.body.style.backgroundColor = 'rgb(0, 30, 60)';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
var notistackRef = react_1.default.createRef();
var onClickDismiss = function (key) { return function () {
    if (notistackRef.current)
        notistackRef.current.closeSnackbar(key);
}; };
var container = document.getElementById('root');
var root = (0, client_1.createRoot)(container);
root.render((0, jsx_runtime_1.jsx)(ErrorHandler_1.default, { children: (0, jsx_runtime_1.jsx)(Store_1.default, { children: (0, jsx_runtime_1.jsx)(notistack_1.SnackbarProvider, { ref: notistackRef, action: function (key) { return ((0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: onClickDismiss(key), color: "inherit", children: (0, jsx_runtime_1.jsx)(icons_material_1.CloseOutlined, {}) })); }, children: (0, jsx_runtime_1.jsx)(Style_1.default, { children: (0, jsx_runtime_1.jsx)(MessageChannel_1.default, { children: (0, jsx_runtime_1.jsx)(ServiceProvider_1.default, { children: (0, jsx_runtime_1.jsx)(QueueProvider_1.default, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }) }) }) }) }) }) }) }));
