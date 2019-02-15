	mui.init();

	/**
	 * 折叠面板
	 */
	mui('body').on('tap', '.mui-popover-action li>a', function() {
		var a = this,
			parent;
		//根据点击按钮，反推当前是哪个actionsheet
		for(parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
			if(parent.classList.contains('mui-popover-action')) {
				break;
			}
		}
		//关闭actionsheet
		mui('#' + parent.id).popover('toggle');
	})

	/**
	 * 显示图片路径
	 */
	Vue.filter('currency', function(val) {

		var sub = val.substring(val.lastIndexOf('.'), val.length);
		var src = '../icon/';
		switch(sub) {
			case '.xls':
				src += 'gcyp_excel.png';
				break;
			case '.ppt':
				src += 'gcyp_ppt.png';
				break;
			case '.pdf':
				src += 'gcyp_pdf.png';
				break;
			case '.dwg':
				src += 'gcyp_cad.png';
				break;
			default:
				src += 'gcyp_wjj.png';
		}
		return src;
	});

	/**
	 * 版本控制
	 */
	Vue.filter('version', function(val) {
		alert(val);
		var sub = val.indexOf('.');
		if(sub != -1) {
			return true;
		} else {
			return false;
		}
	});

	/**
	 * 弹出框
	 */
	/*document.getElementById("promptBtn").addEventListener('tap', function(e) {
		e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
		var btnArray = ['取消', '确定'];
		mui.prompt('', '请输入新文件夹名', '重命名', btnArray, function(e) {
			if(e.index == 1) {
				//info.innerText = '谢谢你的评语：' + e.value;
			} else {
				//info.innerText = '你点了取消按钮';
			}
		})
	});*/

	new Vue({
		el: '#search',
		data: {
			search: null
		},
		/*watch:{
			search:function(){
				searchIng();
			}
		}*/
	});

	//监听清除图标的点击事件
	setTimeout(function() {
		mui(".mui-icon-clear")[0].addEventListener('tap', function() {
			searchIng();
			//alert(1);
		});

	}, 500)

	//监听input输入框的内容变化：
	mui(".mui-input-clear")[0].addEventListener('input', function() {
		searchIng();
	});

	/**
	 * 搜索
	 */
	function searchIng() {
		var val = $('#searchVal').val();
		if(val.indexOf('111') != -1) {
			filiList.list = newList;
			setResult(filiList.list.length);
		} else if(val.indexOf('哈哈') != -1) {
			filiList.list = newList2;
			setResult(filiList.list.length);
		} else if(val == '') {

			filiList.list = list;
			$('.search-result').css('display', 'none');
			$('#tableList').css('margin-top', '50px');
			$('.circle').css('padding', '4px').css('top', '30px').removeClass('padding');

			$('#home_scroll .mui-scroll').css('padding-bottom', '0px');
			$('.circle').removeClass(CLASSNAME);

		} else {
			filiList.list = [];
			$('.footer').hide();
			setResult(filiList.list.length);
		}

	}

	//设置搜索结果
	function setResult(len) {
		$('#search-result').html('搜索结果（' + len + '）');
		$('.search-result').css('display', 'block');
		$('#tableList').css('margin-top', '80px');
	}

	var newList = [{
			title: '1111',
			time: '2018-09-04 13:21:11'
		},
		{
			title: '1112222',
			time: '2018-09-04 11:21:37'
		},
		{
			title: '1113133',
			time: '2018-09-03 17:21:07'
		},

	];

	var newList2 = [{
			title: '哈哈防守打法',
			time: '2018-09-04 13:21:11'
		},
		{
			title: '哈哈水电费水电费',
			time: '2018-09-04 11:21:37'
		},
		{
			title: '哈哈鬼地方个',
			time: '2018-09-03 17:21:07'
		},
		{
			title: '哈哈恢复规划',
			time: '2018-09-03 14:23:11'
		},
	];

	var list = [{
			title: '华润施工模型文档.xls',
			time: '2018-09-04 15:34:07'
		},
		{
			title: 'BIM相关.ppt',
			time: '2018-09-04 13:21:11'
		},
		{
			title: '默认群组.pdf',
			time: '2018-09-04 11:21:37'
		},
		{
			title: '全景文档.dwg',
			time: '2018-09-03 17:21:07'
		},
		{
			title: '功能演示视频',
			time: '2018-09-03 14:23:11'
		},
		{
			title: '工程准备阶段文件（A类）',
			time: '2018-09-03 14:28:36'
		},
		{
			title: '施工文件（C类）',
			time: '2018-09-03 11:56:51'
		},
		{
			title: '监理文件（B类）',
			time: '2018-09-02 10:34:07'
		},
		{
			title: '设计图纸',
			time: '2018-09-02 09:21:07'
		},

	];

	var filiList = new Vue({
		el: '#list',
		data: {
			list: list
		},
		watch: {
			list: function() {
				this.$nextTick(function() {
					operation();
				})
			}
		},
		mounted: function() {
			operation();

		}
	})

	var CLASSNAME = 'mui-icon mui-icon-checkmarkempty';

	var $_this;

	/**
	 * 云盘分享页操作
	 */
	function operation() {

		$(' .mui-table-view-cell').unbind();
		$(' .mui-table-view-cell').on('tap', function() {
			if($(this).hasClass('test')) {
				$_this = this;
			}

			if($('.circle').hasClass('padding')) {

				if($(this).find('.circle').hasClass(CLASSNAME)) {
					$(this).find('.circle').removeClass(CLASSNAME);
					$(this).find('.share').css('display', 'none');
					$(this).find('.circle').css('top', '28px');

					//判断是否还有选中的列表
					if(!$('#tableList').find('.circle').hasClass(CLASSNAME)) {

						$('.circle').css('padding', '4px').css('top', '30px').removeClass('padding');
						$('.footer').hide();
						$('#home_scroll .mui-scroll').css('padding-bottom', '0px');
						return;
					}

				} else {
					$(this).find('.circle').addClass(CLASSNAME);
					$(this).find('.share').css('display', 'block');
					$(this).find('.circle').css('top', '50px');
					mui('#share').popover('toggle');
				}

			} else {
				$('.circle').css('padding', '7px').css('top', '28px').addClass('padding');
				//$('#home_scroll .mui-scroll').css('padding-bottom', '40px');
			}

			//$(this).find('.circle').addClass('mui-icon mui-icon-checkmarkempty');
		})
	}

	//取消分享
	$("#cancel-share").on('tap', function() {
		mui('#share').popover('toggle');
		$($_this).find('.circle').removeClass(CLASSNAME);
		$($_this).find('.share').css('display', 'none');
		$($_this).find('.circle').css('top', '28px');
	})

	mui('#left_scroll').scroll();
	mui('#home_scroll').scroll();
	//实现ios平台原生侧滑关闭页面；
	if(mui.os.plus && mui.os.ios) {
		mui.plusReady(function() { //5+ iOS暂时无法屏蔽popGesture时传递touch事件，故该demo直接屏蔽popGesture功能
			plus.webview.currentWebview().setStyle({
				'popGesture': 'none'
			});
		});
	}

	//			请求数据
	var itemsdata = [{
			imgurl: '../icon/glz1.png',
			name: '概览',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz2.png',
			name: '主题',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz3.png',
			name: '对话',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz4.png',
			name: '会议',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz5.png',
			name: '虚拟场景',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz6.png',
			name: '工程日历',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz7.png',
			name: '工程任务',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz8.png',
			name: '工程云盘',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz9.png',
			name: '云盘分享',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz10.png',
			name: '中转站',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz11.png',
			name: '联系人',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz12.png',
			name: '设置',
			nameurl: '11'
		},
		{
			imgurl: '../icon/glz13.png',
			name: '退出',
			nameurl: 'javascript:void(0)'
		},
	];
	//			侧边栏
	var glz = new Vue({
		el: "#glz_slide",
		data: function() {
			return {
				username: '王明明',
				tel: '15112368954',
				email: '1123689@qq.com',
				glimg: {
					user: '../img/gailan.png',
					tel: '../icon/glz_tit1.png',
					email: '../icon/glz_tit2.png',
				},
				items: itemsdata
			}
		},
		methods: {

			gl: function(e) {
				alert(e)
			}
		}

	})
	//			常用应用
	//			请求数据
	var usudata = [{
			imgurl: '../icon/gl1.png',
			name: '查询',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl2.png',
			name: '跟踪',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl3.png',
			name: '检查',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl4.png',
			name: '主题',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl5.png',
			name: '对话',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl6.png',
			name: '会议',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl7.png',
			name: '虚拟场景',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl8.png',
			name: '工程日历',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl9.png',
			name: '工程任务',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl10.png',
			name: '工程云盘',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl11.png',
			name: '工程分享',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl12.png',
			name: '中转站',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl13.png',
			name: '联系人',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl14.png',
			name: '设置',
			appurl: '11'
		},
		{
			imgurl: '../icon/gl15.png',
			name: '添加',
			appurl: '11'
		},
	];
	/*var glz=new Vue({
		el:"#usuallyapp",
		data:function(){
			return{
				itemusu:usudata
			}
		},
	})*/