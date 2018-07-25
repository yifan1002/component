//$('#textScroll').formNumber({
//	direction: 'right',
//	speed: 60,
//	offset: 0
//});
;(function($,window,document,undefined){
	$.fn.textScroll = function(opt) {
		var $outer = $(this);
		defaults = {
            direction: 'left',	//滚动方向
			speed: 60,			//滚动速度
			offset: 0 			//初始位置，百分比，只写整数即可；0全隐藏、100全显示
        };
        options = $.extend({}, defaults, opt);
        
        var txt = $outer.text();
		$outer.text('').addClass('marquee').append('<div class="marquee-inner" data-speed="' + options.speed + '" data-direction="' + options.direction + '">' + txt + '</div>');
		var	$inner = $outer.children('.marquee-inner'),
			outer_w = $outer.width(),
			inner_w = $inner.width(),
			percent = options.offset / 100,
			s_left;
		if (options.direction == 'right') {
			s_left = percent * outer_w - inner_w;
		} else{
			s_left = (1 - percent) * outer_w;
		}
		$inner.css({
			left: s_left
		});
		var o_time = (inner_w + outer_w) / options.speed * 1000;
		play();
		
		$inner.on({
			mouseenter: function() {
				direction = $(this).attr('data-direction');
				var _offset = $(this).position().left;
				var _speed = parseInt($(this).data('speed'));
				$(this).stop();
				if (direction == 'right') {
					_offset = -_offset 
				}
				e_time = (inner_w + _offset) / _speed * 1000;
			},
			mouseleave: function() {
				play(e_time);
				e_time = undefined;
			}
		});
		
		function play(m) {
			var time = m == undefined ? o_time : m;
			var e_left, n_left;
			if ($inner.attr('data-direction') == 'right') {
				e_left = outer_w;
				n_left = -inner_w;
			} else{
				e_left = -inner_w;
				n_left = outer_w;
			}
			$inner.animate({
				left: e_left
			}, time, 'linear', function() {
				$(this).css('left', n_left);
				play();
			});
		}
		
	}
})(jQuery,window,document);
