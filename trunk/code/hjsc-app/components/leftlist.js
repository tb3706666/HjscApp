//左侧上滑
mui('#left_scroll').scroll();
//实现ios平台原生侧滑关闭页面;
//兼容ios事件
if(mui.os.plus && mui.os.ios) {
	mui.plusReady(function() { //5+ iOS暂时无法屏蔽popGesture时传递touch事件，故该demo直接屏蔽popGesture功能
		plus.webview.currentWebview().setStyle({
			'popGesture': 'none'
		});
	});
}
//标签跳转
mui('body').on('tap', 'a', function() {
	window.top.location.href = this.href;
});

//退出开始
var offCanvasWrapper = mui('#offCanvasWrapper');
$(document).on('tap', '.glz_list>ul>li:last-child', function() {
	if($('.mui-inner-wrap').hasClass('furight')) {
		$('.mui-inner-wrap').removeClass('furight');
		$('.swzz').toggleClass('swpop');
		$(".mui-popup-backdrop").addClass('mask');
	} else {
		offCanvasWrapper.offCanvas('close');
	}

	setTimeout('dialog_ts()', 200);
})

function dialog_ts() {
	var btnArray = ['切换工程', '确定退出', '取消'];
	mui.confirm('“切换工程”可返回到工程项目导航页面;“确定退出”将退出系统。', '退出提醒', btnArray,'','div');
	//切换工程
	document.querySelector('.mui-popup-buttons span:first-child').addEventListener('tap',function(){
		mui.openWindow({
				url: '../at_team/chanpin_sldh.html',
				id: 'chanpin_sldh.html',
				extras: {
					name: 'csdn',
					pid: '11'
				}
			});
	})
	
	//确定退出
	document.querySelector('.mui-popup-buttons span:nth-of-type(2)').addEventListener('tap',function(){
		plus.runtime.quit();
	})
	
	//取消
	document.querySelector('.mui-popup-buttons span:last-child').addEventListener('tap',function(){
		mui.toast('取消');
	})
}
//退出结束

var newlist = {
	template: `
						<div>
						<div class="glz_tit">
						<ul class="mui-table-view">
						    <li class="mui-table-view-cell mui-media">
						        <a href="javascript:void(0)">
						        <img class="mui-media-object mui-pull-left" :src="gl.userimg" onerror="this.src='../../img/timg.jpg';this.onerror=null">
						            <div class="mui-media-body ls1">
						                <p class="list_title hbox fs16">{{gl.username}}</p>
						                <p><img :src="'../../'+gl.telicon" class="xicon">{{gl.tel}}</p>
						                <p><img :src="'../../'+gl.emailicon" class="xicon fl mt3"><span class="email_p fl hone demail nws">{{gl.email}}</span></p>
						            </div>
						        </a>
						    </li>
						</ul>
						</div>
						
						<div class="glz_list">
							<ul class="mui-table-view">
						        <li :class="'mui-table-view-cell list'+index" v-for="(item,index) in items" :accesskey="index" @click.native="aa()" v-show="item.checked">
						            <a :href="item.nameurl" target="_blank">
						                <img :src="'../../'+item.imgurl" class="zicon"><span class="ls1">{{item.name}}</span>
						            </a>
						        </li>
						    </ul>
						</div>
						</div>
						`,

	props: ['gl', 'items']
}

$(function() {
	var itemsdata=JSON.parse(localStorage.getItem("list"));//获取.getItem("list");//获取
	//请求接口数据
	if(!itemsdata){
		itemsdata = [{
			imgurl: 'icon/glz1.png',
			name: '概览',
			isShow:true,
			index:0,
			checked:true,
			nameurl: '../at_team/gailan.html'
		},
		{
			imgurl: 'icon/glz2.png',
			name: '主题',
			isShow:true,
			index:1,
			checked:true,
			nameurl: '../at_team/left.html?page=subject'
		},
		//				{imgurl:'icon/glz3.png',name:'对话',nameurl:'javascript:void(0)'},
		//				{imgurl:'icon/glz4.png',name:'会议',nameurl:'javascript:void(0)'},
		{
			imgurl: 'icon/glz5.png',
			name: '虚拟场景',
			isShow:true,
			index:2,
			checked:true,
			nameurl: '../at_team/Space_container.html'
		},
		//				{imgurl:'icon/glz6.png',name:'工程日历',nameurl:'javascript:void(0)'},
		//				{imgurl:'icon/glz7.png',name:'工程任务',nameurl:'javascript:void(0)'},
		{
			imgurl: 'icon/glz8.png',
			name: '工程云盘',
			isShow:true,
			index:3,
			checked:true,
			nameurl: '../at_team/left.html?page=cloud_project_list&isCould=yes'
		},
		{
			imgurl: 'icon/glz9.png',
			name: '云盘分享',
			isShow:true,
			index:4,
			checked:true,
			nameurl: '../at_team/left.html?page=cloud_project_share&isCould=yes'
		},
		{
			imgurl: 'icon/glz10.png',
			name: '中转站',
			isShow:true,
			index:5,
			checked:false,
			nameurl: '../at_team/left.html?page=cloud_project_station&isCould=yes'
		},
		{
			imgurl: 'icon/glz11.png',
			name: '联系人',
			isShow:true,
			index:6,
			checked:false,
			nameurl: '../at_team/linkman.html'
		},
		{
			imgurl: 'icon/glz12.png',
			name: '设置',
			isShow:false,
			index:7,
			checked:true,
			nameurl: '../at_team/setup.html'
		},
		{
			imgurl: 'icon/glz13.png',
			name: '退出',
			index:8,
			isShow:false,
			checked:true,
			nameurl: 'javascript:void(0)'
		},
	];
	localStorage.setItem("list",JSON.stringify(itemsdata));//设置
	}
	
	

	userInfo = getGlobalUserInfo();
	//	console.log(userInfo.LOGINURL);
	//	console.log(userInfo.imgUuid);
	var userimg = userInfo.LOGINURL + "/arctron-usercenter" + userInfo.imgUuid;
	console.log(userimg);
	new Vue({
		el: '#glz_slide',
		data: function() {
			return {
				gl: {
					userimg: userimg,
					username: userInfo.realName,
					telicon: 'icon/glz_tit1.png',
					tel: userInfo.phone,
					emailicon: 'icon/glz_tit2.png',
					email: userInfo.email,
				},
				items: itemsdata
			}
		},
		components: {
			'leftlist': newlist
		},
	})

})

//左侧菜列表组件用法
//html
//注意： 
//1.在mui-off-canvas-wrap mui-draggable容器中加个#offCanvasWrapper
//2.mui-scroll下写以下
//<div id="glz_slide">
//	<leftlist :gl='gl' :items='items'></leftlist>
//</div>
//css
//引入leftlist
//js vue组件渲染后方写
//mui('#home_scroll').scroll();