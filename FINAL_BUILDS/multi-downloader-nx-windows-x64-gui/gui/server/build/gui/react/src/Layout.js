"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var AuthButton_1 = __importDefault(require("./components/AuthButton"));
var material_1 = require("@mui/material");
var MainFrame_1 = __importDefault(require("./components/MainFrame/MainFrame"));
var LogoutButton_1 = __importDefault(require("./components/LogoutButton"));
var AddToQueue_1 = __importDefault(require("./components/AddToQueue/AddToQueue"));
var MessageChannel_1 = require("./provider/MessageChannel");
var icons_material_1 = require("@mui/icons-material");
var StartQueue_1 = __importDefault(require("./components/StartQueue"));
var MenuBar_1 = __importDefault(require("./components/MenuBar/MenuBar"));
var Layout = function () {
    var messageHandler = react_1.default.useContext(MessageChannel_1.messageChannelContext);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(MenuBar_1.default, {}), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '93vw',
                    maxWidth: '93rem',
                    maxHeight: '3rem'
                    //backgroundColor: '#ffffff',
                }, children: [(0, jsx_runtime_1.jsx)(LogoutButton_1.default, {}), (0, jsx_runtime_1.jsx)(AuthButton_1.default, {}), (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", startIcon: (0, jsx_runtime_1.jsx)(icons_material_1.Folder, {}), onClick: function () { return messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.openFolder('content'); }, sx: { height: '37px' }, children: "Open Output Directory" }), (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", startIcon: (0, jsx_runtime_1.jsx)(icons_material_1.ClearAll, {}), onClick: function () { return messageHandler === null || messageHandler === void 0 ? void 0 : messageHandler.clearQueue(); }, sx: { height: '37px' }, children: "Clear Queue" }), (0, jsx_runtime_1.jsx)(AddToQueue_1.default, {}), (0, jsx_runtime_1.jsx)(StartQueue_1.default, {})] }), (0, jsx_runtime_1.jsx)(MainFrame_1.default, {})] }));
};
exports.default = Layout;
