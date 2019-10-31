//$('#countDown').formCount({
//	endTime: '2019/10/1 00:00:00',
//	curTime: '2019/10/1 00:00:00'
//});
//倒计时
;
(function($, window, document, undefined) {
	//默认参数
	var defaults = {
		endTime: '2099/10/1 00:00:00', //结束时间
		curTime: new Date(), //结束时间，默认本地当前时间
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
				endTime = new Date(this.options.endTime).getTime(),
				curTime = new Date(this.options.curTime).getTime(),
				diffMs = endTime - curTime; //时间差

			_countDown(diffMs);
			var timer = window.setInterval(function() {
				diffMs -= 1000;
				_countDown(diffMs);
			}, 1000);

			function _countDown(diffMs) {
				if(diffMs > 0) {
					var diffD = parseInt(diffMs / (60 * 60 * 24 * 1000)), //转换为天
						D = diffMs - diffD * 60 * 60 * 24 * 1000, //除去天的毫秒数
						diffH = parseInt(D / (60 * 60 * 1000)), //除去天的毫秒数转换成小时
						H = D - diffH * 60 * 60 * 1000, //除去天、小时的毫秒数
						diffM = parseInt(H / (60 * 1000)), //除去天的毫秒数转换成分钟
						M = H - diffM * 60 * 1000, //除去天、小时、分的毫秒数
						diffS = parseInt(M / 1000); //除去天、小时、分的毫秒数转化为秒
					_el.html('<span>' + diffD + "</span>天<span> " + diffH + "</span> 小时 <span>" + diffM + "</span> 分 <span>" + diffS + "</span> 秒");
				} else {
					_el.html('已结束！');
					clearInterval(timer);
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