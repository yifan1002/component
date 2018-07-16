//屏蔽不可用状态事件
$('.disabled a,a.disabled').click(function(e){
	e.preventDefault();
});

//屏蔽a链接选中虚线
$('a').attr('hidefocus', 'true');

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
$('.dropdown-menu li:not(.disabled)').click(function(e){
	//e.preventDefault();
	var $btnGroup = $(this).parents('.btn-group');
	$(this).addClass('active').siblings('li').removeClass('active');
	$btnGroup.removeClass('open');
	
	if ($btnGroup.hasClass('filter')) {
		e.preventDefault();
		var txt = $(this).text();
		$btnGroup.children('.dropdown-toggle').text(txt);
	}
});
$(document).click(function(event){
	var eo=$(event.target);
	if($('.dropdown-menu').is(':visible') && eo.attr('class') != 'dropdown-toggle' && !eo.parent('.btn-group').length && !eo.parents('.dropdown-menu').length)
	$('.btn-group').removeClass('open');
});

//下拉多选输入框
if($('.chosen-select')){
	$('.chosen-select').chosen({
		allow_single_deselect:true,
		disable_search_threshold: 10
	}); 
	//resize the chosen on window resize

	$(window)
	.off('resize.chosen')
	.on('resize.chosen', function() {
		$('.chosen-select').each(function() {
			var $this = $(this);
			$this.next().css({'width': $this.width()});
		})
	}).trigger('resize.chosen');
}

