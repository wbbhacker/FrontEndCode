/* eslint-disable */
var Navigator = (function () {
    var frame,
        androidReg = /Android/gi,
        isAndroid = androidReg.test(navigator.platform) || androidReg.test(navigator.userAgent);
    /**
     * iframe 元素
     *
     * @property {Element} frame
     */
    frame = null;
    /**
     * 创建iframe,帮助解决iOS的UIWebView没有JS API
     *
     * @method getFrame
     * @return {Element} iframe
     */
    function getFrame(src) {
        var _frame = document.createElement("iframe");
        _frame.setAttribute("style", "display:none;width:0;height:0;position: absolute;top:0;left:0;border:0;");
        _frame.setAttribute("height", "0px");
        _frame.setAttribute("width", "0px");
        _frame.setAttribute("frameborder", "0");
        if (src) {
            _frame.setAttribute("src", src);
        } else {
            document.documentElement.appendChild(_frame);
        }
        return _frame;
    }

    /**
     * 删除iframe
     *
     * @method removeFrame
     * @param {Element} frame 执行的方法
     */
    function removeFrame(frame) {
        frame && frame.parentNode.removeChild(frame);
    }

    /**
     * 执行与客户端交互的协议
     *
     * @method protocol
     * @param {String} command 执行的协议及命令
     * @param {boolean} single 是否是使用独立的iframe,默认false
     * @param {boolean} noframe 是否不通过iframe,默认false
     */
    function protocol(command, single, noframe) {
        var _frame, timer;
        //不通过iframe
        if (noframe) {
            window.location.href = command;
            return;
        }
        //通过iframe
        if (single) {
            if (isAndroid) {
                _frame = getFrame();
                _frame.setAttribute("src", command);
            } else {
                _frame = getFrame(command);
                document.documentElement.appendChild(_frame);
            }
            timer = setTimeout(function () {
                _frame && removeFrame(_frame);
            }, 30000);
            _frame.onload = _frame.onreadystatechange = function () {
                timer && clearTimeout(timer);
                _frame && removeFrame(_frame);
            }
        } else {
            frame = frame || getFrame();
            frame.setAttribute("src", command);
        }
    }

    return {
        protocol: protocol
    }
})();
/**
 * 与新闻客户端交互
 */
function NewsApp(protocolHandler) {
    var emptyFn = function () {
        },
        newsAppUA = (/NewsApp/ig).test(navigator.userAgent),
        androidReg = /Android/gi,
        debug = false,
        isAndroid = androidReg.test(navigator.platform) || androidReg.test(navigator.userAgent),
        Callbacks, Protocols;

    Callbacks = {
        afterEncrypt: [],
        afterShare: [],
        afterUserinfo: [],
        afterLogin: [],
        afterDevice: [],
        afterUploadImage: [],
        afterComment: [],
        afterOtherappinfo: [],
        afterActionbutton: [],
        afterAddAlarm: [],
        afterRemoveAlarm: [],
        afterCheckAlarm: [],
        afterTrashId: [],
        afterLocation: []
    };
    Protocols = {
        share: 'share://{TYPE}',
        updateprofile: 'updateprofile://',
        encrypt: 'encrypt://',
        pushview: 'pushview://{TYPE}',
        userinfo: 'userinfo://',
        login: 'login://',
        device: 'device://',
        uploadImageByCamera: 'uploadimage://camera/{W}_{H}',
        uploadImageByAlbum: 'uploadimage://album/{W}_{H}',
        openComment: 'newsapp://comment/{BOARD_ID}/{DOC_ID}/{TITLE}',
        comment: 'comment://',
        otherappinfo: isAndroid ? 'otherappinfo://' : 'otherappinfo://intent/',
        copy: 'copy://',
        toolbar: 'docmode://toolbar/{COMMAND}',
        modifytitle: 'docmode://modifytitle/{TITLE}',
        actionbutton: 'docmode://actionbutton/{NAME}',
        addAlarm: 'alarm://add',
        removeAlarm: 'alarm://remove',
        checkAlarm: 'alarm://check',
        trashid: 'trashid://',
        location: 'location://current'
    };

    function enableDebug() {
        debug = true;
    }

    function isNewsApp() {
        return newsAppUA || debug;
    }

    function protocol(action, callback) {
        protocolHandler(action, true);
        //开启调试
        if (debug && callback) {
            var _data = action.match(/[\w]:\/\/(.*)/);
            callback(_data && _data[1]);
        }
    }

    function afterCallback(rs, type) {
        if (Callbacks[type] && Callbacks[type].length > 0) {
            var callback = Callbacks[type].shift();
            callback && callback.call(this, rs);
        }
    }

    window.__newsapp_share_done = function (rs) {
        afterCallback(rs, 'afterShare');
    };
    window.__newsapp_encrypt_done = function (rs) {
        afterCallback(rs, 'afterEncrypt');
    };
    window.__newsapp_userinfo_done = function (rs) {
        afterCallback(rs, 'afterUserinfo');
    };
    window.__newsapp_login_done = function (rs) {
        afterCallback(rs, 'afterLogin');
    };
    window.__newsapp_device_done = function (rs) {
        afterCallback(rs, 'afterDevice');
    };
    window.__newsapp_upload_image_done = function (rs) {
        afterCallback(rs, 'afterUploadImage');
    };
    window.__newsapp_comment_done = function (rs) {
        afterCallback(rs, 'afterComment');
    };
    window.__newsapp_otherappinfo_done = function (rs) {
        afterCallback(rs, 'afterOtherappinfo');
    };
    window.__newsapp_browser_actionbutton = function (rs) {
        afterCallback(rs, 'afterActionbutton');
    };
    window.__newsapp_alarm_add_done = function (rs) {
        afterCallback(rs, 'afterAddAlarm');
    };
    window.__newsapp_alarm_remove_done = function (rs) {
        afterCallback(rs, 'afterRemoveAlarm');
    };
    window.__newsapp_alarm_check_done = function (rs) {
        afterCallback(rs, 'afterCheckAlarm');3
    };
    window.__newsapp_trashid_done = function (rs) {
        afterCallback(rs, 'afterTrashId');
    };
    window.__newsapp_location_done = function (rs) {
        afterCallback(rs, 'afterLocation');
    };
    //更新用户资料
    function updateProfile() {
        protocol(Protocols.updateprofile);
    }

    /**
     * 登录
     * @param {Function} callback 成功回调
     */
    function login(callback) {
        Callbacks.afterLogin.push(callback);
        protocol(Protocols.login, callback);
    }

    /**
     * 获取用户信息
     * @param {Function} callback 成功回调
     */
    function userInfo(callback) {
        Callbacks.afterUserinfo.push(callback);
        protocol(Protocols.userinfo, callback);
    }

    /**
     * 获取设备信息
     * @param {Function} callback 成功回调
     */
    function device(callback) {
        Callbacks.afterDevice.push(callback);
        protocol(Protocols.device, callback);
    }

    /**
     * 分享
     * @param {Function} callback 成功回调
     */
    function share(callback, type) {
        Callbacks.afterShare.push(callback);
        protocol(Protocols.share.replace('{TYPE}', type || ''), callback);
    }

    /**
     * 打开客户端视图
     * @param {String} type feedback,font,personalcenter,skin,font
     */
    function pushView(type) {
        protocol(Protocols.pushview.replace('{TYPE}', type));
    }

    /**
     * 加密
     * @param {String} data 待加密数据
     * @param {Function} callback 成功回调
     */
    function encrypt(data, callback) {
        Callbacks.afterEncrypt.push(callback);
        if (window.extra && window.extra.__newsapp_encrypt) {
            afterCallback(window.extra.__newsapp_encrypt(data), 'afterEncrypt');
        } else {
            protocol(Protocols.encrypt + encodeURIComponent(data), callback);
        }
    }

    /**
     * 上传图片 调用摄像头
     * @param {Integer} width 图片宽
     * @param {Integer} height 图片高
     * @param {Function} callback 成功回调
     */
    function uploadImageByCamera(width, height, callback) {
        Callbacks.afterUploadImage.push(callback);
        protocol(Protocols.uploadImageByCamera.replace('{W}', width).replace('{H}', height), callback);
    }

    /**
     * 上传图片 调用图库
     * @param {Integer} width 图片宽
     * @param {Integer} height 图片高
     * @param {Function} callback 成功回调
     */
    function uploadImageByAlbum(width, height, callback) {
        Callbacks.afterUploadImage.push(callback);
        protocol(Protocols.uploadImageByAlbum.replace('{W}', width).replace('{H}', height), callback);
    }

    /**
     * 打开文章跟贴
     * @param {String} boardid 版块ID
     * @param {String} docid 文章ID
     * @param {String} title 文章标题
     */
    function openComment(boardid, docid, title) {
        protocol(Protocols.openComment.replace('{BOARD_ID}', boardid).replace('{DOC_ID}', docid).replace('{TITLE}', title || ''));
    }

    /**
     * 直接发表跟贴
     * @param {Function} callback 成功回调
     */
    function comment(callback) {
        Callbacks.afterComment.push(callback);
        protocol(Protocols.comment, callback);
    }

    /**
     * 其他应用信息
     * @param {String} id
     * @param {Function} callback 成功回调
     */
    function otherappinfo(id, callback) {
        Callbacks.afterOtherappinfo.push(callback);
        protocol(Protocols.otherappinfo + id, callback);
    }

    /**
     * 复制文本到剪贴板
     * @param {String} text
     */
    function copy(text) {
        protocol(Protocols.copy + text);
    }

    /**
     * 显示隐藏正文工具栏
     * @param {String} command  show|hide
     */
    function toolbar(command) {
        protocol(Protocols.toolbar.replace('{COMMAND}', command));
    }

    /**
     * 更新标题
     * @param {String} title
     */
    function modifyTitle(title) {
        document.title = title || document.title;
        protocol(Protocols.modifytitle.replace('{TITLE}', encodeURIComponent(title)));
    }

    /**
     * 更新右上角功能菜单按钮
     * @param {String} name
     */
    function actionbutton(name, callback) {
        Callbacks.afterActionbutton.push(callback);
        protocol(Protocols.actionbutton.replace('{NAME}', encodeURIComponent(name)), callback);
    }

    /**
     * 添加本地提醒
     * @param {String} name
     */
    function addAlarm(callback) {
        Callbacks.afterAddAlarm.push(callback);
        if (window.extra && window.extra.__newsapp_alarm_add_done) {
            afterCallback(window.extra.__newsapp_alarm_add_done(), 'afterAddAlarm');
        } else {
            protocol(Protocols.addAlarm, callback);
        }
    }

    /**
     * 删除本地提醒
     * @param {String} name
     */
    function removeAlarm(callback) {
        Callbacks.afterRemoveAlarm.push(callback);
        if (window.extra && window.extra.__newsapp_alarm_remove_done) {
            afterCallback(window.extra.__newsapp_alarm_remove_done(), 'afterRemoveAlarm');
        } else {
            protocol(Protocols.removeAlarm, callback);
        }
    }

    /**
     * 检查本地提醒
     * @param {String} name
     */
    function checkAlarm(callback) {
        Callbacks.afterCheckAlarm.push(callback);
        if (window.extra && window.extra.__newsapp_alarm_check_done) {
            afterCallback(window.extra.__newsapp_alarm_check_done(), 'afterCheckAlarm');
        } else {
            protocol(Protocols.checkAlarm, callback);
        }
    }

    /**
     * 获取防刷id
     * @param {Function} callback 成功回调
     */
    function trashId(callback) {
        Callbacks.afterTrashId.push(callback);
        protocol(Protocols.trashid, callback);
    }

    /**
     * 获取本地位置
     * @param {Function} callback 成功回调
     */
    function location(callback) {
        Callbacks.afterLocation.push(callback);
        protocol(Protocols.location, callback);
    }

    /**
     * 打开网易新闻
     * @param {String} path 协议路径
     */
    function newsapp(path) {
        path = path || '/startup';
        if (isNewsApp()) {
            protocol('newsapp:/' + path);
        } else {
            window.open('http://m.163.com/newsapp/applinks.html?path=' + encodeURIComponent(path));
        }
    }
    
    return {
        isNewsApp: isNewsApp,
        login: login,
        userInfo: userInfo,
        device: device,
        share: share,
        encrypt: encrypt,
        updateProfile: updateProfile,
        uploadImageByCamera: uploadImageByCamera,
        uploadImageByAlbum: uploadImageByAlbum,
        pushView: pushView,
        openComment: openComment,
        comment: comment,
        otherappinfo: otherappinfo,
        copy: copy,
        toolbar: toolbar,
        modifyTitle: modifyTitle,
        actionbutton: actionbutton,
        enableDebug: enableDebug,
        addAlarm: addAlarm,
        removeAlarm: removeAlarm,
        checkAlarm: checkAlarm,
        trashId: trashId,
        location: location,
        newsapp: newsapp,
        protocol: protocol,
        Callbacks: Callbacks
    }
}//end newsApp

window.NewsAppClient = NewsApp(Navigator.protocol);

// export default window.NewsAppClient;

