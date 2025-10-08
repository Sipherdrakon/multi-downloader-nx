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
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var buttonSx = {
    '&:hover': {
        background: 'rgb(0, 30, 60)'
    },
    fontSize: '0.7rem',
    minHeight: '30px',
    justifyContent: 'center',
    p: 0
};
function ContextMenu(props) {
    var _a = __read(react_1.default.useState({ x: 0, y: 0 }), 2), anchor = _a[0], setAnchor = _a[1];
    var _b = __read(react_1.default.useState(false), 2), show = _b[0], setShow = _b[1];
    react_1.default.useEffect(function () {
        var ref = props.popupItem;
        if (ref.current === null)
            return;
        var listener = function (ev) {
            ev.preventDefault();
            setAnchor({ x: ev.x + 10, y: ev.y + 10 });
            setShow(true);
        };
        ref.current.addEventListener('contextmenu', listener);
        return function () {
            if (ref.current)
                ref.current.removeEventListener('contextmenu', listener);
        };
    }, [props.popupItem]);
    return show ? ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { zIndex: 1400, p: 1, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', position: 'fixed', left: anchor.x, top: anchor.y }, children: (0, jsx_runtime_1.jsxs)(material_1.List, { sx: { p: 0, m: 0, display: 'flex', flexDirection: 'column' }, children: [props.options.map(function (item, i) {
                    return item === 'divider' ? ((0, jsx_runtime_1.jsx)(material_1.Divider, {}, "ContextMenu_Divider_".concat(i, "_").concat(item))) : ((0, jsx_runtime_1.jsx)(material_1.Button, { color: "inherit", onClick: function () {
                            item.onClick();
                            setShow(false);
                        }, sx: buttonSx, children: item.text }, "ContextMenu_Value_".concat(i, "_").concat(item)));
                }), (0, jsx_runtime_1.jsx)(material_1.Divider, {}), (0, jsx_runtime_1.jsx)(material_1.Button, { fullWidth: true, color: "inherit", onClick: function () { return setShow(false); }, sx: buttonSx, children: "Close" })] }) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
}
exports.default = ContextMenu;
