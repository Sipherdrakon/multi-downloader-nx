"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var Queue_1 = __importDefault(require("./Queue/Queue"));
var MainFrame = function () {
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {}, children: (0, jsx_runtime_1.jsx)(Queue_1.default, {}) }));
};
exports.default = MainFrame;
