// $('audio').audio({
// 	manual: true,    // 可手动调整播放进度，默认true
// 	simple: false,   // 简易模式，默认false
// 	autoplay: false  // 自动播放，默认false；PS：控制台报“Uncaught(in promise) DOMException”错误，在最新版的Chrome浏览器（以及所有以Chromium为内核的浏览器）中，已不再允许自动播放音频和视频。http://www.nooong.com/docs/chrome_video_autoplay.htm
// });
// PS：下载文件在a标签添加download属性，chrome浏览器资源跨域无法下载，直接调整浏览
// audio音频自定义
;
(function($, window, document, undefined){
	//默认参数
	var defaults = {
		manual: true,
		simple: false,
		autoplay: false
	};
	
	//定义构造函数
	function Audio(element, setting) {
		this.element = element;
		this.options = $.extend({}, defaults, setting);
		this.init();
	};

	//定义方法
	Audio.prototype = {
		//初始化
		init: function() {
			var that = this,
				manual = that.options.manual,
				simple = that.options.simple,
				audio = that.element,
				title = $(audio).attr('title'),
				size = $(audio).attr('size'),
				download = $(audio).children('source').attr('src'),
				duration = $(audio).attr('duration');
			$(audio).wrap('<div class="audio"></div>')
			var $wrap = $(audio).parent('.audio'),
				str = '';
			if (simple) {
				str = '<i class="audio-play play"></i>' +
					'<div class="audio-info">' +
						'<p class="audio-title">' + title + '</p>' +
						'<div class="audio-time">' +
							'<span class="audio-time-total">' + that.transTime(duration) + '</span>' +
						'</div>' +
					'</div>';
			} else{
				str = '<i class="audio-play play"></i>' +
					'<a class="audio-download" download href="' + download + '">下载</a>' +
					'<div class="audio-info">' +
						'<p class="audio-title">' + title + '</p>' +
						'<div class="audio-progress">' +
							'<span class="audio-progress-in"></span>' +
							'<i class="audio-progress-dot"></i>' +
						'</div>' +
						'<div class="audio-time">' +
							'<span class="audio-time-current">00:00</span>' +
							'<span class="audio-time-total">' + that.transTime(duration) + '</span>' +
						'</div>' +
					'</div>';
			}
			$wrap.append(str);
			
			// 播放
			$wrap.on('click', '.audio-play', function(e) {
				that.play();
			});
			// 自动播放
			if (that.options.autoplay) {
				// PS：控制台报“Uncaught(in promise) DOMException”错误，在最新版的Chrome浏览器（以及所有以Chromium为内核的浏览器）中，已不再允许自动播放音频和视频。http://www.nooong.com/docs/chrome_video_autoplay.htm
				that.play();
			}
			
			// 初始化获取总时长
			audio.addEventListener('canplaythrough', function(){
				$wrap.find('.audio-time-total').text(that.transTime(duration));
			},false);
			
			// 点击进度条跳到指定点播放
			// PS：此处不要用click，否则下面的拖动进度点事件有可能在此处触发，此时e.offsetX的值非常小，会导致进度条弹回开始处（简直不能忍！！）
			if (manual) {
				var $progress = $wrap.find('.audio-progress');
				$progress.on('mousedown', function(e) {
					// 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
					if (!audio.paused || audio.currentTime != 0) {
						var pgsWidth = $progress.width();
						var rate = e.offsetX / pgsWidth;
						audio.currentTime = audio.duration * rate;
						that.updateProgress(audio);
					}
				});
			}
			
			// 鼠标拖动进度点时可以调节进度
			// 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
			// 鼠标按下时
			if (manual) {
				var $progress = $wrap.find('.audio-progress'),
					$progressDot = $wrap.find('.audio-progress-dot');
				$progressDot.on('mousedown', function(e) {
					e.preventDefault();
					e.stopPropagation();
					if (!audio.paused || audio.currentTime != 0) {
						var oriLeft = $progressDot.position().left,
							mouseX = e.clientX,
							maxLeft = oriLeft, // 向左最大可拖动距离
							maxRight = $progress.offsetWidth - oriLeft; // 向右最大可拖动距离
			
						// 开始拖动
						document.onmousemove = function(e) {
							var length = e.clientX - mouseX;
							if (length > maxRight) {
								length = maxRight;
							} else if (length < -maxLeft) {
								length = -maxLeft;
							}
							var pgsWidth = $progress.width();
							var rate = (oriLeft + length) / pgsWidth;
							audio.currentTime = audio.duration * rate;
							that.updateProgress(audio);
						};
			
						// 拖动结束
						document.onmouseup = function() {
							document.onmousemove = null;
							document.onmouseup = null;
						};
					}
					
				});
			}
		},
		
		// 点击播放/暂停图片时，控制音乐的播放与暂停
		play: function() {
			var that = this,
				manual = that.options.manual,
				audio = that.element,
				duration = audio.duration;
				$wrap = $(audio).parent('.audio'),
				$audioPlayer = $wrap.find('.audio-play');
			$wrap.find('.audio-time-total').text(that.transTime(duration));
			
			// 监听音频播放时间并更新进度条
			audio.addEventListener('timeupdate', function () {
				that.updateProgress(audio);
			}, false);
			
			// 监听播放完成事件
			audio.addEventListener('ended', function () {
				that.audioEnded(audio);
			}, false);
			
			// 改变播放/暂停图片
			if (audio.paused) {
				// 暂停其他正在播放的音频
				var audios = $('.audio');
				for (var i = 0; i < audios.length; i++) {
					var otherAudio = audios[i].getElementsByTagName('audio')[0];
					if (!otherAudio.paused) {
						otherAudio.pause();
						$(audios[i]).find('.audio-play').addClass('play').removeClass('pause').css('cursor', 'pointer');
					}
				}
				
				// 开始播放当前点击的音频
				audio.play();
				$audioPlayer.addClass('pause').removeClass('play');
				if (!manual) {
					$audioPlayer.css('cursor', 'default');
				}
			} else {
				if (manual) {
					audio.pause();
					$audioPlayer.addClass('play').removeClass('pause');
				} else {
					console.log('考试模式禁止暂停！');
				}
			}
		},
		
		/**
		 * 更新进度条与当前播放时间
		 * @param {object} audio - audio对象
		 * @param {number} index - 索引，第几个音频（从0开始）
		 */
		updateProgress: function(audio) {
			var value = audio.currentTime / audio.duration,
				$wrap = $(audio).parent('.audio'),
				$progressDot = $wrap.find('.audio-progress-dot'),
				$progressIn = $wrap.find('.audio-progress-in'),
				$currentTime = $wrap.find('.audio-time-current');
			$progressDot.css('left', value * 100 + '%');
			$progressIn.css('width', value * 100 + '%');
			$currentTime.text(this.transTime(audio.currentTime));
		},
		
		/**
		 * 播放完成时把进度调回开始的位置
		 * @param {number} index - 索引，第几个音频（从0开始）
		 */
		audioEnded: function(audio) {
			var $wrap = $(audio).parent('.audio'),
				$audioPlayer = $wrap.find('.audio-play'),
				$progressDot = $wrap.find('.audio-progress-dot'),
				$progressIn = $wrap.find('.audio-progress-in'),
				$currentTime = $wrap.find('.audio-time-current');
			$progressDot.css('left', 0);
			$progressIn.css('width', 0);
			$currentTime.text(this.transTime(0));
			$audioPlayer.addClass('play').removeClass('pause');
		},
		
		/**
		 * 音频播放时间换算
		 * @param {number} value - 音频当前播放时间，单位秒
		 */
		transTime: function(value) {
			var time = '';
			var h = parseInt(value / 3600);
			value %= 3600;
			var m = parseInt(value / 60);
			var s = parseInt(value % 60);
			if (h > 0) {
				time = this.formatTime(h + ':' + m + ':' + s);
			} else {
				time = this.formatTime(m + ':' + s);
			}
			return time;
		},
		
		/**
		 * 格式化时间显示，补零对齐
		 * eg：2:4  -->  02:04
		 * @param {string} value - 形如 h:m:s 的字符串 
		 */
		formatTime: function(value) {
			var time = '';
			var s = value.split(':');
			var i = 0;
			for (; i < s.length - 1; i++) {
				time += s[i].length == 1 ? ('0' + s[i]) : s[i];
				time += ':';
			}
			time += s[i].length == 1 ? ('0' + s[i]) : s[i];
			return time;
		}
	};
	
	//定义插件
	$.fn.audio = function(options) {
		return this.each(function(index, element) {
			element.formCount = new Audio(element, options);
		});
	};
	
})(jQuery, window, document);