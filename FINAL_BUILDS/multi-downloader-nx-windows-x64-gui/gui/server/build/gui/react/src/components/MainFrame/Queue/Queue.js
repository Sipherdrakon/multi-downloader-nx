"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var MessageChannel_1 = require("../../../provider/MessageChannel");
var QueueProvider_1 = require("../../../provider/QueueProvider");
var Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
var DownloadManager_1 = __importDefault(require("../DownloadManager/DownloadManager"));
var Queue = function () {
    var _a = (0, DownloadManager_1.default)(), data = _a.data, current = _a.current;
    var queue = react_1.default.useContext(QueueProvider_1.queueContext);
    var msg = react_1.default.useContext(MessageChannel_1.messageChannelContext);
    if (!msg)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Never" });
    return data || queue.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [data && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                            marginTop: '2rem',
                            marginBottom: '1rem',
                            height: '12rem',
                            width: '93vw',
                            maxWidth: '93rem',
                            backgroundColor: '#282828',
                            boxShadow: '0px 0px 50px #00000090',
                            borderRadius: '10px',
                            display: 'flex',
                            transition: '250ms'
                        }, children: [(0, jsx_runtime_1.jsx)("img", { style: {
                                    borderRadius: '5px',
                                    margin: '5px',
                                    boxShadow: '0px 0px 10px #00000090',
                                    userSelect: 'none'
                                }, src: data.downloadInfo.image, height: "auto", width: "auto", alt: "Thumbnail" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    justifyContent: 'center'
                                }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                            display: 'flex'
                                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                                    //backgroundColor: '#ff0000',
                                                    width: '70%',
                                                    marginLeft: '10px'
                                                }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                                        flexDirection: 'column',
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                    }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", sx: {
                                                                fontSize: '1.8rem'
                                                            }, children: data.downloadInfo.parent.title }), (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", sx: {
                                                                fontSize: '1.2rem'
                                                            }, children: data.downloadInfo.title })] }) }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                                    //backgroundColor: '#00ff00',
                                                    width: '30%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }, children: (0, jsx_runtime_1.jsxs)(material_1.Typography, { color: "text.primary", sx: {
                                                        fontSize: '1.8rem'
                                                    }, children: ["Downloading: ", data.downloadInfo.language.name] }) })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                            height: '50%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                            //backgroundColor: '#0000ff',
                                        }, children: [(0, jsx_runtime_1.jsx)(material_1.LinearProgress, { variant: "determinate", sx: {
                                                    height: '20px',
                                                    width: '97.53%',
                                                    margin: '10px',
                                                    boxShadow: '0px 0px 10px #00000090',
                                                    borderRadius: '10px'
                                                }, value: typeof data.progress.percent === 'string' ? parseInt(data.progress.percent) : data.progress.percent }), (0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsxs)(material_1.Typography, { color: "text.primary", sx: {
                                                        fontSize: '1.3rem'
                                                    }, children: [data.progress.cur, " / ", data.progress.total, " parts (", data.progress.percent, "% | ", formatTime(data.progress.time), " |", ' ', (data.progress.downloadSpeed / 1024 / 1024).toFixed(2), " MB/s | ", (data.progress.bytes / 1024 / 1024).toFixed(2), "MB)"] }) })] })] })] }) }) })), current && !data && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                            marginTop: '2rem',
                            marginBottom: '1rem',
                            height: '12rem',
                            width: '93vw',
                            maxWidth: '93rem',
                            backgroundColor: '#282828',
                            boxShadow: '0px 0px 50px #00000090',
                            borderRadius: '10px',
                            display: 'flex',
                            overflow: 'hidden',
                            transition: '250ms'
                        }, children: [(0, jsx_runtime_1.jsx)("img", { style: {
                                    borderRadius: '5px',
                                    margin: '5px',
                                    boxShadow: '0px 0px 10px #00000090',
                                    userSelect: 'none',
                                    maxWidth: '20.5rem'
                                }, src: current.image, height: "auto", width: "auto", alt: "Thumbnail" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    justifyContent: 'center'
                                    //backgroundColor: '#ffffff0f'
                                }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                            display: 'flex'
                                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                                    width: '70%',
                                                    marginLeft: '10px'
                                                }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                                        flexDirection: 'column',
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                    }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", sx: {
                                                                fontSize: '1.8rem'
                                                            }, children: current.parent.title }), (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", sx: {
                                                                fontSize: '1.2rem'
                                                            }, children: current.title })] }) }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                                    //backgroundColor: '#00ff00',
                                                    width: '30%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        position: 'relative'
                                                    }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", sx: {
                                                                fontSize: '1.8rem'
                                                            }, children: "Downloading:" }), (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { variant: "indeterminate", sx: {
                                                                marginLeft: '2rem'
                                                            } })] }) })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                            height: '50%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                            //backgroundColor: '#0000ff',
                                        }, children: [(0, jsx_runtime_1.jsx)(material_1.LinearProgress, { variant: "indeterminate", sx: {
                                                    height: '20px',
                                                    width: '97.53%',
                                                    margin: '10px',
                                                    boxShadow: '0px 0px 10px #00000090',
                                                    borderRadius: '10px'
                                                } }), (0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", sx: {
                                                        fontSize: '1.3rem'
                                                    }, children: "0 / ? parts (0% | XX:XX | 0 MB/s | 0MB)" }) })] })] })] }) }) })), queue.map(function (queueItem, index, _a) {
                var length = _a.length;
                return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                        display: 'flex',
                        mb: '-1.5rem',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                            marginTop: '1.5rem',
                            marginBottom: '1.5rem',
                            height: '11rem',
                            width: '90vw',
                            maxWidth: '90rem',
                            backgroundColor: '#282828',
                            boxShadow: '0px 0px 10px #00000090',
                            borderRadius: '10px',
                            display: 'flex',
                            overflow: 'hidden'
                        }, children: [(0, jsx_runtime_1.jsx)("img", { style: {
                                    borderRadius: '5px',
                                    margin: '5px',
                                    boxShadow: '0px 0px 5px #00000090',
                                    userSelect: 'none',
                                    maxWidth: '18.5rem'
                                }, src: queueItem.image, height: "auto", width: "auto", alt: "Thumbnail" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                    margin: '5px',
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'space-between'
                                }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                            width: '30%',
                                            marginRight: '5px',
                                            marginLeft: '5px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", sx: {
                                                    fontSize: '1.8rem',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }, children: queueItem.parent.title }), (0, jsx_runtime_1.jsxs)(material_1.Typography, { color: "text.primary", sx: {
                                                    fontSize: '1.6rem',
                                                    marginTop: '-0.4rem',
                                                    marginBottom: '0.4rem'
                                                }, children: ["S", queueItem.parent.season, "E", queueItem.episode] }), (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", sx: {
                                                    fontSize: '1.2rem',
                                                    marginTop: '-0.4rem',
                                                    marginBottom: '0.4rem',
                                                    textOverflow: 'ellipsis'
                                                }, children: queueItem.title })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                            width: '40%',
                                            marginRight: '5px',
                                            marginLeft: '5px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            justifyContent: 'space-between'
                                        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { color: "text.primary", sx: {
                                                    fontSize: '1.8rem',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }, children: ["Dub(s): ", queueItem.dubLang.join(', ')] }), (0, jsx_runtime_1.jsxs)(material_1.Typography, { color: "text.primary", sx: {
                                                    fontSize: '1.8rem',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }, children: ["Sub(s): ", queueItem.dlsubs.join(', ')] }), (0, jsx_runtime_1.jsxs)(material_1.Typography, { color: "text.primary", sx: {
                                                    fontSize: '1.8rem'
                                                }, children: ["Quality: ", queueItem.q] })] }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                            marginRight: '5px',
                                            marginLeft: '5px',
                                            width: '30%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            display: 'flex'
                                        }, children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: "Delete from queue", arrow: true, placement: "top", children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: function () {
                                                    msg.removeFromQueue(index);
                                                }, sx: {
                                                    backgroundColor: '#ff573a25',
                                                    height: '40px',
                                                    transition: '250ms',
                                                    '&:hover': {
                                                        backgroundColor: '#ff573a'
                                                    }
                                                }, children: (0, jsx_runtime_1.jsx)(Delete_1.default, {}) }) }) })] })] }) }, "queue_item_".concat(index)));
            })] })) : ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
            display: 'flex',
            width: '100%',
            height: '12rem',
            flexDirection: 'column',
            alignItems: 'center'
        }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { color: "text.primary", sx: {
                    fontSize: '2rem',
                    margin: '10px'
                }, children: "Selected episodes will be shown here" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: 'flex',
                    margin: '10px'
                }, children: [(0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "rectangular", height: '10rem', width: '20rem', sx: { margin: '5px', borderRadius: '5px' } }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                            display: 'flex',
                            flexDirection: 'column'
                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "text", height: '100%', width: '30rem', sx: { margin: '5px', borderRadius: '5px' } }), (0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "text", height: '100%', width: '30rem', sx: { margin: '5px', borderRadius: '5px' } })] })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: 'flex',
                    margin: '10px'
                }, children: [(0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "rectangular", height: '10rem', width: '20rem', sx: { margin: '5px', borderRadius: '5px' } }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                            display: 'flex',
                            flexDirection: 'column'
                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "text", height: '100%', width: '30rem', sx: { margin: '5px', borderRadius: '5px' } }), (0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "text", height: '100%', width: '30rem', sx: { margin: '5px', borderRadius: '5px' } })] })] })] }));
};
var formatTime = function (time) {
    time = Math.floor(time / 1000);
    var minutes = Math.floor(time / 60);
    time = time % 60;
    return "".concat(minutes.toFixed(0).length < 2 ? "0".concat(minutes) : minutes, "m").concat(time.toFixed(0).length < 2 ? "0".concat(time) : time, "s");
};
exports.default = Queue;
