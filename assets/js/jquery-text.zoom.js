//$('.citySelect').sendCode();
//发送验证码
;(function($,window,document,undefined){
    var TextZoom = function(element, options) {
		_ = element,
		defaults = {
			offset: 1,
			split: 4,
			format: '-'
		},
		//options = $.extend({}, defaults, options),
		options = $.extend(defaults, options)
	}
    
    TextZoom.prototype = {
    	init: function(){
    		_.attr({'data-offset': defaults.offset, 'data-split': defaults.split, 'data-format': defaults.format});
    	},
    	//显示功能组件
    	show: function() {
	    	//console.log(defaults);
	    	var initStr = '<span class="text-zoom"></span>';
			_.on('focus', function(){
				$('.text-zoom-from').removeClass('text-zoom-from');
				$(this).addClass('text-zoom-from');
				if ($('.text-zoom').length === 1) {
					$('.text-zoom').remove();
				}
				var o_left = $(this).offset().left;
				if(parseInt($(this).attr('data-offset')) === 1){
					var o_top = $(this).offset().top - 48;
				} else{
					var o_top = $(this).offset().top + $(this).height();
				}
				//console.log(o_top);
				//console.log(o_left);
				$('body').append(initStr);
				var $zoom = $('.text-zoom');
				$zoom.css({top: o_top, left: o_left});
				$zoom.text(splitStr());
				if ($zoom.text().length > 0) {
					$zoom.show();
				}
			});
			_.on('keyup', function(){
				var $zoom = $('.text-zoom');
				$zoom.text(splitStr());
				if ($zoom.text().length > 0) {
					$zoom.show();
				} else{
					$zoom.hide();
				}
				
			});
	    },
	    //隐藏功能组件
	    hide: function(){
	    	$(document).click(function(event){
				var eo=$(event.target);
				if(!eo.hasClass('text-zoom-from') && !eo.parents('.city-select').length){
					$('.text-zoom').remove();
					$('.text-zoom-from').removeClass('text-zoom-from').removeAttr('data-province data-city data-district');
				}
			});
	    }
	   
    }

    $.fn.textZoom = function (options) {
        var newZoom = new TextZoom(this, options);
		return this.each(function() {
            newZoom.init();
            newZoom.show();
            newZoom.hide();
        });
    }
    
    //分割字符串方法
	function splitStr(){
		var $from = $('.text-zoom-from');
		var splitType = parseInt($from.attr('data-split'));
		var connector = $from.attr('data-format');
		var txtStr = $from.val();
		var txtLen = txtStr.length;
		var txtMax = Math.ceil(txtLen / splitType);
		var splitTxt = '';
		for(i=0;i<txtMax; i++){
			var splitStart = i * splitType;
			splitTxt = splitTxt + txtStr.substr(splitStart, splitType) + connector;
		};
		splitTxt = splitTxt.substring(0, splitTxt.length - 1);
		return splitTxt;
	};
})(jQuery,window,document);