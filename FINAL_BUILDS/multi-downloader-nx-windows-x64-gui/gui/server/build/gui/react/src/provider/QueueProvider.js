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
exports.queueContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var MessageChannel_1 = require("./MessageChannel");
exports.queueContext = react_1.default.createContext([]);
var QueueProvider = function (_a) {
    var children = _a.children;
    var msg = react_1.default.useContext(MessageChannel_1.messageChannelContext);
    var _b = __read(react_1.default.useState(false), 2), ready = _b[0], setReady = _b[1];
    var _c = __read(react_1.default.useState([]), 2), queue = _c[0], setQueue = _c[1];
    react_1.default.useEffect(function () {
        if (msg && !ready) {
            msg.getQueue().then(function (data) {
                setQueue(data);
                setReady(true);
            });
        }
        var listener = function (ev) {
            setQueue(ev.data);
        };
        msg === null || msg === void 0 ? void 0 : msg.randomEvents.on('queueChange', listener);
        return function () {
            msg === null || msg === void 0 ? void 0 : msg.randomEvents.removeListener('queueChange', listener);
        };
    }, [msg]);
    return (0, jsx_runtime_1.jsx)(exports.queueContext.Provider, { value: queue, children: children });
};
exports.default = QueueProvider;
