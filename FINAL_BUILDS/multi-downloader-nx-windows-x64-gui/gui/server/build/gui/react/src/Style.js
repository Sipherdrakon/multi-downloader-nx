"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var makeTheme = function (mode) {
    return (0, material_1.createTheme)({
        palette: {
            mode: mode
        }
    });
};
var Style = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(material_1.ThemeProvider, { theme: makeTheme('dark'), children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {} }), children] }));
};
exports.default = Style;
