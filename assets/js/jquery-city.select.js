//$('.citySelect').sendCode();
//发送验证码
;(function($,window,document,undefined){
    var CitySelect = function(element, opt) {
		_ = element,
		defaults = {
			
		},
		options = $.extend({}, defaults, opt)
	}
    
    CitySelect.prototype = {
    	//初始化
    	init: function() {
			_.addClass('form-control-toggle').prop('readonly', true);
    	},
    	//显示功能组件：加载省数据
    	show: function() {
	    	//console.log(options);
	    	var initStr = '<div class="city-select">' +
				'<ul class="city-select-tab">' +
					'<li class="active">选择省份</li>' +
					'<li>选择城市</li>' +
					'<li>选择区县</li>' +
				'</ul>' +
				'<div id="province" class="city-select-list">' +
					'<dl>' +
						'<dt>A-G</dt>' +
						'<dd><span pro-sort="0">北京</span><span pro-sort="11">安徽</span><span pro-sort="12">福建</span><span pro-sort="18">广东</span><span pro-sort="19">广西</span><span pro-sort="21">重庆</span><span pro-sort="23">贵州</span><span pro-sort="27">甘肃</span><span pro-sort="32">澳门</span></dd>' +
					'</dl>' +
					'<dl>' +
						'<dt>H-K</dt>' +
						'<dd><span pro-sort="9">江苏</span><span pro-sort="13">江西</span><span pro-sort="15">河南</span><span pro-sort="2">河北</span><span pro-sort="16">湖北</span><span pro-sort="17">湖南</span><span pro-sort="20">海南</span><span pro-sort="6">吉林</span><span pro-sort="7">黑龙江</span></dd>' +
					'</dl>' +
					'<dl>' +
						'<dt>L-S</dt>' +
						'<dd><span pro-sort="8">上海</span><span pro-sort="1">天津</span><span pro-sort="14">山东</span><span pro-sort="3">山西</span><span pro-sort="22">四川</span><span pro-sort="26">陕西</span><span pro-sort="4">内蒙古</span><span pro-sort="5">辽宁</span><span pro-sort="28">青海</span><span pro-sort="29">宁夏</span></dd>' +
					'</dl>' +
					'<dl>' +
						'<dt>T-Z</dt>' +
						'<dd><span pro-sort="10">浙江</span><span pro-sort="24">云南</span><span pro-sort="25">西藏</span><span pro-sort="30">新疆</span><span pro-sort="31">台湾</span><span pro-sort="33">香港</span></dd>' +
					'</dl>' +
				'</div>' +
				'<ul id="city" class="city-select-list"></ul>' +
				'<ul id="district" class="city-select-list"></ul>' +
			'</div>';
			_.click(function(){
				$('.city-select-txt').removeClass('city-select-txt');
				$(this).addClass('city-select-txt');
				if ($('.city-select').length === 1) {
					$('.city-select').remove();
				}
				var o_top = $(this).offset().top + $(this).height();
				var o_left = $(this).offset().left;
				//console.log(o_top);
				//console.log(o_left);
				$('body').append(initStr);
				var $city = $('.city-select');
				$city.css({top: o_top, left: o_left});
			});
	    },
	    //隐藏功能组件
	    hide: function(){
	    	$(document).click(function(event){
				var eo=$(event.target);
				//console.log($('.city-select').length);
				//console.log(eo.hasClass('city-select-txt'));
				if(!eo.hasClass('city-select-txt') && !eo.parents('.city-select').length){
					$('.city-select').remove();
					$('.city-select-txt').removeClass('city-select-txt').removeAttr('data-province data-city data-district');
				}
			});
	    },
	    //选取数据
		selectData: function(){
			//console.log(_);
			//省相关操作
			$('body').on('click','#province dd > span',function(){
				//省选择获取数据
				var province_txt = $(this).text();
				$('#province dd > span').removeClass('active');
				$(this).addClass('active');
				$('.city-select-txt').val(province_txt).attr('data-province',province_txt);
				//获取市列表
				var proSort=$(this).attr('pro-sort');
				$('.city-select-tab li:eq(1)').addClass('active').siblings('li').removeClass('active');
				$('.city-select-tab li:eq(0)').addClass('can');
				$('#province').hide().next('#city').show();
				$.getJSON('./assets/js/city.data-3.json', function(data2) {
			        $('#city,#district').html('');//清空市、区列表
			        $.each(data2[proSort].city, function(y, item2) {
			        	//插入市列表
			            $('#city').append(
		                    '<li pro-sort="'+ proSort +'" city-sort="'+ y +'">' + item2.name + '</li>' 
		                );
			        });
		        });
			});
			
			//市相关操作
			$('body').on('click','#city li',function(){
				//市选择获取数据
				var province_txt = $('.city-select-txt').attr('data-province');
				var city_txt = $(this).text();
				$(this).addClass('active').siblings('li').removeClass('active');
				$('.city-select-txt').val(province_txt + '/' + city_txt).attr('data-city', city_txt);
				//获取区列表
				var proSort = $(this).attr('pro-sort');
				var citySort = $(this).attr('city-sort');
				$('.city-select-tab li:eq(2)').addClass('active').siblings('li').removeClass('active');
				$('.city-select-tab li:eq(0),.city-select-tab li:eq(1)').addClass('can');
				$('#province').hide().next('#city').hide().next('#district').show();
				$.getJSON('./assets/js/city.data-3.json', function(data3) {
			        $('#district').html('');//清空区列表
			        $.each(data3[proSort].city[citySort].area, function(z, item3) {
			        	//插入区列表
			            $('#district').append(
		                    '<li>' + item3 + '</li>' 
		                );
			        });
		        });
			});
			
			//区相关操作
			$('body').on('click','#district li',function(){
				//区选择获取数据
				var province_txt = $('.city-select-txt').attr('data-province');
				var city_txt = $('.city-select-txt').attr('data-city');
				var district_txt = $(this).text();
				$(this).addClass('active').siblings('li').removeClass('active');
				$('.city-select-txt').val(province_txt + '/' + city_txt + '/' + district_txt).attr('data-district', district_txt);
				$('.city-select').remove();
				$('.city-select-txt').removeClass('city-select-txt').removeAttr('data-province data-city data-district');
			});
			
			//tab切换-回退
			$('body').on('click','.city-select-tab li.can',function(){
				$(this).addClass('active').removeClass('can').siblings('li').removeClass('active');
				$('.city-select-tab li:gt(' + $(this).index() + ')').removeClass('can');
				$('.city-select-list:eq(' + $(this).index() + ')').show().siblings('.city-select-list').hide();
			});
		}
		
		
    }

    $.fn.citySelect = function (options) {
        var newCity = new CitySelect(this, options);
		return this.each(function() {
            newCity.init();
            newCity.show();
            newCity.hide();
            newCity.selectData();
        });
    }
})(jQuery,window,document);