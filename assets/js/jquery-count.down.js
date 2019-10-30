//$('#countDown').formCount({
//	data: '2019/10/1 00:00:00'
//});
//倒计时
;
(function($, window, document, undefined){
	//默认参数
	var defaults = {
		endTime: '2099/10/1 00:00:00', //当前时间
		curTime: new Date() //结束时间，默认本地当前时间
	};
	
	//定义构造函数
	function CountDown(element, setting) {
		this.element = element;
		this.options = $.extend({}, defaults, setting);
		this.init();
	};

	//定义方法
	CountDown.prototype = {
		//初始化
		init: function() {
			//console.log(this.options.endTime);
			var _ = this,
				_el = $(this.element),
				endTime = this.options.endTime,
				curTime = new Date(this.options.curTime).getTime();
			
			_countDown(curTime);
			window.setInterval(function(){
				curTime += 1000;
				_countDown(curTime);
			}, 1000);
			
			function _countDown(time) {
				var startTime = new Date(time), //当前时间
					stopTime = new Date(endTime), //结束时间
					diffTime= stopTime.getTime() - startTime.getTime();
				if (diffTime > 0) {
					var diffMs = stopTime.getTime() - startTime.getTime(), //倒计时毫秒数
						diffD = parseInt(diffMs / (60 * 60 * 24 * 1000)), //转换为天
						D = parseInt(diffMs) - parseInt(diffD * 60 * 60 * 24 * 1000), //除去天的毫秒数
						diffH = parseInt(D / (60 * 60 * 1000)), //除去天的毫秒数转换成小时
						H = D - diffH * 60 * 60 * 1000, //除去天、小时的毫秒数
						diffM = parseInt(H / (60 * 1000)), //除去天的毫秒数转换成分钟
						M = H - diffM * 60 * 1000, //除去天、小时、分的毫秒数
						diffS = M / 1000; //除去天、小时、分的毫秒数转化为秒
					_el.html('<span>' + diffD + "</span>天<span> " + diffH + "</span> 小时 <span>" + diffM + "</span> 分 <span>" + diffS + "</span> 秒");
				} else{
					_el.html('已结束！');
				}
			}
			
		}
	};
	
	//定义插件
	$.fn.countDown = function(options) {
        return this.each(function(index, element) {
            element.countDown = new CountDown(element, options);
        });
	};
	
})(jQuery, window, document);