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
exports.StoreContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var Reducer = function (state, action) {
    var _a;
    switch (action.type) {
        default:
            return __assign(__assign({}, state), (_a = {}, _a[action.type] = action.payload, _a));
    }
};
var initialState = {
    downloadOptions: {
        id: '',
        q: 0,
        e: '',
        dubLang: ['jpn'],
        dlsubs: ['all'],
        fileName: '',
        dlVideoOnce: false,
        all: false,
        but: false,
        noaudio: false,
        novids: false,
        simul: false
    },
    service: undefined,
    episodeListing: [],
    version: ''
};
var Store = function (_a) {
    var children = _a.children;
    var _b = __read(react_1.default.useReducer(Reducer, initialState), 2), state = _b[0], dispatch = _b[1];
    /*React.useEffect(() => {
    if (!state.unsavedChanges.has)
      return;
    const unsavedChanges = (ev: BeforeUnloadEvent, lang: LanguageContextType) => {
      ev.preventDefault();
      ev.returnValue = lang.getLang('unsaved_changes');
      return lang.getLang('unsaved_changes');
    };


    const windowListener = (ev: BeforeUnloadEvent) => {
      return unsavedChanges(ev, state.lang);
    };

    window.addEventListener('beforeunload', windowListener);

    return () => window.removeEventListener('beforeunload', windowListener);
  }, [state.unsavedChanges.has]);*/
    return (0, jsx_runtime_1.jsx)(exports.StoreContext.Provider, { value: [state, dispatch], children: children });
};
/* Importent Notice -- The 'queue' generic will be overriden */
exports.StoreContext = react_1.default.createContext([initialState, undefined]);
exports.default = Store;
