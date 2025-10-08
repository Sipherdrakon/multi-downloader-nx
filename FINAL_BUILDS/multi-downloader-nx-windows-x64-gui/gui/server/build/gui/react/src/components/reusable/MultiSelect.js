"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var ITEM_HEIGHT = 48;
var ITEM_PADDING_TOP = 8;
var MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};
function getStyles(name, personName, theme) {
    return {
        fontWeight: (personName !== null && personName !== void 0 ? personName : []).indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}
var MultiSelect = function (props) {
    var _a;
    var theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(material_1.FormControl, { sx: { width: 300 }, children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, { id: "multi-select-label", children: props.title }), (0, jsx_runtime_1.jsx)(material_1.Select, { labelId: "multi-select-label", id: "multi-select", multiple: true, value: (_a = props.selected) !== null && _a !== void 0 ? _a : [], onChange: function (e) {
                        var val = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
                        if (props.allOption && val.includes('all')) {
                            if (props.values.length === val.length - 1)
                                props.onChange([]);
                            else
                                props.onChange(props.values);
                        }
                        else {
                            props.onChange(val);
                        }
                    }, input: (0, jsx_runtime_1.jsx)(material_1.OutlinedInput, { id: "select-multiple-chip", label: props.title }), renderValue: function (selected) { return selected.join(', '); }, MenuProps: MenuProps, children: props.values.concat(props.allOption ? 'all' : []).map(function (name) { return ((0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: name, style: getStyles(name, props.selected, theme), children: name }, "".concat(props.title, "_").concat(name))); }) })] }) }));
};
exports.default = MultiSelect;
