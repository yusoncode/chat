Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S+": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            var toReplaceStr = "";
            if (RegExp.$1.length == 1) {
                toReplaceStr = o[k];
            } else if (RegExp.$1.length == 2) {
                toReplaceStr = ("00" + o[k]).substr(("" + o[k]).length)
            } else {
                toReplaceStr = ("000" + o[k]).substr(("" + o[k]).length)
            }
            fmt = fmt.replace(RegExp.$1, toReplaceStr);
        }
    }
    return fmt;
};

var DateUtil = {
    formatDate: function (time, pattern) {
        return new Date(time).Format(pattern);
    },

    /**
     * 返回指定时间戳  0点跟23:59:59的时间戳（毫秒）
     * @return {{todayStartTime: number, todayEndTime: number}}
     */
    getStartTimeAndEndTime : function (timestap) {
        var today = new Date(timestap);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        var todayStartTime = Date.parse(today);
        today.setHours(23);
        today.setMinutes(59);
        today.setSeconds(59);
        today.setMilliseconds(0);
        var todayEndTime=Date.parse(today);
        return {'yesterdayStartTime' : (todayStartTime - 86400000), 'yesterdayEndTime' : (todayEndTime - 86400000),'todayStartTime': todayStartTime, 'todayEndTime' : todayEndTime};
    },

    /**
     * 时间戳，查询当前时间戳的(本周) 周日-周六 时间戳
     * @param timestamp
     * @return {{sundayTime: number, saturdayTime: *}}
     */
    getWeekStartTimeAndEndTime:function (timestamp) {
        /**
         * day:
         *    0  1  2  3  4  5  6 0
         *    日 一 二 三 四 五 六 日
         * @type {Date}
         */
        var now = new Date(timestamp);
        var day = now.getDay();
        var oneDayLong = 86400000 ; //一天的毫秒数

        var sundayTime = timestamp - (day) * oneDayLong  ;
        var saturdayTime =  timestamp + (6-day) * oneDayLong ;
        return {'sundayTime' : sundayTime, 'saturdayTime' : saturdayTime};


    }
};

module.exports = DateUtil;