//$('.js-password').sendCode({
//	btn: 'js-code-btn',
//	count: 60,
//	time: 5
//});
//发送验证码
;(function($,window,document,undefined){
    var SendCode = function(element, opt) {
		_txt = element,
		defaults = {
			btn: '.js-code-btn',
			counts: 60,
			times: 5
		},
		options = $.extend({}, defaults, opt),
		_btn = $(options.btn)
	}
    
    SendCode.prototype = {
    	//初始化
    	init: function() {
	    	//console.log(defaults);
	    	_txt.attr({'maxlength': 11});
	    	_btn.attr({'data-counts': options.counts, 'data-times': options.times});
	    	//console.log(_btn)
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
						_btn.prop('disabled', false);
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
					var times = parseInt(_btn.attr('data-times') - 1);
					var counts = parseInt(_btn.attr('data-counts'));
					if(times >= 0){
						_btn.attr('data-times',times).prop('disabled', true).text(counts + "秒后重获取");
						
						downTime = setInterval(function(){
							//倒计时实时结束时间
							var end_time = new Date();//获取结束时间的毫秒数
							end_time = end_time.getTime();
							//得到剩余时间
							var d_time = counts - Math.floor((end_time - start_time) / 1000);
							_btn.text(d_time + "秒后重获取");
								if(d_time <= 0){
									_btn.prop('disabled', false).text("获取验证码");//启用按钮
									_txt.prop('disabled', false);//启用输入框
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