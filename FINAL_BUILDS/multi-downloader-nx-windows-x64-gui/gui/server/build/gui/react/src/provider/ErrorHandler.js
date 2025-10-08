"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var ErrorHandler = /** @class */ (function (_super) {
    __extends(ErrorHandler, _super);
    function ErrorHandler(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { error: undefined };
        return _this;
    }
    ErrorHandler.prototype.componentDidCatch = function (er, stack) {
        this.setState({ error: { er: er, stack: stack } });
    };
    ErrorHandler.prototype.render = function () {
        var _a;
        return this.state.error ? ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2 }, children: (0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "body1", color: "red", children: ["".concat(this.state.error.er.name, ": ").concat(this.state.error.er.message), (0, jsx_runtime_1.jsx)("br", {}), (_a = this.state.error.stack.componentStack) === null || _a === void 0 ? void 0 : _a.split('\n').map(function (a) {
                        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [a, (0, jsx_runtime_1.jsx)("br", {})] }));
                    })] }) })) : (this.props.children);
    };
    return ErrorHandler;
}(react_1.default.Component));
exports.default = ErrorHandler;
