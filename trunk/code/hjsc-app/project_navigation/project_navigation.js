mui.init();
			
			
			    /*var _img;
				var  _title;
				var  _account;
				var  _administrator;
				var  _address;
				var  _scale;
				var  _unit;*/
			
			function get(_img,_title,_account,_administrator,_address,_scale,_unit){
				
			
			return '<div class="mark-out" id="test">' +
						'<div class="mark-one2"><img class="circle" src="../icon/circle.png"></div>' +
			            '<div class="info2">' +
							'<div class="detail-out2">' +
								'<div class="detail-left2 ">' +
									'<img class="img-title" src="'+ _img +'" />' +
								'</div>' +
								'<div class="detail-left2 right-left ">' +
									'<a class="mui-navigate">'+ _title +'</a>' +
									'<div class="detail">工程账号：'+ _account +'</div>' +
									'<div class="detail">工程管理员：'+ _administrator +'</div>' +
									'<div class="detail">工程地址：'+ _address +'</div>' +
									'<div class="detail">工程规模：'+ _scale +'</div>' +
									'<div class="detail">建设单位：'+ _unit +'</div>' +
								'</div>' +
							'</div>' +
							'<div class="nav nav-border"></div>' +
							'<div class="nav nav-background"></div>' +
						'</div>'+
						'</div>';	
			}
			
			init3();
			function init3() {
				var position = new AMap.LngLat(116.397428, 39.90923);
				var position2 = new AMap.LngLat(116.369441, 39.90923);
				// 创建地图实例
				var map = new AMap.Map("container", {
					zoom: 13,
					center: position,
					resizeEnable: true
				});

				// 点标记显示内容，HTML要素字符串
				/*var markerContent = '' +
					'<div class="custom-content-marker">' +
					'   <img class="circle" src="../icon/circle.png">' +
					'</div>';*/
					
				var temp = '<div class="mark-out">' +
						'<div class="mark-one"><img class="circle" src="../icon/circle.png"></div>' +
						'<div class="info" id="info2" onclick="change(this)"  >' +
							'<span>三八河商品住宅项目</span>' +
							'<div class="nav nav-border"></div>' +
							'<div class="nav nav-background"></div>' +
						'</div>' +
					'</div>';	
					
					var temp2 = '<div class="mark-out">' +
						'<div class="mark-one"><img class="circle" src="../icon/circle.png"></div>' +
						'<div class="info" id="info"  onclick="change(this)">' +
							'<span >企业办公楼</span>' +
							'<div class="nav nav-border"></div>' +
							'<div class="nav nav-background"></div>' +
						'</div>' +
					'</div>';
					
					
					
					

				var marker = new AMap.Marker({
					position: position,
					// 将 html 传给 content
					content: temp,
					// 以 icon 的 [center bottom] 为原点
					offset: new AMap.Pixel(-93, -20)
				});

				var marker2 = new AMap.Marker({
					position: position2,
					// 将 html 传给 content
					content: temp2,
					// 以 icon 的 [center bottom] 为原点
					offset: new AMap.Pixel(-13, -200)
				});
				
			

			
			
			
			
	/*		marker2.getContent().bind("click",function(){
				
				alert(1);
});*/
		
			
				
				//点标注的点击事件
            marker2.on('click', function(e){
            	
            	
            	//alert(marker2.getContent());
            	//console.log(marker2);
            	
            	var position = e.target.F.position;
            	var offset = e.target.F.offset;
            	
            	$("#test").remove();
            	map.remove(marker);
            	map.add(marker);
            	
            	map.remove(marker2);
            	
            	var tm = get('../icon/office1.jpg', '企业办公楼', 'Q300218090317', '王自强', '上海市浦东新区', '15000 m2', '上海浦东土地控股有限公司');
            	
            	var temp = new AMap.Marker({
					position: position,
					// 将 html 传给 content
					content: tm,
					// 以 icon 的 [center bottom] 为原点
					offset: offset
				});
            	
            	
            	map.add(temp);
            
            });
            
             marker.on('click', function(e){
             	$("#test").remove();
             	map.remove(marker2);
            	map.add(marker2);
            	
             	
                var position = e.target.F.position;
            	var offset = e.target.F.offset;
            	
            	map.remove(marker);
            	
            	var tm = get('../icon/office2.jpg', '三八河商品住宅项目', 'Q300218090317', '刘明利', '上海市浦东新区', '15000 m2', '上海浦东土地控股有限公司');
            	
            	var temp = new AMap.Marker({
					position: position,
					// 将 html 传给 content
					content: tm,
					// 以 icon 的 [center bottom] 为原点
					offset: offset
				});
            	
            	
            	map.add(temp);
            });
           
           //点击合法marker重定向到parkInfo页面
		/*var _onClick = function(e) {
   			change(e);
   				//window.open("parkInfo.html?id="+this.G.index,"_blank");
   				 
            }*/
           
           //给所有的点标注添加点击事件
    		/*AMap.event.addListener(marker, 'click', _onClick);
    		AMap.event.addListener(marker2, 'click', _onClick);*/
				// 将 markers 添加到地图
				map.add(marker);
				map.add(marker2);
				//设置地图自适应
		        map.setFitView();

			}

			// 清除 marker
			function clearMarker() {

				map.remove(marker);
			}

			////////===============================


			var list = [

				{
					img: 'office1.jpg',
					title: '企业办公楼',
					account: 'Q300218090317',
					administrator: '王自强',
					address: '上海市浦东新区',
					scale: '15000 m2',
					unit: '上海浦东土地控股有限公司'
				},
				{
					img: 'office2.jpg',
					title: '三八河商品住宅项目',
					account: 'Q300218090412',
					administrator: '刘明利',
					address: '上海市浦东新区',
					scale: '65000 m2',
					unit: '上海浦东土地控股有限公司'
				},
				{
					img: 'office3.jpg',
					title: '后勤区',
					account: 'Q300218090501',
					administrator: '郑菲菲',
					address: '上海市浦东新区',
					scale: '3000 m2',
					unit: '上海浦东土地控股有限公司'
				},
				{
					img: 'office4.jpg',
					title: '三八河商品住宅项目企业办公大楼',
					account: 'Q300218090533',
					administrator: '张鹏宇',
					address: '上海市浦东新区',
					scale: '68700 m2',
					unit: '上海浦东土地控股有限公司'
				},

			];

			new Vue({
				el: '#item1',
				data: {
					list: list
				}
			})
