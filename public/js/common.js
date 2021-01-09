var common = {
    WEBSOCKET_SESSIONSTORAGE_NAME: "websocket",
    WEBSOCKET_HOST: "ws://127.0.0.1:8080",
    /**
     *
     * @param content
     * @param overTime   什么时候执行
     * @param excuteTime 执行所需要的时间
     * @param callback
     */
    createTip: function (content, overTime, excuteTime, callback) {
        var html =
            '<div class="tip">' +
            '   <div class="tip_con">' +
            '     <span class="tip_con_text">' + content + '</span>' +
            '   </div>' +
            '</div>';
        $("body").append(html);
        var tip = $(".tip");
        setTimeout(function () {
            tip.fadeOut(excuteTime, function () {
                tip.remove();
                if (callback && typeof callback == "function") {
                    callback();
                }
            });
        }, overTime);

    },
    /*显示隐藏表情*/
    showHiddenEmoji: function (sendFlag) {
        var fontSize = parseInt($("html").css("font-size"));
        var footerHeight = parseInt($(".footer").outerHeight());
        if (sendFlag) {
            if ((footerHeight / fontSize) <= 2) {

            } else {
                $(".footer").animate({"height": "1rem"}, 300);
            }
        } else {
            if ((footerHeight / fontSize) <= 2) {
                $(".footer").animate({"height": "4rem"}, 300);

            } else {
                $(".footer").animate({"height": "1rem"}, 300);
            }
        }
    },
    /*清空聊天输入框*/
    clearChatInput: function () {
        $('.footer_send_val').html("");
    }
}