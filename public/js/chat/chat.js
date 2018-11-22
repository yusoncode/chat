var chat = {
    /**
     *     data '{"userId":XXX,"userName":XXX,"type":0,"content":XXX,"timeStr":XXX,"connNums": XXX,"userArray": [{userId:XXX,userName:XXX},]}'
     *      userId:用户ID
     *      userName:用户名
     *      type:类型 [1:普通消息，2：系统通知]
     *      content:内容
     *      timeStr:时间格式化
     *      connNums:连接数
     *      userArray:用户数组
     */
    /**
     * 发送信息
     * @param {Object} data
     */
    send: function (data) {
        var str = data.content; //'[emoji:"1.gif"][emoji:"2.gif"]呜呜呜'
        //[emoji:"1.gif"] 替换成 <img src = "XXX/1.gif" alt = "" />
        var str1 = str.match(/\[emoji([\s\S]*?)\]/g); //获取[emojiXXX] 所有内容
        if (str1 && str1.length > 0) {
            for (var i = 0; i < str1.length; i++) {
                var id = str1[i].replace(/\[/, "").replace(/\]/, "").split(":")[1];
                var new_str = '<img src = "../../img/emoji/' + id + '" alt = ""/>';
                str = str.replace(str1[i], new_str);
            }
        }

        var html =
            '<div class="show">' +
            '	<div class="time">' + data.timeStr + '</div>' +
            '	<div class="msg">' +
            '		<img src="../img/friends.jpg" class="float_right">' +
            '		<p class="nickname float_right">' + data.userName + '</p>' +
            '		<p class="visibility_hidden nickname">' + data.userName + '</p>' +
            '		<p class="float_right content"><i class="msg_input"></i>' + str + '</p>' +
            '	</div>' +
            '</div>';
        this.appendMeg(html);
    },
    /**
     * 接收信息
     * @param {Object} data
     */
    show: function (data) {
        var str = data.content; //'[emoji:"1.gif"][emoji:"2.gif"]呜呜呜'
        //[emoji:"1.gif"] 替换成 <img src = "XXX/1.gif" alt = "" />
        var str1 = str.match(/\[emoji([\s\S]*?)\]/g); //获取[emojiXXX] 所有内容
        if (str1 && str1.length > 0) {
            for (var i = 0; i < str1.length; i++) {
                var id = str1[i].replace(/\[/, "").replace(/\]/, "").split(":")[1];
                var new_str = '<img src = "../../img/emoji/' + id + '" alt = ""/>';
                str = str.replace(str1[i], new_str);
            }
        }
        //判断通知类型
        var type = data.type;
        if (type == 2) {
            common.createTip(str, 1000, 500);
            return;
        }

        var html =
            '<div class="send">' +
            '	<div class="time">' + data.timeStr + '</div>' +
            '	<div class="msg">' +
            '		<img src="../img/chat_icon.jpg" alt="" class="float_left">' +
            '		<p class="nickname float_left">' + data.userName + '</p>' +
            '		<p class="visibility_hidden nickname">' + data.userName + '</p>' +
            '		<p class="float_left content"><i class="msg_input"></i>' + str + '</p>' +
            '	</div>' +
            '</div>';
        this.appendMeg(html);
    },

    //点击表情，添加到文本框
    clickEmoje: function (imgObj) {
        var html =
            '<img src="' + imgObj.src + '" alt="" id = "' + imgObj.src.substring(imgObj.src.lastIndexOf("/") + 1) + '"/>';
        $('.footer_send_val').append(html);

    },
    /*添加到我的朋友成员*/
    addFriends: function (data) {
        var userNums = data.connNums;
        var userArray = data.userArray;
        var html = "";
        for (var i = 0; i < userArray.length; i++) {
            var user = userArray[i];
            html +=
                '<li>' +
                '	<img src="../img/friends.jpg" alt="">' +
                '	<p>' + user.userName + '</p>' +
                '</li>';
        }
        $("#friends .tit").text("成员信息(在线" + userNums + ")");
        $("#friends .list").html(html);


    },

    /*添加信息到列表*/
    appendMeg: function (html) {
        $('.message').append(html);
        $('body').animate({
            scrollTop: $('.message').outerHeight() - window.innerHeight + $(".footer").outerHeight()
        }, 200);
    },
    /*显示聊天主页*/
    showChat: function () {
        $("#friends").hide();
        $("#chat").fadeIn(100);
    },
    /*显示朋友成员*/
    showFriends: function () {
        $("#chat").hide();
        $("#friends").fadeIn(100);
    }

}