//$('.form-number').formNumber({
//	step:2,
//	size:3
//});
(function($) {
	//定义FormNumber的构造函数
	var FormNumber = function(ele, opt) {
		$element = ele,
		defaults = {
			step: 1,
			size: 2
		},
		options = $.extend({}, defaults, opt)
	}
	//定义FormNumber的方法
	FormNumber.prototype = {
		//初始化
		init: function() {
			var className = ''
			if(options.size === 1) {
				className = 'form-number form-number-sm';
			} else if(options.size === 2) {
				className = 'form-number';
			} else {
				className = 'form-number form-number-lg';
			}
			$element.addClass('form-control').wrap('<div class="' + className + '" data-step="' + options.step + '"></div>').after('<a href="#" class="form-number-add">+</a><a href="#" class="form-number-sub">-</a>');
		},
		//校验格式
		verify: function() {
			$('body').on('keyup', '.form-number .form-control', function(){
				var num = /^\d{1,4}$/;
				if(!num.test($(this).val())){
					//调用layer.js
					layer.msg('请输入数字！', {
						icon: 2,
						time: 1500,
						shade: 0.2
					});
					$(this).val('');
				};
			});
		},
		//加减运算
		calculate: function() {
			$('body').off('click').on('click', '.form-number > a', function(e) {
				e.preventDefault();
				var $num = $(this).siblings('.form-control');
				var val = $num.val();
				if(!val) val = 0;
				var num = parseInt(val);
				var step = parseInt($(this).parent('.form-number').attr('data-step'));
				if($(this).hasClass('form-number-add')) {
					num += step;
				} else {
					num -= step;
					if(num <= 0) num = 0;
				}
				$num.val(num);
			});
		}
	}
	//在插件中使用FormNumber对象
	$.fn.formNumber = function(options) {
		//创建FormNumber的实体
		var newNumber = new FormNumber(this, options);
		//调用其方法
		newNumber.init();
		newNumber.verify();
		newNumber.calculate();
	}
})(jQuery);