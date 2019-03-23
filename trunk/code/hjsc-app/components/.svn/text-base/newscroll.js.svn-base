/*-------------------------左固定-右滚动-------------*/
//新闻上下滚动start
//function AutoScroll(obj) {
//  $(obj).find("ul:first").animate({
//      marginTop: "-50px"
//  },1000,function() {
//      $(this).css({
//          marginTop: "0px"
//      }).find("li:first").appendTo(this);
//  });
//}
//$(document).ready(function() {
//  setInterval('AutoScroll("#newScroll")',5000);
//});
//var newscroll={
//	template:'<div><div class="mainleft"><span>{{msg}}</span></div><div class="mainright"><ul class="ulscroll"><li v-for="item in items"><a :href="item.newurl" target="_blank">{{item.newname}}</a></li></ul></div></div>',
//	props:['msg','items'],
//定义方法
//	methods:{
	
//}
//}
//请求接口数据
//var itemsdata=[
//				{newname:'建筑数据管理系统概况1',newurl:'javascript:void(0)'},
//				{newname:'建筑数据管理系统概况2',newurl:'javascript:void(0)'},
//				{newname:'建筑数据管理系统概况3',newurl:'javascript:void(0)'},
//			];
//
//new Vue({ 
//	el:'#newScroll',
//	data:function(){
//		return{
//			message:'新闻资讯',
//			items:itemsdata
//		}
//	},
//	components:{
//		'Ns':newscroll,
//	},
//})
//新闻上下滚动end

//新闻上下滚动用法start 
//html
//	<div id="newScroll" class="root">
//      <Ns :msg="message" :items="items"></Ns>
// 	</div>
//css
/*新闻滚动*/
//		.root{
//		    height: 50px;
//		    line-height: 50px;
//		    border-top: 1px solid #ccc;
//		    font-size: 17px;
//		    overflow: hidden;
//		    background-color: #fff;
//		    position: relative;
//			}
//		.mainleft{
//		    float: left;
//		    padding: 0 10px;
//		    color: #0487d0;
//		    width: 35%;
//		    text-align: center;
//		    font-weight: bold;
//		}
//		.mainleft:after{
//			content: '';
//			height:30px;
//			top: 10px;
//			width: 1px;
//			position: absolute;
//			left: 35%;
//			background-color: #e6e6e6;
//		}
//		.mainright{
//		    float: right;
//		    padding: 0 15px;
//		    width:65%;
//		}
//		@media screen and (max-width: 320px){
//			.mainright{
//				font-size: 16px;
//			}
//		}

//新闻上下滚动用法end

/*-------------------------左右滚动-------------*/

//新闻上下滚动start
function AutoScroll(obj) {
    $(obj).find("ul:first").animate({
        marginTop: "-50px"
    },1000,function() {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    });
}
$(document).ready(function() {
    cscroll=setInterval('AutoScroll("#newScroll")',5000);
});
var newscroll={
	template:'<div><div class="scrollmain"><ul class="ulscroll"><li v-for="item in items" class="hone h50"><a :href="item.newurl" target="_blank"><span class="sleft">{{item.newtit}}</span><span class="pl10">{{item.newname}}</span></a></li></ul></div></div>',
	props:['items'],
//定义方法
//	methods:{
	
//}
}

$(function(){
	userInfo = getGlobalUserInfo();
	overlist=userInfo.project.overviewList;
//	console.log(overlist);
	var itemsdata=[];
	for(i=0;i<userInfo.project.overviewList.length;i++){
		itemsdata.push({newtit:overlist[i].viewKey,newname:overlist[i].viewVal,newurl:'javascript:void(0)'},);
	}
	//请求接口数据
//var itemsdata=[
//				{newtit:'标题1',newname:'数据管理系统概数据管理系统概数据管理系统概数据{管理系统概数据管理系统概数据管理系统概',newurl:'javascript:void(0)'},
//				{newtit:'标题2',newname:'建筑数据管理系统概况2',newurl:'javascript:void(0)'},
//				{newtit:'标题3',newname:'建筑数据管理系统概况3',newurl:'javascript:void(0)'},
//			];

new Vue({ 
	el:'#newScroll',
	data:function(){
		return{
			items:itemsdata
		}
	},
	components:{
		'Ns':newscroll,
	},
	mounted:function(){
	if($('.ulscroll li').length==1){
		clearInterval(cscroll);
}

	}
})
	
	
	
	
})

//新闻上下滚动end

//新闻上下滚动用法start 
//html
//	<div id="newScroll" class="root">
//      <Ns :items="items"></Ns>
// 	</div>
//css
/*新闻滚动*/
//		.root{
//		    height: 50px;
//		    line-height: 50px;
//		    border-top: 1px solid #ccc;
//		    font-size: 17px;
//		    overflow: hidden;
//		    background-color: #fff;
//		    position: relative;
//			}
//		.scrollmain{
//		    padding: 0 15px;
//		    width:100%;
//		}
//		.sleft{
//			color: #0487d0;
//			font-weight: bold;
//			float: left;
//			width: 30%;
//			text-align: center;
//		}
//		.sleft:after{
//			content: '';
//			height:30px;
//			top: 10px;
//			width: 1px;
//			position: absolute;
//			left: 30%;
//			background-color: #e6e6e6;
//		}
//
//		@media screen and (max-width: 320px){
//				.scrollmain{
//					font-size: 16px;
//				}
//		}
