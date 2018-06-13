$('.disabled a,a.disabled').click(function(e){
	e.preventDefault();
});

$('a').attr('hidefocus', 'true');

//tab选项卡
function tabs(tab, e){
	var	even = 'click';
	if(e === 0){//鼠标滑过切换，其他全部为点击
		even = 'mouseover';
	};
	$(tab).on(even, function(e){
		e.preventDefault();
		if (!$(this).hasClass('disabled')) {
			var g = $(this).parent('.tabs').attr('tabs-group');
			var href = $(this).children('a').attr('href');
			$(this).addClass('active').siblings().removeClass('active');
			$('.tabs-panel[tabs-group= '+ g +' ]').removeClass('active').siblings(href).addClass('active');
		}
	});
};
tabs('.tabs li', 1);