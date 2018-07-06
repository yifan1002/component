//$('.js-password').showPassord({
//	show: true,
//	size: 3
//});
//密码显示隐藏
;(function($,window,document,undefined){
    var ShowPassword = function(element, options) {
		_ = element,
		defaults = {
			show: false,
			size: 2
		},
		//options = $.extend({}, defaults, options)
		options = $.extend(defaults, options)
	}
    
    ShowPassword.prototype = {
    	init: function() {
	    	//console.log(defaults);
	    	var className = '', formSize = '';
	    	if (defaults.show === false) {
	    		_.attr('type', 'password');
	    		className = 'hide';
	    	} else{
	    		_.attr('type', 'text');
	    		className = 'show';
	    	}
	    	if (defaults.size === 1) {
	    		_.removeClass('form-control-lg').addClass('form-control-sm');
	    	} else if (defaults.size === 2) {
	    		_.removeClass('form-control-sm form-control-lg');
	    	} else{
	    		_.removeClass('form-control-sm').addClass('form-control-lg');
	    	}
	    	_.wrap('<div class="form-group-pwd"></div>').after('<i class="' + className + '"></i>');
	    },
	    change: function() {
	    	$('body').off('click').on('click', '.form-group-pwd > i', function(){
	    		if ($(this).hasClass('hide')) {
	    			$(this).addClass('show').removeClass('hide').siblings('.form-control').attr('type', 'text');
	    		} else{
	    			$(this).addClass('hide').removeClass('show').siblings('.form-control').attr('type', 'password');
	    		}
	    	});
	    }
    }

    $.fn.showPassord = function (options) {
        var newPassword = new ShowPassword(this, options);
		return this.each(function() {
            newPassword.init();
            newPassword.change();
        });
    }
})(jQuery,window,document);