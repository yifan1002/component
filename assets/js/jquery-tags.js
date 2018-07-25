//$('.form-control').tags();
;(function($,window,document,undefined){
	//定义Tag的构造函数
	var Tags = function(ele, opt) {
		_ = ele,
		defaults = {
			
		},
		options = $.extend({}, defaults, opt)
	}
	//定义Tag的方法
	Tags.prototype = {
		//初始化
		init: function() {
			var inputWidth = _.outerWidth() + 'px',
				inputVal = _.val(),
				tagSlist = inputVal.split(','),
				str = '';
			for (i in tagSlist) {
				//console.log(tagSlist[i]);
				str += '<li><span>' + tagSlist[i] + '</span><i>x</i></li>';
			}
			_.hide().wrap('<div class="form-tags" style="width: ' + inputWidth + '"></div>').after('<ul class="form-tags-list"></ul><input type="text" maxlength="20" class="form-tags-input" />');
			_tags = _.parent('.form-tags'),
			_list = _.siblings('.form-tags-list'),
			_input = _.siblings('.form-tags-input');
			_list.append(str);
		},
		//选中
		focus: function() {
			_tags.click(function (e) {
				_input.focus();
			});
		},
		//输入
		keyup: function() {
			_input.keyup(function (e) {
				var keyCode = e.keyCode || e.which;
				if (keyCode === 8 || keyCode === 46 || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111 && keyCode != 108) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222)) {
					$(this).width($(this).width() + 20);
				}
			});
		},
		//生成
		enter: function() {
			_input.keydown(function (e) {
				var keyCode = e.keyCode || e.which;
				if (keyCode === 32) {
					var val = $(this).val(),
						tags = _.val().split(','),
						hasTag = false;
					$.each(tags, function (index, value) {
						if ($.trim(value) === $.trim(val)) {
							hasTag = true;
						}
					});
					if (val !== '') {
						if (!hasTag) {
							_list.append('<li><span>' + val + '</span><i>x</i></li>');
							_.val(_.val() + ',' + val);
						} else{
							//调用layer.js
							layer.msg('此标签已存在！', {
								icon: 2,
								time: 1500,
								shade: 0.2
							});
						}
						$(this).width(20).val('');
					}
				}
			});
		},
		//删除
		remove: function() {
			_list.on('click', 'li i', function (e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).parent('li').remove();
				var val = '';
				_list.children('li').each(function(){
					val += $(this).children('span').text() + ',';
				});
				val = val.substring(0, val.lastIndexOf(','));
				_.val(val);
			});
		}
	}
	//在插件中使用Tag对象
	$.fn.tags = function(options) {
		//创建Tag的实体
		var newTag = new Tags(this, options);
		//调用其方法
		return this.each(function() {
			newTag.init();
			newTag.focus();
			newTag.keyup();
			newTag.enter();
			newTag.remove();
		});
	}
})(jQuery,window,document);
