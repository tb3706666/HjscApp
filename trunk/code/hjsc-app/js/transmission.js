mui.init({
	swipeBack: true
});

/*var obj = {
	fileName
}*/

var loading2 = [{
	"fileName": "235a4a69fff047a39d67e6ddedcab4f4.mp4",
	"fileType": "2",
	"fileSize": "3357275",
	"fileId": "13003",
	"userId": 191,
	"status": true,
	"fileUrl": ""
}, {
	"fileName": "%5B%E7%94%9F%E6%B4%BB%E5%A4%A7%E7%88%86%E7%82%B8%5D%5B%E7%AC%AC%E4%B8%80%E5%AD%A3%5D%E7%AC%AC1%E9%9B%86_hd.mp4",
	"fileType": "2",
	"fileSize": "86971264",
	"fileId": "13006",
	"userId": 191,
	"status": true,
	"fileUrl": ""
}]
//var loading = [];
var save = [];
/*获取登录数据*/
userInfo = getGlobalUserInfo();

var loading = JSON.parse(localStorage.getItem('downInfos'));

//页面
var obj = new Vue({
	el: '#trans',
	data: {
		k: true,
		z: false,
		loadings: [],
		//本地保存文件
		saves: [],
		uploads: [],
		records: [],
		fileId: "",
		fileUrl: "",
		fileName: "",
		fileSize: "",
		saveLength: '',
		filePath: "",
		//本地保存文件选中的
		localSaveFile: '',
		localSaveFileIndex: '',
	},
	methods: {
		menu: function(num, id, fileName, index) {
			if(num == 1) { //本地保存
				this.localSaveFile = fileName;
				this.localSaveFileIndex = index;
				mui('.popover1').popover('toggle');
			}
			if(num == 2) { //上传记录
				mui('.popover2').popover('toggle');
			}
			obj.fileId = id //获取选中文件的id，存入obj内，以便通过id预览和删除
		},
		//预览文件
		previewFile: function() {
			plus.runtime.openFile("_downloads/" + decodeURI(this.localSaveFile), {}, function(e) {
				if(e.message == "文件不存在") {
					mui.toast("本地文件已被删除");
				} else {
					mui.toast(e.message);
				}

			});
			mui('.mui-popover').popover('hide');
		},
		//删除文件
		deletes: function() {
			plus.io.resolveLocalFileSystemURL(
				'_downloads/' + decodeURI(this.localSaveFile),
				function(entry) {
					if(entry.isFile) {
						entry.remove(function(entry) {
							obj.saves.splice(obj.localSaveFileIndex, 1);
							localStorage.setItem('DownloadedFiles', JSON.stringify(obj.saves));
							mui.toast('删除成功');
						}, function(e) {
							mui.toast(e.message);
						});
					}
				},
				function(e) {
					if(e.message == "路径不存在") {
						mui.toast("本地文件已被删除");
					} else {
						mui.toast(e.message);
					}

				}
			);

			mui('.mui-popover').popover('hide');
		},
		cancel: function() {
			$("input[name='radio']").each(function() {
				this.checked = false;
			});
			mui('.mui-popover').popover('hide');
		},
	},
	watch: {
		loadings: function() {
			this.$nextTick(function() {
				dowloadAndStop();
				//init_task();
				initp();
			})
		},
	},
	mounted: function() {
		dowloadAndStop();
		init_task();
	}

});

mui.plusReady(function() {

	//localDir
	plus.io.resolveLocalFileSystemURL("_downloads/", function(entry) {
		console.log(entry.toLocalURL());
		$("#localDir").html(entry.toLocalURL().substring(7));

	}, function(e) {
		//alert("Resolve file URL failed: " + e.message);
	});

});

function initp() {
	obj.loadings.forEach((data) => {
		mui("#psb" + data.fileId).progressbar().setProgress(data.downloadedSize);
		setTimeout(function() {
			$('#secondshow' + data.fileId).html(changeSize(data.task.downloadedSize - data.havaSize));
		}, 100);

	});
}

var DOWNLOADS = [];

//是否有正在下载的任务，有返回true
function isHaveStartedTask(arg) {
	var flag = false;
	arg.forEach((data) => {
		if(data.state == 3) {
			flag = true;
			//break;
		}
	});
	if(flag) {
		$("#downloadtAll").html('全部暂停');
	} else {
		$("#downloadtAll").html('全部下载');
	}

}

var flag = true;
var uploadedSize = 0;

//获取所有任务
function init_task() {

	mui.plusReady(function() {
		
		plus.downloader.enumerate(function(downloads) {

			if(loading == null || downloads.length == 0 || loading.length == 0) {
				localStorage.setItem('downInfos', null);
				mui.plusReady(function() {
					//关闭等待框
					plus.nativeUI.closeWaiting();
					//显示当前页面
					mui.currentWebview.show();
				})
				return;
			}
			DOWNLOADS = downloads;
			//console.log("===========：" + downloads.length);
			//console.log("===========：" + JSON.stringify(downloads));

			for(let i = 0; i < downloads.length; i++) {
				//console.log("任务状态：================》" +JSON.stringify(downloads[i]));
				var progressVal = (downloads[i].downloadedSize / loading[i].fileSize) * 100;
				loading[i].havaSize = downloads[i].downloadedSize;
				loading[i].downloadedSize = progressVal;
				loading[i].state = downloads[i].state;
				loading[i].task = downloads[i];
			}
			isHaveStartedTask(loading);
			obj.loadings = loading;

			for(let i = 0; i < downloads.length; i++) {
				downloads[i].addEventListener("statechanged", function(task, status) {
					if(window['obj' + i] == null) {
						window['obj' + i] = new onStateChanged(null, null, loading[i].fileId, loading[i].fileSize, loading[i].downloadedSize);
						console.log(JSON.stringify(downloads[i]));
					} else {
						window['obj' + i].task = task;
						window['obj' + i].status = status;
						window['obj' + i].totalSize = loading[i].fileSize;
						window['obj' + i].check();
					}

				});
				//downloads[i].resume();

			}

			mui.plusReady(function() {
				//关闭等待框
				plus.nativeUI.closeWaiting();
				//显示当前页面
				mui.currentWebview.show();
			})

		});
	});
}

/*转换文件大小*/
Vue.filter('changeSize', function(value) {
	return changeSize(value);
});

Vue.filter('changeName', function(value) {
	return decodeURI(value);
});

var storages = [];

/*下载并打开文件 开始*/
function createDownload() {
	mui.plusReady(function() {
		console.log(JSON.stringify(obj.loadings));
		$.each(obj.loadings, function(i, e) {

			downloaderUtil.isExist(e.fileName);
			setTimeout(function() {

				if(downloaderUtil.isHave) {
					return;
				} else {
					downloaderUtil.createTask(e.fileSize, e.fileUrl, e.fileName, e.fileId)
				}

			}, 100)

		});
	});
}

var downloaderUtil = {
	//存放下载对象
	taskMap: new Map(),
	isHave: false,
	//判断文件是否存在
	isExist: function(fileName) {
		var flag = false;
		plus.io.resolveLocalFileSystemURL("_downloads/" + decodeURI(fileName), function(entry) {
			if(entry.isFile) {
				mui.toast('已经下载' + entry.name);
				downloaderUtil.isHave = true;
			}
		}, function(e) {
			//alert("Resolve file URL failed: " + e.message);
		});
	},
	//创建一个下载任务
	createTask: function(fileSize, fileUrl, fileName, fileId) {
		var dtask = null;

		//创建下载对象
		dtask = plus.downloader.createDownload(fileUrl, {
			method: 'GET'
		}, function(d, status) {
			var beforeDownInfo = localStorage.getItem('downInfos');
			beforeDownInfo.forEach((data, index) => {
				if(data.fileUrl == d.url) {
					beforeDownInfo.splice(index, 1);
				}
			})
			console.log(d.filename + '下载完成');
		});

		//创建监听任务对象
		//window['obj' + fileId] = new onStateChanged(null, null, fileId, fileSize);
		dtask.addEventListener("statechanged", function(task, status) {
			if(window['obj' + fileId] == null) {
				window['obj' + fileId] = new onStateChanged(null, null, fileId, fileSize, nowSize);
				console.log(JSON.stringify(window['obj' + i]));
			} else {
				window['obj' + fileId].task = task;
				window['obj' + fileId].status = status;
				window['obj' + fileId].totalSize = fileSize;
				window['obj' + fileId].check();
			}
		});
		this.taskMap.set(fileId, dtask);
		dtask.resume();
	}

}

var dowload = 'iconfont icon-pause';

//暂停和停止下载
function dowloadAndStop() {
	$(".fontclass").on('tap', function() {
		var index = $(this).attr('index');
		var fileId = $(this).attr('fileId');
		//暂停下载
		if($(this).hasClass(dowload)) {
			$("#secondshow" + fileId).hide();
			$(this).prev().show();
			DOWNLOADS[index].pause();
			obj.loadings[index].state = 5;

		} else { //启动下载
			$("#secondshow" + fileId).show();
			$(this).next().show();
			DOWNLOADS[index].resume();
			obj.loadings[index].state = 3;
		}
	});

}

//监听器，用来显示实时显示下载信息 
function onStateChanged(task, status, num, totalSize, nowSize) {

	var o = new Object();
	o.task = task;
	o.status = status;
	o.num = num;
	o.totalSize = totalSize;
	o.nowSize = 0;
	o.timeTask = null;
	o.check = function() {
		switch(o.task.state) {
			case 1: // 开始
				mui.toast("开始下载...");
				break;
			case 2: // 已连接到服务器
				mui.toast("链接到服务器...");
				break;
			case 3: // 已接收到数据
				if(o.nowSize == 0) {
					o.nowSize = o.task.downloadedSize;
					o.timeTask = setInterval(function() {
						showing(o.num, o.task.downloadedSize, o.nowSize, o.totalSize);
						o.nowSize = o.task.downloadedSize;
					}, 1000);
					if(o.nowSize == 0) {
						o.nowSize = 1;
					}
				}
				break;
			case 4: // 下载完成
				//清除定时函数
				clearInterval(o.timeTask);
				//由于链接获取不到下载文件的总大小，而且下载的大小和实际大小有差距，所以最后把进度条显示为下载完成状态
				showing(o.num, o.totalSize, o.nowSize, o.totalSize);

				//下载完成的文件保存到数组中，用于显示历史记录
				var DownloadedFiles = [];

				//下载完成后从vue中移除掉然后添加到下载记录
				obj.loadings.forEach((data, index) => {
					if(data.fileId == o.num) {
						DownloadedFiles.push(data);
						obj.loadings.splice(index, 1);
						DOWNLOADS.splice(index, 1);
					}
				});

				//把下载记录存入到本地缓存,对比文件，如果存在则删除
				var DownloadedFiles_old = JSON.parse(localStorage.getItem('DownloadedFiles'));
				if(DownloadedFiles_old == null) {
					DownloadedFiles_old = [];
				}
				DownloadedFiles.forEach((newData, newIndex) => {
					DownloadedFiles_old.forEach((oldData) => {
						if(newData.fileId == oldData.fileId) {
							DownloadedFiles.splice(newIndex, 1);
						}
					});
				});
				localStorage.setItem('DownloadedFiles', JSON.stringify(DownloadedFiles.concat(DownloadedFiles_old)));

				//更改全部操作
				isHaveStartedTask(obj.loadings);

				if(obj.loadings.length == 0) {
					localStorage.setItem('downInfos', null);
				} else {
					localStorage.setItem('downInfos', JSON.stringify(obj.loadings));
				}

				mui.toast("下载完成！");
				break;
		}
	}
	return o;
}

//实时显示下载进度
function showing(num, downloadedSize, nowSize, totalSize) {
	var progressVal = (downloadedSize / totalSize) * 100;

	if($('#secondshow' + num).css('display') != 'none') {
		mui('#psb' + num).progressbar({
			progress: progressVal
		}).show();
		//已经下载多少
		$('#nowsize' + num).html(changeSize(downloadedSize));
		//显示网速
		$('#secondshow' + num).html(changeSize(downloadedSize - nowSize) + '/s');

	}
}

//全部下载和暂停 lc1
$("#downloadtAll").on('tap', function() {
	if(DOWNLOADS.length == 0) {
		return;
	}
	var op = $("#downloadtAll");
	if(op.html() == "全部下载") {
		op.html('全部暂停');
		$(".secondshow").show();
		$(".icon-pause").show();
		$(".mui-icon-pulldown").hide();
		DOWNLOADS.forEach((data) => {
			data.resume();
		})
	} else {
		op.html('全部下载');
		$(".secondshow").hide();
		$(".icon-pause").hide();
		$(".mui-icon-pulldown").show();
		DOWNLOADS.forEach((data) => {
			data.pause();
		})
	}
})

//下载完成删除
function doneDel(d) {
	var beforeDownInfo = localStorage.getItem('downInfos');
	console.log('下载完成删除传输列表页面====>' + JSON.stringify(beforeDownInfo));
	if(beforeDownInfo == null) {
		beforeDownInfo = [];
	}

	beforeDownInfo = JSON.parse(beforeDownInfo);

	beforeDownInfo.forEach((data, index) => {
		if(data.fileUrl == d.url) {
			beforeDownInfo.splice(index, 1);
		}
	})
	console.log(d.filename + '下载完成');
}

function dBase() {

}
/*下载并打开文件 结束*/

//保存的数据
//				var save=[
//					{titname:'立白办公大楼施工文件.doc',ban:'版本1',date:'2018-09-04 13:31:01',actions:'下载了立白办公大楼施工文件夹下载了立白',size:'311.04KB',id:1,imgurl:'icon/cpsldh1.png'},
//					{titname:'立白施工数据表.xls',ban:'版本1',date:'2018-09-04 17:01:31',actions:'下载了立白施工大楼',size:'249MB',id:2,imgurl:'icon/cpsldh2.png'},
//					{titname:'华润施工方案.pdf',ban:'版本2',date:'2018-09-04 16:11:21',actions:'下载了华润施工方案',size:'311.04KB',id:3,imgurl:'icon/cpsldh3.png'},
//					{titname:'顺丰资料管理.rar',ban:'版本1',date:'2018-09-04 13:31:01',actions:'下载了顺丰速运施工数据表.xls',size:'311.04KB',id:4,imgurl:'icon/cpsldh4.png'},
//				];

//正在上传的数据
var upload = [{
		name: '立白办公大楼施工文件.doc',
		id: 1,
		totalSize: '50009'
	},
	{
		name: '立白施工数据表.xls',
		id: 2,
		totalSize: '40009'
	},
	{
		name: '华润施工方案.pdf',
		id: 3,
		totalSize: '30009'
	},
	{
		name: '顺丰资料管理.mp4',
		id: 4,
		totalSize: '20009'
	},
];

//上传记录的数据
var record = [{
		titname: '立白办公大楼施工文件.doc',
		ban: '版本1',
		date: '2018-09-04 13:31:01',
		actions: '下载了立白办公大楼施工文件夹下载了立白',
		size: '311.04KB',
		id: 1,
		imgurl: 'icon/cpsldh1.png'
	},
	{
		titname: '立白施工数据表.xls',
		ban: '版本1',
		date: '2018-09-04 17:01:31',
		actions: '下载了立白施工大楼',
		size: '249MB',
		id: 2,
		imgurl: 'icon/cpsldh2.png'
	},
	{
		titname: '华润施工方案.pdf',
		ban: '版本2',
		date: '2018-09-04 16:11:21',
		actions: '下载了华润施工方案',
		size: '311.04KB',
		id: 3,
		imgurl: 'icon/cpsldh3.png'
	},
	{
		titname: '顺丰资料管理.rar',
		ban: '版本1',
		date: '2018-09-04 13:31:01',
		actions: '下载了顺丰速运施工数据表.xls',
		size: '311.04KB',
		id: 4,
		imgurl: 'icon/cpsldh4.png'
	},
];

/*获取文件的图标样式*/
Vue.filter('format', function(value) {
	var i = tool.getAttachIcon(value.fileName);
	return '../../' + i.src;
});

/*获取文件的图标样式*/
Vue.filter('format2', function(value) {
	var i = tool.getAttachIcon(value.name);
	return '../../' + i.src;
});

var item2 = document.getElementById('item2mobile');
var item3 = document.getElementById('item3mobile');
var item4 = document.getElementById('item4mobile');

(function($) {
	$('.mui-scroll-wrapper').scroll({
		indicators: false //是否显示滚动条
	});
	mui('.mui-scroll-wrapper').scroll();

	document.getElementById('slider').addEventListener('slide', function(e) {
		if(e.detail.slideNumber === 1) {
			if(item2.querySelector('.mui-loading')) {
				setTimeout(function() {
					var DownloadedFiles = JSON.parse(localStorage.getItem('DownloadedFiles'));
					if(DownloadedFiles == null) {
						DownloadedFiles = [];
					}
					obj.saves = DownloadedFiles; //loading2;
					item2.querySelector('.mui-loading').remove();
				}, 500);
			}
		} else if(e.detail.slideNumber === 2) {
			if(item3.querySelector('.mui-loading')) {
				setTimeout(function() {
					initUploads();
					//obj.uploads = upload;
					//item3.querySelector('.mui-loading').remove();
				}, 500);
			}
		} else if(e.detail.slideNumber === 3) {
			if(item4.querySelector('.mui-loading')) {
				setTimeout(function() {
					obj.records = record;
					item4.querySelector('.mui-loading').remove();
				}, 500);
			}
		}
	});
})(mui);

//枚举上传任务
function initUploads() {

	//1.首先从本地存储中获取上传任务信息，如果获取为null说明没有上传信息,直接赋值给vue不继续往下走totalSize
	var uploads = JSON.parse(localStorage.getItem('uploads'));
	if(uploads == null) {
		uploads = [];
		obj.uploads = uploads;
		item3.querySelector('.mui-loading').remove();
		return;
	}
	mui.plusReady(function() {

		for(let i = 0; i < uploads.length; i++) {
			uploads[i].totalSize = uploads[i].task.totalSize;
		}

		obj.uploads = uploads;
		item3.querySelector('.mui-loading').remove();

		//循环遍历上传任务，为每个任务添加上传状态监听器
		for(let i = 0; i < uploads.length; i++) {

			uploads[i].task.addEventListener("statechanged", function(task, status) {

				if(window['upload' + i] == null) {
					window['upload' + i] = new onUploadStateChanged(null, null, uploads[i].id, uploads[i].task.totalSize, uploads[i].task.uploadedSize);
					console.log(JSON.stringify(uploads[i]));
				} else {
					window['upload' + i].task = task;
					window['upload' + i].status = status;
					window['upload' + i].totalSize = uploads[i].task.totalSize;
					window['upload' + i].check();
				}
			});
		}

		//2.如果获取到上传任务信息，枚举出所有的上传任务，并进行操作
		//		plus.uploader.enumerate(function(muploads) {
		//			console.log("进来了==========================》" + muploads.length);
		//			//为每个添加总大小
		//			for(let i = 0; i < muploads.length; i++) {
		//				uploads[i].totalSize = muploads[i].totalSize;
		//			}
		//			obj.uploads = uploads;
		//			item3.querySelector('.mui-loading').remove();
		//
		//			//循环遍历上传任务，为每个任务添加上传状态监听器
		//			for(let i = 0; i < muploads.length; i++) {
		//
		//				muploads[i].addEventListener("statechanged", function(task, status) {
		//
		//					if(window['upload' + i] == null) {
		//						window['upload' + i] = new onUploadStateChanged(null, null, uploads[i].id, muploads[i].totalSize, muploads[i].uploadedSize);
		//						console.log(JSON.stringify(muploads[i]));
		//					} else {
		//						window['upload' + i].task = task;
		//						window['upload' + i].status = status;
		//						window['upload' + i].totalSize = muploads[i].totalSize;
		//						window['upload' + i].check();
		//					}
		//				});
		//			}
		//
		//		});

	});
}

//上传任务监听器，用来显示实时显示下载信息 
function onUploadStateChanged(task, status, num, totalSize, nowSize) {

	var o = new Object();
	o.task = task;
	o.status = status;
	o.num = num;
	o.totalSize = totalSize;
	o.nowSize = 0;
	o.timeTask = null;
	o.check = function() {
		switch(o.task.state) {
			case 1: // 开始
				mui.toast("开始下载...");
				break;
			case 2: // 已连接到服务器
				mui.toast("链接到服务器...");
				break;
			case 3: // 已接收到数据
				if(o.nowSize == 0) {
					o.nowSize = o.task.uploadedSize;
					o.timeTask = setInterval(function() {
						showing(o.num, o.task.uploadedSize, o.nowSize, o.totalSize);
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
				mui.toast("下载完成！");
				break;
		}
	}
	return o;
}