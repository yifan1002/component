//$('.js-password').sendCode({
//	btn: 'js-code-btn',
//	count: 60,
//	time: 5
//});
//发送验证码
;(function($,window,document,undefined){
    var SendCode = function(element, options) {
		_txt = element,
		defaults = {
			btn: 'js-code-btn',
			count: 60,
			time: 5
		},
		//options = $.extend({}, defaults, options),
		options = $.extend(defaults, options),
		_btn = $('.' + defaults.btn)
	}
    
    SendCode.prototype = {
    	//初始化
    	init: function() {
	    	//console.log(defaults);
	    	_txt.attr({'maxlength': 11});
	    	_btn.attr({'data-max': defaults.time, 'data-count': defaults.count});
	    },
	    //校验格式
		verify: function() {
			var phoneNum = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			//console.log(defaults.btn)
			//console.log(_btn)
			_txt.on('keyup focus', function(){
				val = $(this).val();
				//console.log(val);
				if (val.length === 11) {
					if(!phoneNum.test(val)){
						//调用layer.js
						layer.msg('请输入正确的手机号码！', {
							icon: 2,
							time: 1500,
							shade: 0.2
						});
					} else{
						_btn.removeAttr('disabled');
					};
				} else{
					_btn.prop('disabled', true);
				}
			});
		},
	    send: function() {
	    	_btn.click(function(e){
				e.preventDefault();
				//console.log(_btn.prop('disabled'));
				if(_btn.prop('disabled') === false){
					//console.log('send');
					var start_time = new Date();
					start_time = start_time.getTime();//获取开始时间的毫秒数
					var newTime = parseInt(_btn.attr('data-max') - 1);
					var timeCount = _btn.attr('data-count');
					if(newTime >= 0){
						_btn.attr('data-max',newTime).prop('disabled', true).text(timeCount + "秒后重获取");
						
						downTime = setInterval(function(){
							//倒计时实时结束时间
							var end_time = new Date();
							end_time = end_time.getTime();
							//得到剩余时间
							var dtime = timeCount - Math.floor((end_time - start_time) / 1000);
							_btn.text(dtime + "秒后重获取");
								if(dtime <= 0){
									_btn.removeAttr('disabled').text("获取验证码");//启用按钮
									_txt.removeAttr('disabled');
									window.clearInterval(downTime);
								};
						},1000);
						
						_txt.prop('disabled', true);
					}else{
						//调用layer.js
						layer.msg('发送次数过多，请明天再来！', {
							icon: 2,
							time: 1500,
							shade: 0.2
						});
					};
				};
			});
	    }
    }

    $.fn.sendCode = function (options) {
        var newCode = new SendCode(this, options);
		return this.each(function() {
            newCode.init();
            newCode.verify();
            newCode.send();
        });
    }
})(jQuery,window,document);