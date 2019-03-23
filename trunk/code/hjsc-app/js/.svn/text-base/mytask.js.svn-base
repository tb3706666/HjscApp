var item2 = document.getElementById('item2mobile');
var item3 = document.getElementById('item3mobile');
var item4 = document.getElementById('item4mobile');
var item5 = document.getElementById('item5mobile');

(function($) {
	$('.mui-scroll-wrapper').scroll({
		indicators: false //是否显示滚动条
	});
	mui('.mui-scroll-wrapper').scroll();

	document.getElementById('slider').addEventListener('slide', function(e) {
		console.log(e.detail.slideNumber)
		if(e.detail.slideNumber === 1) {
			if(item2.querySelector('.mui-loading')) {
				setTimeout(function() {
					item2.querySelector('.mui-loading').remove();
				}, 500);
			}
		} else if(e.detail.slideNumber === 2) {
			if(item3.querySelector('.mui-loading')) {
				setTimeout(function() {
					item3.querySelector('.mui-loading').remove();
				}, 500);
			}
		} else if(e.detail.slideNumber === 3) {
			if(item4.querySelector('.mui-loading')) {
				setTimeout(function() {
					item4.querySelector('.mui-loading').remove();
				}, 500);
			}
		} else if(e.detail.slideNumber === 4) {
			if(item5.querySelector('.mui-loading')) {
				setTimeout(function() {
					item5.querySelector('.mui-loading').remove();
				}, 500);
			}
		}
	});
})(mui);