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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var LinearProgressWithLabel = function (props) {
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'flex', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: { width: '100%', mr: 1 }, children: (0, jsx_runtime_1.jsx)(material_1.LinearProgress, __assign({ variant: "determinate" }, props)) }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { minWidth: 35 }, children: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", color: "text.secondary", children: "".concat(Math.round(props.value), "%") }) })] }));
};
exports.default = LinearProgressWithLabel;
