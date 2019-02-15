//=======================遮罩层start================================================
var mask = mui.createMask(function() { //遮罩层callback事件
	return true; //返回true关闭mask
});

$(document).on('tap', '.mui-backdrop', function() {

	if($(".mui-backdrop").hasClass('mask')) {
		mask.close();
		parent.lefts();
	}
})

function closeBackdrop() {
	if($(".mui-backdrop").hasClass('mask')) {
		mask.close();
	}
}

$(document).on('tap', '#menus', function() {
	mask.show()
	parent.lefts();
	$(".mui-backdrop").addClass('mask');
})

//触发父元素事件
$('body').on('swipeleft', function() {
	mask.close()
	parent.sleft();
})

$('body').on('swiperight', function() {
	mask.show();
	parent.sright();
	$(".mui-backdrop").addClass('mask');
})

//=======================遮罩层end================================================