//屏蔽不可用状态事件
$('.disabled a,a.disabled').click(function(e){
	e.preventDefault();
});

//屏蔽a链接选中虚线
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

//下拉菜单
$('.dropdown-toggle').not(':disabled').click(function(e){
	e.preventDefault();
	$('.dropdown-toggle').each(function(){
		var $g = $(this).parent('.btn-group'); 
		if ($g.hasClass('open')) {
			$g.removeClass('open');
		}
	});
	$(this).parent('.btn-group').toggleClass('open');
});
$(document).click(function(event){
	var eo=$(event.target);
	if($('.dropdown-menu').is(':visible') && eo.attr('class') != 'dropdown-toggle' && !eo.parent('.btn-group').length && !eo.parents('.dropdown-menu').length)
	$('.btn-group').removeClass('open');
});
$('.dropdown-menu li:not(.disabled)').click(function(e){
	e.preventDefault();
	var $btnGroup = $(this).parents('.btn-group');
	$(this).addClass('active').siblings('li').removeClass('active');
	$btnGroup.removeClass('open');
	
	if ($btnGroup.hasClass('filter')) {
		var txt = $(this).text();
		$btnGroup.children('.dropdown-toggle').text(txt);
	}
});











