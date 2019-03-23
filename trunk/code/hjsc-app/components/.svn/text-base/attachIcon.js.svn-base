/*通过文件后缀名，判断附件的图标样式*/
//可能罗列不完整，需后期再添加
//2018-12-13第二次完善
var tool={
	getAttachIcon:function(attachName){
        try{
            var suffix = attachName.substring(attachName.lastIndexOf(".") + 1, attachName.length).toLowerCase();
            //Microsoft Word
            if(suffix.indexOf("doc") > -1 || suffix.indexOf("docx") > -1){
                return {src:"icon/gcyp_word.png"};
            //Microsoft Excel
            }else if(suffix.indexOf("xls") > -1 || suffix.indexOf("xlsx") > -1){
                return {src:"icon/gcyp_excel.png"};
            //Microsoft Powerpoint
            }else if(suffix.indexOf("ppt") > -1 || suffix.indexOf("pptx") > -1){
                return {src:"icon/gcyp_ppt.png"};
            //Adobe PDF
            }else if(suffix.indexOf("pdf") > -1){
                return {src:"icon/gcyp_pdf.png"};
            //Autodesk AutoCAD
            }else if(suffix.indexOf("dwg") > -1 || suffix.indexOf("dxf") > -1 || suffix.indexOf("dwt") > -1){
                return {src:"icon/gcyp_cad.png"};
            //Autodesk Revit
            }else if(suffix.indexOf("rvt") > -1 || suffix.indexOf("rfa") > -1 || suffix.indexOf("rte") > -1 || suffix.indexOf("rft") > -1){
                return {src:"icon/gcyp_rvt.png"};
            //常用压缩包文件
            }else if(suffix.indexOf("rar") > -1 || suffix.indexOf("zip") > -1 || suffix.indexOf("gzip") > -1 || suffix.indexOf("7z") > -1){
                return {src:"icon/gcyp_zip.png"};
            //常用矢量图文件
            }else if(suffix.indexOf("bmp") > -1 || suffix.indexOf("dib") > -1){
                return {src:"icon/gcyp_bmp.png"};
            //常用点阵图文件
            }else if(suffix.indexOf("jpg") > -1 || suffix.indexOf("jpeg") > -1 || suffix.indexOf("gif") > -1 || suffix.indexOf("tif") > -1 || suffix.indexOf("tiff") > -1 || suffix.indexOf("png") > -1 || suffix.indexOf("psd") > -1 || suffix.indexOf("svg") > -1){
                return {src:"icon/gcyp_jpg.png"};
            //文本文件
            }else if(suffix.indexOf("txt") > -1){
                return {src:"icon/gcyp_text.png"};
            //常用音频文件
            }else if(suffix.indexOf("cd") > -1 || suffix.indexOf("wav") > -1 || suffix.indexOf("mp3") > -1 || suffix.indexOf("wma") > -1 || suffix.indexOf("mid") > -1){
                return {src:"icon/gcyp_mp3.png"};
            //常用视频文件
            }else if(suffix.indexOf("avi") > -1 || suffix.indexOf("mpeg") > -1 || suffix.indexOf("rm") > -1 || suffix.indexOf("rmvb") > -1 || suffix.indexOf("mp4") > -1 || suffix.indexOf("3gp") > -1 || suffix.indexOf("wmv") > -1 || suffix.indexOf("flv") > -1){
                return {src:"icon/gcyp_mp4.png"};
            //GMD模型文档
            }else if(suffix.indexOf("gmd") > -1){
                return {src:"icon/gcyp_gmd.png"};
            }else{
                return {src:"icon/gcyp_default.png"};
            }
        }catch(e){
            return {src:"icon/gcyp_default.png"};
        }
    },
}

//用法
/*获取文件的图标样式*/
//<img :src="item | format">
//titname数组中文件名称
//Vue.filter('format',function(value){
//	var i=tool.getAttachIcon(value.titname)
//	return i.src;
//});
