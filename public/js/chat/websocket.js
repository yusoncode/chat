var webSocket = {
	userId: null,
	userName: null,
	ws: null,
	data: {},
	/**
	 * @param {Object} userName
	 * @param {Object} host
	 */
	webSocketOpr: function(userName, host) {
		var _this = this;
		if(!("WebSocket" in window)) {
			layer.open({
				className: "layer_tip",
				title: '您的浏览器不支持 WebSocket!',
			});
			return;
		}
		// 打开一个 web socket ws://127.0.0.1:8080
		_this.ws = new WebSocket(host + "/userName=" + userName);
		_this.data.userName = userName;
		_this.data.content = "大家好，我是" + userName + "，非常开心来这里聊天";
		_this.ws.onopen = function(e) {
			// Web Socket 已连接上，使用 send() 方法发送数据
			console.log("连接成功");
			// window.sessionStorage.setItem(common.WEBSOCKET_SESSIONSTORAGE_NAME, _this.ws);
			_this.userName = userName;
			_this.ws.send(JSON.stringify(_this.data));
		};

		_this.ws.onmessage = function(e) {
			console.log("数据已接收..." + e.data);
			var data = JSON.parse(e.data);
			_this.userId = data.userId;
			//放入我的朋友成员
			chat.addFriends(data);
			if(data.userName != _this.userName) {
				//别人信息
				chat.show(data)
			} else {
				//自己的信息
				chat.send(data);
			}
		};
		_this.ws.onerror = function(e) {
			console.log("连接异常...");
			// window.sessionStorage.removeItem(common.WEBSOCKET_SESSIONSTORAGE_NAME);
		};

		_this.ws.onclose = function(e) {
			console.log("连接已关闭...");
			common.createTip("连接已关闭...", 1000, 500);
			// window.sessionStorage.removeItem(common.WEBSOCKET_SESSIONSTORAGE_NAME);
		};

	},
	//点击发送
	sendClick: function() {
		_this = this;
		var str = $('.footer_send_val').html().trim();
		if(!str) {
            common.createTip("请输入内容!!!", 1000, 500);
			return;
		}
        //表情跟文字混合 表情统一 [emoji:XX]
        //数组
        var str1 = str.match(/<img([\s\S]*?)>/g);
       //<img src="http://10.0.0.60:3000/img/emoji/1.gif" alt="" id="1.gif">,<img src="http://10.0.0.60:3000/img/emoji/1.gif" alt="" id="1.gif">
		if(str1 && str1.length > 0){
            for(var i = 0; i < str1.length; i++){
                if(str1[i].indexOf("src") !== -1) {   //如果数组中的元素能找到src的话
                    var id = str1[i].match(/id="([\s\S]*?)"/);//找元素里面找"id"这个字符串，
                    id = id[0].split("=")[1].replace(/\"/g,"");//去除多个双引号

                    var new_str = '[emoji:' + id + ']';
                    //然后把这个img标签替换为[emoji:id]的形式
                    str= str.replace(str1[i], new_str);
                }

            }
        }
        str = str.replace(/\\"/g, "");
//		'{"userId":XXX,"userName":XXX,"type":0,"content":XXX,"timeStr":XXX}'
        var data = {
        	userId : _this.userId,
        	userName : _this.userName,
        	type : 1,
        	content:str
        };

		if(_this.ws){
            common.clearChatInput();
            common.showHiddenEmoji(true);
            _this.ws.send(JSON.stringify(data));
		}
	}
}