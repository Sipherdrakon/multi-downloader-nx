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
var react_1 = __importDefault(require("react"));
var MessageChannel_1 = require("../../../provider/MessageChannel");
var useDownloadManager = function () {
    var messageHandler = react_1.default.useContext(MessageChannel_1.messageChannelContext);
    var _a = __read(react_1.default.useState(), 2), progressData = _a[0], setProgressData = _a[1];
    var _b = __read(react_1.default.useState(), 2), current = _b[0], setCurrent = _b[1];
    react_1.default.useEffect(function () {
        var handler = function (ev) {
            console.log(ev.data);
            setProgressData(ev.data);
        };
        var currentHandler = function (ev) {
            setCurrent(ev.data);
        };
        var finishHandler = function () {
            setProgressData(undefined);
        };
        messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.randomEvents.on('progress', handler);
        messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.randomEvents.on('current', currentHandler);
        messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.randomEvents.on('finish', finishHandler);
        return function () {
            messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.randomEvents.removeListener('progress', handler);
            messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.randomEvents.removeListener('finish', finishHandler);
            messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.randomEvents.removeListener('current', currentHandler);
        };
    }, [messageHandler]);
    return { data: progressData, current: current };
};
exports.default = useDownloadManager;
