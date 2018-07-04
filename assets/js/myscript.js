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

//数字输入框
$('.form-number .form-control').keyup(function(){
	var num = /^\d{1,4}$/;
	if(!num.test($(this).val())){
		layer.msg('请输入数字！', {
			icon: 2,
			time: 1500,
			shade: 0.2
		});
		$(this).val('');
	};
});
$('.form-number > a').click(function(e){
	e.preventDefault();
	var $num = $(this).siblings('.form-control');
	var val = $num.val();
	if (!val ) val = 0;
	var num = parseInt(val);
	var step = $num.parent('.form-number').attr('data-step');
	if (step === undefined) {
		step = 1;
	} else{
		step = parseInt(step);
	}
	if ($(this).hasClass('form-number-add')) {
		num += step;
	} else{
		num -= step;
		if (num <= 0) num = 0;
	}
	$num.val(num);
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


