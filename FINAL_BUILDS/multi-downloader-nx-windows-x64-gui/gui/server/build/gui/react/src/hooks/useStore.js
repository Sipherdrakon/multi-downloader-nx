"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Store_1 = require("../provider/Store");
var useStore = function () {
    var context = react_1.default.useContext(Store_1.StoreContext);
    if (!context) {
        throw new Error('useStore must be used under Store');
    }
    return context;
};
exports.default = useStore;
