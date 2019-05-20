//$('.tabs').tabs({
//	event: 0,
//});
//tabs切换
;
(function($, window, document, undefined){
	//默认参数
	var defaults = {
		evt: 1,	//事件：0-鼠标滑过切换，其他全部为点击
		ant: 1, //动画：1-直接显示隐藏；2-淡入淡出；3-滑上滑下
		jump: 0 //链接调整：0-不是，阻止默认链接，其他全部为默认链接
	};
	
	//定义构造函数
	function Tabs(element, setting) {
		this.element = element;
		this.options = $.extend({}, defaults, setting);
		this.cut();
	};

	//定义方法
	Tabs.prototype = {
		//切换
		cut: function() {
			//console.log(this.options);
			var _ = this,
				_el = $(this.element),
				evt = 'click',
				ant = this.options.ant,
				jump = this.options.jump;
			if(this.options.evt === 0) {
				evt = 'mouseover';
			};
			_el.children('.tab').on(evt, function(e) {
				if (jump === 0) {
					e.preventDefault();
				}
				if (!$(this).hasClass('disabled')) {
					var g = $(this).parent('[tabs-group]').attr('tabs-group');
					var href = $(this).attr('href');
					if (!href) {
						var href = $(this).children('a').attr('href');
					}
					$(this).addClass('active').siblings().removeClass('active');
					$('.tabs-panel[tabs-group= '+ g +' ]').hide();
					if(ant === 1) {
						$(href).show();
					} else if(ant === 2) {
						$(href).fadeIn();
					} else if(ant === 3) {
						$(href).slideDown();
					}
				}
			});
		}
	};
	
	//定义插件
	$.fn.tabs = function(options) {
        return this.each(function(index, element) {
            element.tabs = new Tabs(element, options);
        });
	};
	
})(jQuery, window, document);