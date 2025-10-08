"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var Require = function (props) {
    return props.value === undefined ? ((0, jsx_runtime_1.jsx)(material_1.Backdrop, { open: true, children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}) })) : ((0, jsx_runtime_1.jsx)(material_1.Box, { children: props.children }));
};
exports.default = Require;
