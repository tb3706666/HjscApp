/**
 * 图片标识，拍照和从相册选择通用
 */
var IMGINDEX = 0;

/**
 * 存放图片对象map
 */
var IMGMAP = new Map();

mui.init();

/* new Vue({
	el: "#doc",
	data: {
		docList: []
	}
})*/


//titname数组中文件名称
Vue.filter('format', function(value) {
	var i = tool.getAttachIcon(value)
	return '../../' + i.src;
});

// 获取选择联系人
window.addEventListener('loadMan', function() {
	userInfo = getGlobalUserInfo(); //获取对象
	var selectedMan = userInfo.selectedMan;
	var temp = $("#textarea").val();
	$("#textarea").val(temp + selectedMan);
	userInfo.selectedMan = "";
	setGlobalUserInfo(userInfo);
});

 var docVue = new Vue({
	el: "#doc",
	data: {
		docList: [] //{fileId:"1",fileName:'aaa.doc'},{fileId:"1",fileName:'aaa.txt'}
	},
	methods: {
		rm: function(index){
			this.docList.splice(index,1);
		}
	}
	})

// 获取文件id
window.addEventListener('loadFileId', function() {
	userInfo = getGlobalUserInfo(); //获取对象
	var fileIds = userInfo.fileIds;
	
	// 文档
	docVue.docList = JSON.parse(fileIds);
	userInfo.fileIds = "";
	setGlobalUserInfo(userInfo);
});

// 跳转到选择联系人 
$("#tab_home").on('tap', function() {
	GoToURL('select_linkman.html', 'select_linkman');
})

//			$('#tab_home').on('tap', function() {
//				alert('打开联系人');
//			});

$('#tab_message').on('tap', function() {

	getpic();
});

// 显示图片并上传
function showAndUpload(src) {

	add(src);
	var img = new Image();
	img.src = src;
	img.onload = function() {
		var imgData = getBase64Image(img);
		var suffix = src.substring(src.lastIndexOf("/") + 1, src.length);
		var file = dataURLtoFile(imgData, suffix);
		console.log("文件大小：==============》" + (Math.ceil(file.size / 1024)));
		sumfile(file);
	}
	mui.previewImage();

}

// 打开相机拍照
function getpic() {
	var cameraObj = plus.camera.getCamera();
	cameraObj.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var src = entry.toLocalURL();
			showAndUpload(src);
		}, function(e) {
			console.log("读取拍照文件错误" + e.message)
		})
	}, function(s) {
		console.log("error" + s);
	}, {
		filname: "_doc/head.png"
	})
}

//将base64转换为文件 
function dataURLtoFile(dataurl, filename) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while(n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, {
		type: mime
	});
}

// 图片大小
var imgSize = 500;

//将图片压缩转成base64 
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	// calculate the width and height, constraining the proportions 
	if(width > height) {
		if(width > imgSize) {
			height = Math.round(height *= imgSize / width);
			width = imgSize;
		}
	} else {
		if(height > imgSize) {
			width = Math.round(width *= imgSize / height);
			height = imgSize;
		}
	}

	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("image/png", 0.8);
	return dataURL; //.replace("data:image/png;base64,", ""); 
}

// 显示图片到页面
function add(src) {

	var html = `
					<div>
						<img class="img" src="${src}" data-preview-src="" data-preview-group="1"/>
							<span class="mui-icon mui-icon-closeempty close" index="${IMGINDEX}"></span>
					</div>
					`;
	$(".box").append(html);
	remove();
}

// 删除图片,并从图片map中根据key删除数据
function remove() {
	$('.close').on('tap', function() {
		var index = $(this).attr('index');
		IMGMAP.delete(parseInt(index));
		$(this).parent().remove();
	})
}

/**
 * 打开手机相册
 */
$('#tab_contact').on('tap', function() {
	galleryImg()
});


// 从相册中选择图片 
function galleryImg() {
	// 从相册中选择图片
	plus.gallery.pick(function(e) {
		//showAndUpload(e);

		for(var i in e.files) {
			var fileSrc = e.files[i];
			// 其他操作,比如预览展示
			//console.log(fileSrc + "===============")
			showAndUpload(fileSrc);
		}
	}, function(e) {
		console.log("取消选择图片");
	}, {
		filter: "image",
		multiple: true,
		maximum: 5,
		system: true,
		onmaxed: function() {
			plus.nativeUI.alert('最多只能选择5张图片');
		}
	});
}

userInfo = getGlobalUserInfo(); //获取对象

// 发布新主题
$("#sub").on('tap', function() {
	init_project();
});

//获取建筑容器信息  渲染项目名称
function init_project() {
    w = plus.nativeUI.showWaiting( "加载中..." );
	userInfo = getGlobalUserInfo(); //获取对象
	//1.6 && 1.7 方法一样
	$.ajax({
		type: 'GET',
		url: userInfo.url + '/mobile/getAllSubProject',
		beforeSend: function(request) {
			request.setRequestHeader('tokenId', userInfo.tokenId);
		},
		data: {
			entId: userInfo.entid,
			userId: userInfo.userId,
			projId: userInfo.projId
		},
		async: true,
		dataType: 'JSON',
		success: function(data) {
			//登陆失效
			if(!data.success || !data.obj) {
				w.close();
				tokenInvalid(data)
			} else {
				sumbitzt(data.obj.DefaultSubProjId)
			}

		}
	});
}

// 提交发表新主题
function sumbitzt(buiderId) {
	userInfo = getGlobalUserInfo(); //获取对象
	console.log(userInfo.builderId);
	//获取值
	var zttext = $('#textarea').val();
	if(zttext.trim() == "") {
		mui.toast('请输入主题内容');
		w.close();
		return;
	}
	var timestamp = (new Date()).valueOf(); //获取时间
	var isAndroid = getfromin();
	var fromIn = '';
	if(isAndroid) {
		fromIn = '来自Android';
	} else {
		fromIn = '来自ios';
	}
	//将zttezt正文这个数据绑定成json对象
	var designCoordinate = {
		dcContent: zttext, //内容
		ugId: userInfo.groupId,
		//entId: userInfo.entId,
		fromIn: fromIn, // 网页浏览器  || 安卓客户端  || ios客户端
		builderId:userInfo.builderId,
		projId: userInfo.projId
	};

	// 存放图片对象数组，循环map存放入数组
	var AttachImageInfos = [];
	IMGMAP.forEach(function(item, key, mapObj) {
		AttachImageInfos.push(item);
	});

	// 文件id数组,循环选择的文档
	var fileIdList = [];
	for(var i = 0; i < docVue.docList.length; i++) {
		fileIdList.push(docVue.docList[i].fileId);
	}

	var obj = {
		"designCoordinate": designCoordinate,
		"attachList": AttachImageInfos, //图片数组
		"fileIdList": fileIdList, //文件id数组
		"vpList": [] //上次视点  {AddViewPoint} 先传为空
	}

	// 是否保存为短语
	//var ischeck = $('#ischeck').is(':checked');

	console.log(JSON.stringify(obj));
	//return;
	var append = "?jsonData=" + JSON.stringify(obj) +
		"&userId=" + userInfo.userId +
		"&checked=false" +
		"&entId=" + userInfo.entid +
		 //1：设计协调页签，2：质量验收页签，3：质量检查页签，4：安全验收页签
		"&type=1" +
		"&dirId=0";
		
	$.ajax({
		type: "POST",
		//url: "http://10.252.29.32:8079/mobile/addDC" + encodeURI(append),
		url: userInfo.url + "/mobile/addDC" + encodeURI(append),
		async: true,
		beforeSend: function(request) {
			request.setRequestHeader('tokenId', userInfo.tokenId);
			request.setRequestHeader('appType', 7);
		},
		dataType: 'JSON',
		contentType: "application/json",
		success: function(data) {
			console.log(JSON.stringify(data));
			console.log("发布主题", JSON.stringify(data));
			if(data.success) {
				w.close();
				mui.toast('发表主题成功');
				
				var list = plus.webview.currentWebview().opener();
				mui.fire(list, 'ztrefresh', {}); 
				plus.webview.currentWebview().close();
				
				//GoToUrlNoCache('left.html?page=subject', 'subject.html');
				//location.href = 'subject.html';
			} else {
				mui.toast('发表主题失败');
			}
		},

		error: function(data, status, e) {
			console.log('错误------->');
			console.log(JSON.stringify(data));
			console.log('<-------错误');
		}
	});
}
//

/*data: {
		userId: userInfo.userId,
		checked: false, //false true,
		type: 1, //1：设计协调页签，2：质量验收页签，3：质量检查页签，4：安全验收页签
		entId: userInfo.entid,
		dirId: 0,
		jsonData: obj
	},*/

// 上传图片
function sumfile(file) {

	//var returnUrl = 'http://10.252.26.240:8080/h2-bim-project/mobile/uploadFileTeam.json?ugId='+
	//userInfo.groupId +'&dirId=0&entId=' + userInfo.entid;

	var returnUrl = userInfo.url + '/mobile/uploadFileTeam.json?ugId=' +
		userInfo.groupId + '&dirId=0&entId=' + userInfo.entid;
	returnUrl = encodeURIComponent(returnUrl);

	var formdata = new FormData();
	formdata.append('projId', userInfo.projId);
	formdata.append('type', 1);
	formdata.append('userId', userInfo.userId);
	formdata.append('modelCode', '004');
	formdata.append('token', userInfo.tokenId);
	formdata.append('returnUrl', returnUrl);
	formdata.append('file', file);

	$.ajax({
		type: "POST",
		//url: "http://10.252.26.240:8080/qjbim-file/uploading/uploadFileInfo",
		url: userInfo.fileUrl + "/uploading/uploadFileInfo",
		async: true,
		//secureuri: false,
		data: formdata,
		dataType: "JSON",
		/**
		 *必须false才会自动加上正确的Content-Type
		 */
		contentType: false,
		/**
		 * 必须false才会避开jQuery对 formdata 的默认处理
		 * XMLHttpRequest会对 formdata 进行正确的处理
		 */
		processData: false,
		success: function(data, status) {

			console.log(JSON.stringify(data));
			console.log("上传图片status:", status);
			if(status == "success") {
				//alert('上传成功');
				// getFileInfo();
				var AttachImageInfo = {
					fileUuid: data.attachImageInfo.fileUuid,
					fileName: data.attachImageInfo.fileName,
					fileExtension: data.attachImageInfo.fileExtension,
					fileSize: data.attachImageInfo.fileSize,
					fileMd5: data.attachImageInfo.fileMd5,
					relativePath: data.attachImageInfo.relativePath
				}

				// 把图片对象放进map
				IMGMAP.set(IMGINDEX, AttachImageInfo);
                IMGINDEX++;
			}

			//返回的data 转换为AttachImageInfo

		},
		error: function(data, status, e) {
			console.log("上传图片报错data", data);
			console.log("上传图片报错status", status);
			console.log("上传图片报错e", e);
		}
	})

}

//获取当前的设备
function getfromin() {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	//				alert('是否是Android：' + isAndroid);
	return isAndroid;
}

//监听input框中的内容是否输入@
document.getElementById("textarea").addEventListener('input',function(){
  var zfc=this.value;
  fz=zfc.substring(0,zfc.length-1);
  zfc=zfc.substring(zfc.length,zfc.length-1);
  if(zfc=="@"){
  	//清楚掉这个@ 不管有没有选中
  	$('#textarea').val(fz);
  	GoToURL('select_linkman.html', 'select_linkman');
  }
//console.log(zfc);

});