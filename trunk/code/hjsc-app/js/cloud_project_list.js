//=====================================start=========================================			
// 上拉加载下拉刷新
var miniRefresh;
var pageNums = 1;
var genfileid;

$(function() {
	$('.groupstyle').text(userInfo.groupName);
})

function updown() {
	var loadFull = new Object();
	//loadFull.isEnable = false;
	//loadFull.isAuto = false;

	// 引入任何一个主题后，都会有一个 MiniRefresh 全局变量
	miniRefresh = new MiniRefresh({
		container: '#home_scroll',
		//isUseBodyScroll:true,
		down: {
			// 是否每次下拉完毕后默认重置上拉，为false时下拉刷新后不会自动重置上拉状态
			//isAutoResetUpLoading: true,
			//isAuto: true,
			callback: function() {

				setTimeout(function() {

					pageNums = 1;
					getlist('down');

					//miniRefresh.endDownLoading();

				}, 500)

			}
		},
		up: {
			//isAuto:false,
			loadFull: loadFull,
			callback: function() {
				// 上拉事件
				setTimeout(function() {
					getlist('up');
				}, 500)
			},
		}
	});

}

//=====================================end=========================================

$(document).on('tap', '#recentFiles', function() {
	GoToUrlNoCache('../at_cloud/cloud_project_recentFiles.html', 'cloud_project_recentFiles');
})

var chexkgroupId = "";
var dirids = '';
//			上传模块
function uploadfiles(urldirid) {
	return userInfo.url + '/cloud/uploadFile?projId=' + userInfo.projId + '&groupId=' + userInfo.groupId + '&parentDirId=' + urldirid + '&fgId=';
	//			returnUrl = encodeURIComponent(returnUrl);
}
//			上传图片
var files = new Vue({
	el: '#c_upload',
	//				data: function() {
	//						return {
	////						items: itemsdata,
	//						}
	//					},
	methods: {
		tirggerFile: function(event) {
			var filename = event.target.files[0]; //获取上传的文件名
			//上传获取路径

			var formdata = new FormData();
			formdata.append('projId', userInfo.projId);
			formdata.append('type', 1);
			formdata.append('userId', userInfo.userId);
			formdata.append('modelCode', '002');
			formdata.append('token', userInfo.tokenId);
			formdata.append('returnUrl', uploadfiles(dirids));
			formdata.append('file', filename);
			formdata.append('groupId', userInfo.groupId);
			formdata.append('parentDirId', obj.dirId);
			formdata.append('fgId', '');
			$.ajax({
				type: "POST",
				url: userInfo.fileUrl + "/uploading/uploadFileInfo",
				async: true,
				//secureuri: false,
				data: formdata,
				dataType: "JSON",
				contentType: false,
				processData: false,
				//关键部分,用xhrOnProgress方法监听xhr,并返回挂载了监听函数的新xhr对象
				xhr: xhrOnProgress(function(e) {
					var percent = e.loaded / e.total; //计算百分比
				}),
				success: function(data, status) {
					//登陆失效
					if(data.responseInfo.responseCode != 1) {
						tokenInvalid(data);
						return;
					}
					//getlist();
					//init();
					mui.toast('已加入到传输列表')
				},
				error: function(data, status, e) {
					console.log("上传图片报错data", data);
					console.log("上传图片报错status", status);
					console.log("上传图片报错e", e);
				}
			})

			//					console.log("路径："+data);
			//					console.log('第二参数：'+status) 

		}
	}
});

//上传进度监听方法
var xhrOnProgress = function(fun) {
	xhrOnProgress.onprogress = fun; //绑定监听
	//使用闭包实现监听绑
	return function() {
		//通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
		var xhr = $.ajaxSettings.xhr();
		//判断监听函数是否为函数
		if(typeof xhrOnProgress.onprogress !== 'function')
			return xhr;
		//如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
		if(xhrOnProgress.onprogress && xhr.upload) {
			xhr.upload.onprogress = xhrOnProgress.onprogress;
		}
		return xhr;
	}
}

$('#nfiles>div').on('tap', function() {
	//根目录路不允许上传
	if(obj.dirId === 0) {
		mui.toast('根目录不允许上传');
		$('#c_upload').css('display', 'none');
		$('.mui-backdrop').removeClass('mui-active');
		return false;
	}
	$('#c_upload').css('display', 'none');
	$('.mui-backdrop').removeClass('mui-active');
	var id = $(this).data("id");
	var self = $(this).children("input");
	switch(id) {
		//					文档
		case 1:
			self.trigger('click');
			break;
			//					图片
		case 2:
			self.trigger('click');
			//uploadPhoto();
			break;
			//					音频
		case 3:
			self.trigger('click');
			break;
			//					视频
		case 4:
			self.trigger('click');
			break;
			//					其他
		case 5:
			self.trigger('click');
			//uploadOther();
			break;
	}

})

var CLASSNAME = 'mui-icon mui-icon-checkmarkempty';
//点击小圆点，封装方法，监听方法，说明：防止上拉加载时新数据渲染出来后没有执行该方法
function xiao() {
	//坑点:全局tap则全局unbind();否则没解绑，执行两次方法
	$('.circle').unbind();
	$('.circle').on('tap', function() {
		$(this).toggleClass(CLASSNAME);
		var ctrue = $('.circle').hasClass(CLASSNAME);
		var share = $(this).hasClass(CLASSNAME);
		obj.fileId = $(this).attr('fileId');
		obj.fileName = $(this).attr('fileName');
		obj.fileType = $(this).attr('fileType');
		obj.fileSize = $(this).attr('fileSize');
		if(share) { //选中
			if(obj.fileType == 1) { //文件夹
				obj.folderIdList = obj.folderIdList + "," + obj.fileId;
			}
			//						else { //文件
			//							obj.fileIdList = obj.fileIdList + "," + obj.fileId;
			//							
			//							//获取文件下载url
			//							var objdata = {
			//								projectId: userInfo.projId,
			//								groupId: userInfo.groupId,
			//								fileId: obj.fileId,
			//								tokenId: userInfo.tokenId
			//							}
			//							$.post(userInfo.url + '/cloud/downloadFile?type=json', obj, function(data) {
			//								console.log('获取下载url', data);
			//							})
			//
			//							var infos = {
			//								fileName: obj.fileName,
			//								fileType: obj.fileType,
			//								fileSize: obj.fileSize,
			//								fileId: obj.fileId,
			//								userId: userInfo.userId,
			//								status: true,
			//								fileUrl: ''
			//							}
			//							obj.downArray.push(infos);
			//						}
			//						obj.shareName.push(obj.fileName);
		} else { //取消选中
			if(obj.fileType == 1) { //文件夹
				var ids = obj.folderIdList.substring(1);
				var arr = ids.split(",");
				var arr2 = [];
				obj.folderIdList = "";
				for(i = 0; i < arr.length; i++) {
					if(obj.fileId != arr[i]) {
						arr2.push(arr[i]);
					}
				}
				for(var i = 0; i < arr2.length; i++) {
					obj.folderIdList = obj.folderIdList + "," + arr2[i];
				}

			} else { //文件
				var ids = obj.fileIdList.substring(1);
				var arr = ids.split(",");
				var arr2 = [];
				obj.fileIdList = "";
				for(i = 0; i < arr.length; i++) {
					if(obj.fileId != arr[i]) {
						arr2.push(arr[i]);
					}
				}
				for(var i = 0; i < arr2.length; i++) {
					obj.fileIdList = obj.fileIdList + "," + arr2[i];
				}

			}
			obj.fileId = "";
		}
		if(ctrue) {
			$('.footer').show();
			$('.files,.title-out').addClass('disabled');
			$('#list').css('padding-bottom', '45px');
		} else {
			$('.footer').hide();
			$('.files,.title-out').removeClass('disabled');
			$('#list').css('padding-bottom', '0')
		}
	});
};
$('.addSubject').on('tap', function() {
	mui.openWindow({
		url: 'cloud_project_recentFiles.html?groupId=' + obj.groupId,
		id: 'cloud_1',
	});

})
mui.init();
//			document.addEventListener("swipeup", function() {
//				mui.toast('上拉加载下一页')
//				obj.currentPage += 1;
//				getlist();
//			});
//			document.addEventListener("swipedown", function() {
//				mui.toast('下拉刷新');
//				obj.currentPage = 1;
//				getlist();
//			});

/*获取登录数据*/
userInfo = getGlobalUserInfo();
/*列表数据动态绑定*/
var obj = new Vue({
	el: '.cloud',
	data: {
		list: [],
		groupId: userInfo.groupId, //群组id
		currentPage: 1, //当前页数
		dirId: 0, //当前目录节点
		fileName: "", //文件夹名
		fileId: 1,
		fileType: 1,
		fileUrl: "",
		parentId: [], //按顺序存入父节点
		parentName: ["工程云盘"], //按顺序存入父节点名称
		headName: "工程云盘",
		fileIdList: "", //分享文件存储的id字符串组
		folderIdList: "", //分享文件夹的id
		fileIdArry: [], //所有选中的id，用于判断下载和删除
		fileSize: null, //选中文件的大小用于判断下载进度
		downArray: [], //用于下载至传输列表，存于本地存储
		k1: true,
		z1: false,
	},
	watch: {
		list: function() {
			this.$nextTick(function() {
				xiao();
				if(userInfo.isShowAllFilesName) {
					$(".hone").css('display', 'block');
				} else {
					$(".hone").css('display', '-webkit-box');
				}

			})
		}
	},
});

/*群组动态绑定*/
var obj2 = new Vue({
	el: '.groupmenu',
	data: {
		group: [], //全部群组
		groupId: userInfo.groupId, //群组id
	},
	watch: {
		group: function() {
			this.$nextTick(function() {
				changeGroup();
			})
		}
	},
});

/*获取群组*/
$.ajax({
	type: 'GET',
	url: userInfo.url + '/cloud/getGroupList?type=json',
	data: {
		'projectId': userInfo.projId,
		'tokenId': userInfo.tokenId
	},
	dataType: 'json',
	success: function(data) {
		//登录失效
		if(data.responseInfo.responseCode != 1) {
			tokenInvalid(data);
			return;
		}
		obj2.group = data.userGroupList;
		updown();
	}
});

/*获取列表数据*/
function getlist(arg) {

	//obj.groupId = userInfo.groupId;
	dirids = obj.dirId;

	//console.log("当前节点："+obj.dirId);

	$.ajax({
		type: 'GET',
		url: userInfo.url + '/cloud/getFileList?type=json',
		beforeSend: function(request) {
			request.setRequestHeader('appType', 7);
		},
		data: {
			tokenId: userInfo.tokenId,
			projectId: userInfo.projId,
			groupId: obj.groupId,
			dirId: obj.dirId,
			pageIndex: pageNums,
			//显示条数
			pageSize: 11, //11,
			filename: obj.fileName
		},
		dataType: 'json',
		//登陆失效
		success: function(data) {
			if(data.responseInfo.responseCode != 1) {
				tokenInvalid(data);
				return;
			}
			//						console.log('云盘列表', data);

			if(obj.dirId == 0) {
				obj.parentName.push("工程云盘");
				$(".menus").css("display", "block");
				$(".backs").css("display", "none");
			} else {
				if(obj.fileType == 1) {
					$(".menus").css("display", "none");
					$(".backs").css("display", "block");
				}
			}

			if(data.fileList != undefined) {
				if(pageNums == 1) {
					obj.list = data.fileList;
				} else {
					obj.list = obj.list.concat(data.fileList);
				}

			} else {

				//mui.toast('没有更多数据');
				if(arg == 'next') {
					obj.list = [];
				}

			}

			if(arg == 'down') {
				miniRefresh.endDownLoading();
			} else if(arg == 'up') {
				//console.log('是否还有数据：=====》' + (datas.fileList == undefined))
				miniRefresh.endUpLoading(data.fileList == undefined);

			} else {
				//miniRefresh.endUpLoading((totalPage == pageNums));
			}

			pageNums++;
		},
		error: function() {
			miniRefresh.endUpLoading(true);
		}
	});
};

/*获取文件图标*/
Vue.filter('format', function(value) {
	var srcs;
	if(value.fileType == 1) {
		srcs = '../../icon/gcyp_wjj.png';
	}
	if(value.fileType == 2) {
		var i = tool.getAttachIcon(value.fileName)
		srcs = "../../" + i.src;
	}
	return srcs;
});

/*转换日期类型*/
Vue.filter('switchingTime', function(time) {
	var finish = new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
	return finish;
});

function init() {
	pageNums = 1;
	miniRefresh.scrollTo(0, 300);
	obj.list = [];
	miniRefresh.resetUpLoading();
	miniRefresh.triggerUpLoading();
}

/*点击列表进入下一级目录或下载文件*/
$(document).on('tap', '.files', function() {
	obj.fileId = $(this).attr('fileId');
	obj.fileType = $(this).attr('fileType');
	obj.fileName = $(this).attr('fileName');
	obj.fileSize = $(this).attr('fileSize');
	/*查看下一级*/
	if(obj.fileType == 1) {
		if(obj.parentId.length == 0) {
			genfileid = obj.fileId;
		}
		obj.parentId.push(obj.dirId);
		obj.parentName.push(obj.fileName);
		obj.headName = obj.fileName;
		obj.dirId = obj.fileId;

		init();
		//					pageNums = 1
		//					getlist('next');
	} else {
		/*文件下载并打开*/
		$.ajax({
			type: 'POST',
			url: userInfo.url + '/cloud/downloadFile?type=json',
			beforeSend: function(request) {},
			data: {
				projectId: userInfo.projId,
				groupId: obj.groupId,
				fileId: obj.fileId,
				tokenId: userInfo.tokenId
			},
			dataType: 'json',
			success: function(data) {
				//登陆失效
				if(data.responseInfo.responseCode != 1) {
					tokenInvalid(data);
					return;
				}

				obj.fileUrl = data.fileUrl;
				createDownload();
			}
		});
	}
});

/*返回上一级*/
$('.backs').on('tap', function() {
	if(obj.parentId.length == 1) { //当返回最后一层的时候需要判断清楚更目录的id
		genfileid = "";
	}
	obj.dirId = obj.parentId[obj.parentId.length - 1];
	obj.headName = obj.parentName[obj.parentName.length - 2];
	obj.currentPage = 1;

	//console.log("返回之后剩下的父节点名称："+obj.parentId);
	//console.log("返回上一级时获取的父节点名称:"+obj.headName);
	//getlist();
	init();
	obj.parentId.pop();
	obj.parentName.pop();
});

function addTolocalStorage() {

}

/*文件下载保存至传输列表页面*/
$("#downloads").on('tap', function() {
	var info = [];
	var flag = false;
	if(obj.folderIdList != "") {
		mui.toast('不能下载文件夹！')
	} else {
		mui.toast('已经加入到传输列表')
		//把要下载的数据添加上url然后放入数组中
		var dTaskArr = [];
		$(".mui-icon-checkmarkempty").each(function(index, data) {

			var infos = {
				fileName: $(data).attr('filename'),
				fileType: $(data).attr('filetype'),
				fileSize: $(data).attr('filesize'),
				fileId: $(data).attr('fileid'),
				userId: userInfo.userId,
				status: true,
				fileUrl: ''
			}

			var objdata = {
				projectId: userInfo.projId,
				groupId: userInfo.groupId,
				fileId: $(data).attr('fileid'),
				tokenId: userInfo.tokenId
			}

			//发送ajax请求获取文件的下载地址
			$.post(userInfo.url + '/cloud/downloadFile?type=json', objdata, function(data) {
				data = JSON.parse(data);
				if(data.responseInfo.responseCode != 1) {
					mui.toast(data.responseInfo.responseMessage);
					return;
				}
				infos.fileUrl = data.fileUrl;

				//检查文件是否存在==============================
				plus.io.resolveLocalFileSystemURL("_downloads/" + decodeURI(infos.fileName), function(entry) {
					if(entry.isFile) {
						mui.toast('已存在本地：' + entry.name);
					}

					if(($(".mui-icon-checkmarkempty").length - 1) == index) {
						setAndDowload(dTaskArr);
					}

				}, function(e1) {
					dTaskArr.push(infos);
					//alert("Resolve file URL failed: " + e1.message);
					if(($(".mui-icon-checkmarkempty").length - 1) == index) {
						setAndDowload(dTaskArr);
					}

				});

			});

		});
	}
});

//保存并下载				
function setAndDowload(dTaskArr) {
	//从本地缓存中获取下载任务信息
	var beforeDownInfo = localStorage.getItem('downInfos');
	beforeDownInfo = JSON.parse(beforeDownInfo);

	//如果为null就直接存入
	if(beforeDownInfo == null) {
		beforeDownInfo = [];
		localStorage.setItem('downInfos', JSON.stringify(dTaskArr));
	}

	//如果不为null就对比两个数组不一样的就添加进本地缓存
	dTaskArr.forEach((outData) => {
		var isRepetition = false;
		beforeDownInfo.forEach((innerData) => {
			if(outData.fileId == innerData.fileId && outData.userId == innerData.userId) {
				isRepetition = true;
			}
		});
		if(!isRepetition) {
			beforeDownInfo.push(outData);
		}
	});
	localStorage.setItem('downInfos', JSON.stringify(beforeDownInfo));

	//console.log("下载任务:===>"+JSON.stringify(beforeDownInfo));

	//return;
	//循环启动下载任务
	beforeDownInfo.forEach((e, index) => {
		downloaderUtil.createTask(e.fileSize, e.fileUrl, e.fileName, e.fileId);
	});
}

//下载工具对象
var downloaderUtil = {
	//存放下载对象
	taskMap: new Map(),
	//创建一个下载任务
	createTask: function(fileSize, fileUrl, fileName, fileId) {
		var dtask = null;

		//创建下载对象
		dtask = plus.downloader.createDownload(fileUrl, {
			method: 'GET'
		}, function(d, status) {
			//下载完成删除
			doneDel(d);
		});
		this.taskMap.set(fileId, dtask);
		dtask.resume();
	}

}

//下载完成删除
function doneDel(d) {

	//下载完成的文件保存到数组中，用于显示历史记录
	var DownloadedFiles = [];

	var beforeDownInfo = localStorage.getItem('downInfos');
	if(beforeDownInfo == null) {
		beforeDownInfo = [];
	}

	//对比然后添加到下载记录然后删除
	beforeDownInfo = JSON.parse(beforeDownInfo);
	beforeDownInfo.forEach((data, index) => {
		if(data.fileUrl == d.url) {
			DownloadedFiles.push(data);
			beforeDownInfo.splice(index, 1);
		}
	});

	//把下载记录存入到本地缓存
	var DownloadedFiles_old = JSON.parse(localStorage.getItem('DownloadedFiles'));
	if(DownloadedFiles_old != null) {
		localStorage.setItem('DownloadedFiles', JSON.stringify(DownloadedFiles.concat(DownloadedFiles_old)));
	} else {
		localStorage.setItem('DownloadedFiles', JSON.stringify(DownloadedFiles));
	}

	//console.log(d.filename + '下载完成');
}

/*下载并打开文件 开始*/
function createDownload() {
	
	//跳转到新页面打开gmd文件
	var fileUrl = obj.fileUrl;
	var suffix = fileUrl.substring(fileUrl.lastIndexOf(".") + 1, fileUrl.length);
	if(suffix == "gmd"){
		var headUrl = userInfo.httpurl;
		headUrl = headUrl + "/gmdModel/index.html?url=" + fileUrl;
		//location.href = headUrl;
		GoToURL('../at_cloud/cloud_project_preview.html?url='+headUrl,'cloud_project_preview');
		return;
	}
	
	//判断文件是否已经下载
	plus.io.resolveLocalFileSystemURL('_downloads/' + obj.fileName, function(entry) {
		if(entry.isFile) {
			mui.toast('已经下载');
			plus.runtime.openFile('_downloads/' + obj.fileName, {}, function(e) { //调用第三方应用打开文件
				mui.toast("打开失败");
			});
		}
	}, function(e) {
		dBase();
	});
}

function dBase() {
	//console.log("文件总大小:"+obj.fileSize+"下载路径："+obj.fileUrl+"下载名称："+obj.fileName);
	//初始化下载对象
	plus.nativeUI.showWaiting("加载中...");
	var dtask = null;
	if(dtask) {
		mui.toast('下载任务已经存在,请耐心等待');
		return;
	}
	dtask = plus.downloader.createDownload(obj.fileUrl, {
		method: 'GET'
	}, function(d, status) {

		plus.runtime.openFile(d.filename, {}, function(e) { //调用第三方应用打开文件
			//						mui.toast("打开失败");
		});
	});
	dtask.addEventListener("statechanged", function(task, status) {
		if(!dtask) {
			return;
		}
		switch(task.state) {
			case 1:
				mui.toast('开始下载...');
				break; //开始
			case 2:
				mui.toast('链接到服务器...');
				break; //链接到服务器
			case 3:
				var progressVal = (task.downloadedSize / obj.fileSize) * 100
				//console.log(progressVal.toFixed(1)+"%");break;
			case 4:
				plus.nativeUI.closeWaiting();
				mui.toast('下载完成');
				break;
		}
	});
	dtask.start();
}
/*下载并打开文件 结束*/

/*新建文件夹*/
function addfiles() {
	$('.iadd').val('');
	$('.cancel,.yes').off('tap');
	$('#insert').removeClass().addClass('mui-popup mui-popup-out');
	$('.addpop').hide();
}
$(function() {
	$('.title-img').on('tap', function() {
		var id = $(this).data("id");
		switch(id) {
			case 1:
				if(genfileid == "6268") { //如果文件根目录等于设计文档 则无法新增
					mui.toast("当前文档无法新增");
					break;
				}

				$('#insert').removeClass().addClass('mui-popup mui-popup-in');
				$('.addpop').show();

				$('.cancel').on('tap', function() {
					addfiles();
				});
				$('.yes').on('tap', function() {
					var val = $('.iadd').val().trim();
					if(val.length == 0) {
						mui.toast("请输入文件名");
					} else {
						//							mui.toast('确定'+$('.iadd').val());
						$.ajax({
							type: 'POST',
							url: userInfo.url + '/cloud/addDirectory?type=json',
							beforeSend: function(request) {},
							data: {
								projectId: userInfo.projId,
								groupId: obj.groupId,
								parentDirId: obj.dirId,
								//文件夹名称
								dirName: $('.iadd').val(),
								tokenId: userInfo.tokenId
							},
							dataType: 'json',
							success: function(data) {
								//								debugger;
								//								console.log(data.responseInfo);
								//登陆失效
								if(data.responseInfo.responseCode == 101) {
									tokenInvalid(data);
									return;
								}

								if(data.responseInfo.responseMessage == '新建文件夹成功') {
									mui.toast(data.responseInfo.responseMessage);
									//刷新
									obj.currentPage = 1;
									getlist('down');
									miniRefresh.triggerDownLoading();
								} else {
									mui.toast('文件夹已存在');
								}
							}
						});
					}
					addfiles();
				});

				break;
			case 2:
				break;
			case 3:
				//							mui.openWindow({
				//								url: 'transmission.html',
				//								id: 'transmission',
				//							})
				//GoToURL('../at_cloud/transmission.html', 'transmission')

				mui.openWindow({
					url: '../at_cloud/transmission.html',
					show: {
						autoShow: false
					},
				});
				//							 var w = plus.webview.create('../at_cloud/transmission.html');
				//							 plus.webview.hide(w);
				/*var page = mui.preload({
					url: '../at_cloud/transmission.html',
					id: 'transmission', //默认使用当前页面的url作为id
					styles: {}, //窗口参数
					extras: {} //自定义扩展参数
				});*/

				break;
			case 4:
				//						mui.toast('默认群组');
				break;
			case 5:
				//location.href = 'cloud_project_search.html?groupId='+ obj.groupId+"&dirId="+obj.dirId;
				var url = '../at_cloud/cloud_project_search.html?groupId=' + obj.groupId + "&dirId=" + obj.dirId;
				GoToURL(url, 'cloud_project_search');
				break;
		}
	})

});

/*切换群组*/
function changeGroup() {
	//$('document').unbind();
	$(document).on('tap', '.groupli', function() {
		$('.condition').empty();
		$(this).find('.condition').html("✓").show();
		obj.groupId = $(this).attr('groupId');
		$('.groupstyle').html($(this).find('.hone').text());

		obj.dirId = 0;
		mui('#middlePopover').popover('hide');
		pageNums = 1;
		/*miniRefresh.scrollTo(0, 300);
	                miniRefresh.resetUpLoading();
					miniRefresh.triggerUpLoading();*/
		getlist();

	});
}

// 标签跳转
mui('body').on('tap', 'a', function() {
	return;
});

/*分享*/
$('.ops').on('tap', function(e) {
	debugger;
	var arr = opData();
	var id = $(this).data("id");
	var FileSelectedData = arr[0];
	var folderSelectedData = arr[1];
	var fileName = arr[2];
	fileName = encodeURIComponent(fileName);

	var reg = /([^\\/]+)\.([^\\/]+)/i; //验证是否有后缀
	if(reg.test(fileName)) {
		fileName = RegExp.$1;
	}
	if(FileSelectedData != "" && folderSelectedData == "") { //分享文件
		$.ajax({
			type: 'POST',
			url: userInfo.url + '/cloud/shareFile?type=json&tokenId=' + userInfo.tokenId + "&projectId=" + userInfo.projId + "&groupId=" + obj.groupId + "&shareType=" + id + "&shareName=" + fileName + "&fileIdList=" + FileSelectedData,
			beforeSend: function(request) {},
			dataType: 'json',
			success: function(data) {
				//登陆失效
				if(data.responseInfo.responseCode == 101) {
					tokenInvalid(data);
					return;
				}
				//console.log("4.9",data);
				mui.toast(data.responseInfo.responseMessage);
				if(id == 2) {
					mui.alert("您的分享链接为：" + data.shareInfo.shareUrl + "\n" + "密码为：" + data.shareInfo.sharePassword);
				}
				if(id == 3) {
					mui.alert("您的分享链接为：" + data.shareInfo.shareUrl);
				}
			}
		});
	} else if(FileSelectedData == "" && folderSelectedData != "") { //分享文件夹
		$.ajax({
			type: 'POST',
			url: userInfo.url + '/cloud/shareFile?type=json&tokenId=' + userInfo.tokenId + "&projectId=" + userInfo.projId + "&groupId=" + obj.groupId + "&shareType=" + id + "&shareName=" + fileName + "&folderIdList=" + folderSelectedData,
			beforeSend: function(request) {},
			dataType: 'json',
			success: function(data) {
				//登陆失效
				if(data.responseInfo.responseCode == 101) {
					tokenInvalid(data);
					return;
				}
				//console.log("4.9",data);
				mui.toast(data.responseInfo.responseMessage);
				if(id == 2) {
					mui.alert("您的分享链接为：" + data.shareInfo.shareUrl + "\n" + "密码为：" + data.shareInfo.sharePassword);
				}
				if(id == 3) {
					mui.alert("您的分享链接为：" + data.shareInfo.shareUrl);
				}

			}
		});
	} else if(FileSelectedData != "" && folderSelectedData != "") { //同时分享文件和文件夹 
		//                                                                                                                                                   Integer shareType, String shareName, String folderIdList, String fileIdList, 
		$.ajax({
			type: 'POST',
			url: userInfo.url + '/cloud/shareFile?type=json&tokenId=' + userInfo.tokenId + "&projectId=" + userInfo.projId + "&groupId=" + obj.groupId + "&shareType=" + id + "&shareName=" + fileName + "&folderIdList=" + folderSelectedData + "&fileIdList=" + FileSelectedData,
			beforeSend: function(request) {},
			dataType: 'json',
			success: function(data) {
				//登陆失效
				if(data.responseInfo.responseCode == 101) {
					tokenInvalid(data);
					return;
				}
				//console.log("4.9",data);
				mui.toast(data.responseInfo.responseMessage);
				if(id == 2) {
					mui.alert("您的分享链接为：" + data.shareInfo.shareUrl + "\n" + "密码为：" + data.shareInfo.sharePassword);
				}
				if(id == 3) {
					mui.alert("您的分享链接为：" + data.shareInfo.shareUrl);
				}

			}
		});
	}
	mui('#share').popover('toggle');
	obj.fileId = "";
	obj.fileIdList = "";
	obj.folderIdList = "";

	$('.circle').css('padding', '4px').css('top', '30px').removeClass('padding mui-icon mui-icon-checkmarkempty');
	$('.footer').hide();
	//防止文件夹不能点击
	$('.files,.title-out').removeClass('disabled');
});

/*删除*/
$('.dels').on('tap', function(e) {
	var arr = opData();
	var FileSelectedData = arr[0];
	var folderSelectedData = arr[1];
	var filess = [];
	if(FileSelectedData != "" && folderSelectedData == "") { //删除文件
		filess = FileSelectedData.split(',');
		obj.fieType = 2;
		//防止文件夹不能点击
		$('.files,.title-out').removeClass('disabled');
	} else if(FileSelectedData == "" && folderSelectedData != "") { //删除文件夹
		filess = folderSelectedData.split(',');
		obj.fieType = 1;
	} else if(FileSelectedData != "" && folderSelectedData != "") {
		mui.toast("不能删除文件夹和文件！");
		return;
	}

	for(var i = 0; i < filess.length; i++) {
		$.ajax({
			type: 'POST',
			url: userInfo.url + '/cloud/deleteFile',
			beforeSend: function(request) {},
			data: {
				projectId: userInfo.projId,
				groupId: obj.groupId,
				fileId: filess[i],
				fileType: obj.fileType,
				tokenId: userInfo.tokenId,
				type: 'json'
			},
			dataType: 'json',
			async: false,
			success: function(data) {
				//							debugger;
				//							console.log(JSON.stringify(data));
				////							alert('sss');
				//登陆失效
				if(data.responseInfo.responseCode == 101 || data.responseInfo.responseCode == 100) {
					tokenInvalid(data);
					return;
				}
				mui.toast(JSON.stringify(data.responseInfo.responseMessage));
				if(data.responseInfo.responseCode == 1) {
					//if(obj.fileType == 1) {

						obj.list.forEach((data, index) => {
							if(data.fileId == filess[i]) {
								obj.list.splice(index, 1);
							}
						});

						//删除文件夹
						//location.reload();
						//plus.nativeUI.showWaiting().close();
					//}
				}

			}
		});
	}
	//	if(obj.fileType != 1) {
	//		//删除文件夹
	//
	//		//					plus.nativeUI.showWaiting().close();
	//		//				} else {
	$('.circle').css('padding', '4px').css('top', '30px').removeClass('padding mui-icon mui-icon-checkmarkempty');

	//		//刷新
	//		//obj.currentPage = 1;
	//		//getlist('down');
	//		miniRefresh.triggerDownLoading();
	//	}
	$('.footer').hide();
	$('.files,.title-out').removeClass('disabled');
	$('#list').css('padding-bottom', '0')
});

//获取选中的数据
function opData() {
	var arr = [];
	var FileSelectedData = '';
	var folderSelectedData = '';
	var fileName = "";
	$(".mui-icon-checkmarkempty").each(function(index, data) {
		if(index == 0) {
			fileName = $(data).attr('filename');
		}
		if($(data).attr('filetype') == "2") {
			FileSelectedData += $(data).attr('fileid') + ",";
		}
		if($(data).attr('filetype') == "1") {
			folderSelectedData += $(data).attr('fileid') + ",";
		}
	})

	arr[0] = FileSelectedData.substring(0, FileSelectedData.length - 1);
	arr[1] = folderSelectedData.substring(0, folderSelectedData.length - 1);
	arr[2] = fileName;
	return arr;
}

//=============================上传文件========================================================

function loadPath() {
	plus.uploader.clear();
	var path = JSON.parse(localStorage.getItem('path'));
var uploadTask = [];
	path.forEach((path) => {
		var task = null;
		task = plus.uploader.createUpload(url, {
				method: "POST",
				blocksize: 0, //80249509,//204800,
				priority: 100
			},
			function(t, status) {
				//console.log("上传信息:" + JSON.stringify(t.responseText));
				alert("上传成功");
				// 上传完成
				if(status == 200) {
					//alert("Upload success: " + t.url);
					var finishId = t.__UUID__;
					var uploads = JSON.parse(localStorage.getItem('uploads'));
					if(uploads == null) {
						uploads = [];
					}
					uploads.forEach((data, index) => {
						if(data.id == finishId) {
							uploads.splice(index, 1);
						}
					});
					localStorage.setItem('uploads', JSON.stringify(uploads));

				} else {
					alert("Upload failed: " + status);
				}
			}
		);

		task.addData('projId', userInfo.projId + "");
		task.addData('type', "1");
		task.addData('userId', userInfo.userId);
		task.addData('modelCode', '002');
		task.addData('token', userInfo.tokenId);
		task.addData('returnUrl', uploadfiles(dirids));
		task.addData('groupId', userInfo.groupId);
		task.addData('parentDirId', obj.dirId);
		task.addData('fgId', '');
		task.addFile(path, {
			key: "file"
		});

		//获取任务名称
		var name = path.substring(path.lastIndexOf("/") + 1, path.length);
		//任务id
		var id = task.__UUID__;

		uploadTask.push({
			name: name,
			id: id,
			task: task
		});

		task.addEventListener("statechanged", onStateChanged, false);

		/*task.addEventListener("statechanged", function(task, status) {
			if(window['obj' + task.__UUID__] == null) {
				window['obj' + task.__UUID__] = new onStateChanged(null, null, task.__UUID__, task.totalSize, name);
				console.log(JSON.stringify(task));
			} else {
				window['obj' + task.__UUID__].task = task;
				window['obj' + task.__UUID__].status = status;
				window['obj' + task.__UUID__].totalSize = task.totalSize;
				window['obj' + task.__UUID__].check();
			}
		}, false);*/

		task.start();

	});

	//	plus.uploader.enumerate(function(muploads) {
	//		console.log(JSON.stringify(muploads[0]));
	//		console.log("任务个数：" + muploads.length);
	//		var uploadTask = [];
	//		for(var i=0; i<muploads.length; i++){
	//			//muploads[i].addEventListener("statechanged", onStateChanged, false);
	//			uploadTask.push(muploads[i]);
	//		}
	//		localStorage.setItem('uploadTask', JSON.stringify(uploadTask));
	//		
	//		//var newuploads = JSON.parse(localStorage.getItem('uploadTask'));
	//		//console.log("传输列表任务数："+newuploads);
	//		
	//	});

	//把上传信息存储到本地缓存
	//	var uploads = JSON.parse(localStorage.getItem('uploads'));
	//	if(uploads == null) {
	//		uploads = [];
	//	}
	//	localStorage.setItem('uploads', JSON.stringify(uploadTask.concat(uploads)));

}

// 监听上传任务状态

let flag = true;
let uploadedSize = 0;
var seconde = 0;
var upload;

function onStateChanged(uploads, status) {

	if(uploads.state == 4 && status == 200) {
		clearInterval(timeTask);
		// 上传完成
		alert("Upload success: ");
		// + upload.getFileName()
	} else {

		upload = uploads;

		if(flag) {
			start();
			flag = false;
		}

		//localStorage.setItem("size",upload.uploadedSize);

		//uploadedSize = upload.uploadedSize;

		/*for(let i=0; i<1000000; i++){
		}*/

		//		if((new Date().getSeconds() != seconde)) {
		//              console.log("已经上传：" + upload.uploadedSize + "   总共大小：" + upload.totalSize +" 上传状态："+upload.state+" 返回状态:"+status);
		//		}

		//		seconde = new Date().getSeconds();
		//console.log("已经上传：" + upload.uploadedSize + "   总共大小：" + upload.totalSize );
	}
}

function start() {

	timeTask = setInterval(function() {
		//console.log("下载状态:"+upload.state+"    状态:"+status+"   已经下载:"+upload.uploadedSize);
		console.log("已经上传：" + upload.uploadedSize + "   总共大小：" + upload.totalSize + " 上传状态：" + upload.state);
	}, 1000);

}

//监听器，用来显示实时显示下载信息 
function onStateChanged2(task, status, num, totalSize, name) {
	var o = new Object();
	o.name = name;
	o.task = task;
	o.status = status;
	o.num = num;
	o.totalSize = totalSize;
	o.nowSize = 0;
	o.timeTask = null;
	o.check = function() {
		switch(o.task.state) {
			case 1: // 开始
				mui.toast("开始上传...");
				break;
			case 2: // 已连接到服务器
				mui.toast("链接到服务器...");
				break;
			case 3: // 已接收到数据
				if(o.nowSize == 0) {
					o.nowSize = o.task.uploadedSize;

					o.timeTask = setInterval(function() {
						showing(o.num, o.task.uploadedSize, o.nowSize, o.totalSize, o.name);
						o.nowSize = o.task.uploadedSize;
					}, 1000);

					if(o.nowSize == 0) {
						o.nowSize = 1;
					}
				}
				break;
			case 4: // 下载完成
				//清除定时函数
				clearInterval(o.timeTask);
				if(o.status == 200) {
					mui.toast("上传完成！");
					alert("上传完成！");
				} else {
					mui.toast("上传失败！");
					alert("上传失败！");
				}

				break;
		}
	}
	return o;
}

//实时显示下载进度
function showing(num, uploadedSize, nowSize, totalSize, name) {
	var progressVal = (uploadedSize / totalSize) * 100;
	console.log("上传中========");
	//if($('#secondshow' + num).css('display') != 'none') {
	/*mui('#psb' + num).progressbar({
		progress: progressVal
	}).show();*/
	//已经下载多少
	//$('#nowsize' + num).html(changeSize(downloadedSize));
	//显示网速
	//$('#secondshow' + num).html(changeSize(downloadedSize - nowSize) + '/s');
	//console.log(name + "已经上传了多少:" + changeSize(uploadedSize) + " == 总大小：" + totalSize + "== 当前网速:" + changeSize(uploadedSize - nowSize) + "/s" + "  当前进度：" + progressVal);
	//}
}

$(function() {
	var size = localStorage.getItem("size");
	console.log("下载了多少:" + size);
	plus.uploader.enumerate(function(up) {
		console.log("上传任务：=======================>" + up.length);
	});

})

function uploadOther() {
	mui('#c_upload').popover('toggle');
	var url = "../at_cloud/cloud_project_selectFile.html?parentDirId=" + obj.dirId + "&dirid=" + dirids;
	GoToURL(url, 'cloud_project_selectFile');
}
var url = userInfo.fileUrl + "/uploading/uploadFileInfo";

function uploadPhoto() {
	mui('#c_upload').popover('toggle');
	// 从相册中选择图片
	plus.gallery.pick(function(e) {
		//showAndUpload(e);

		for(var i in e.files) {
			var fileSrc = e.files[i];

			var task = plus.uploader.createUpload(url, {
					method: "POST",
					blocksize: 0, //204800,
					//priority: 100
				},
				function(t, status) {
					//console.log("上传信息:" + JSON.stringify(t.responseText));
					// 上传完成
					/*if(status == 200) {
						alert("Upload success: " + t.url);
					} else {
						alert("Upload failed: " + status);
					}*/
				}
			);
			task.addData('projId', userInfo.projId + "");
			task.addData('type', "1");
			task.addData('userId', userInfo.userId);
			task.addData('modelCode', '002');
			task.addData('token', userInfo.tokenId);
			task.addData('returnUrl', uploadfiles(dirids));
			task.addData('groupId', userInfo.groupId);
			task.addData('parentDirId', obj.dirId);
			task.addData('fgId', '');
			var path = $(this).attr("path");
			task.addFile(fileSrc, {
				key: "file"
			});
			task.start();

		}

	}, function(e) {
		//console.log("取消选择图片");
	}, {
		filter: "image",
		multiple: true,
		//maximum: 5,
		system: true,
		onmaxed: function() {
			//plus.nativeUI.alert('最多只能选择5张图片');
		}
	});
}