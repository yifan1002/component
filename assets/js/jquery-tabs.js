//$('.tabs').formNumber({
//	mode: 0,
//});
;(function($,window,document,undefined){
	//定义Tabs的构造函数
	var Tabs = function(ele, opt) {
		_ = ele,
		defaults = {
			mode: 1
		},
		options = $.extend({}, defaults, opt)
	}
	//定义Tabs的方法
	Tabs.prototype = {
		//切换
		cut: function() {
			var	even = 'click';
			if(options.mode === 0){//鼠标滑过切换，其他全部为点击
				even = 'mouseover';
			};
			//console.log(options.mode);
			_.children().on(even, function(e){
				e.preventDefault();
				if (!$(this).hasClass('disabled')) {
					var g = $(this).parent('.tabs').attr('tabs-group');
					var href = $(this).children('a').attr('href');
					$(this).addClass('active').siblings().removeClass('active');
					$('.tabs-panel[tabs-group= '+ g +' ]').removeClass('active').siblings(href).addClass('active');
				}
			});
		}
		
	}
	//在插件中使用Tabs对象
	$.fn.tabs = function(options) {
		//创建Tabs的实体
		var newTabs = new Tabs(this, options);
		//调用其方法
		return this.each(function() {
			newTabs.cut();
		});
	}
})(jQuery,window,document);
