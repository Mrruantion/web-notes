https://blog.csdn.net/li420248878/article/details/79120604

program key and ..
wx4228e86109c23a4c
cdccf4f9d84d7eb5ae721e6d498626d3


nginx -t //检测nginx是否配置正确


<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
    body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
    </style>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
    <title>折线上添加方向箭头</title>
</head>
<body>
    <div id="allmap"></div>
</body>
</html>
<script type="text/javascript">
    // 百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
    scale: 0.6,//图标缩放大小
    strokeColor:'#fff',//设置矢量图标的线填充颜色
    strokeWeight: '2',//设置线宽
});
var icons = new BMap.IconSequence(sy, '10', '30');
// 创建polyline对象
var pois = [
	new BMap.Point(116.350658,39.938285),
	new BMap.Point(116.386446,39.939281),
	new BMap.Point(116.389034,39.913828),
	new BMap.Point(116.442501,39.914603)
];

  
  
  
  
var val = [{  
        'speed':20,  
        'dtLongitude':'116.387112',  
        'dtLatitude':'39.920977'  
    },{  
        'speed':50,  
        'dtLongitude':'116.385243',  
        'dtLatitude':'39.913063'  
    },  
        {  
            'speed':100,  
            'dtLongitude':'116.394226',  
            'dtLatitude':'39.917988'  
        },{  
            'speed':80,  
            'dtLongitude':'116.401772',  
            'dtLatitude':'39.921364'  
        }]  
var arrPois = [];  
var lineColor="";  
//将后台读取到的GPS点信息，全部存储为百度的BMap.Point坐标点对象并用数组装起来  
//循环遍历数组  
for(var i=0;i<val.length-1;i++){  
    arrPois.splice(0,arrPois.length);//清空数组,如若不清空，会在原来基础上每次在重复的增加一边。这儿是让每两个点画线，否则第二次进来的时候就成四个数据了，第二个重复了一次  
    arrPois.push(new BMap.Point(val[i].dtLongitude,val[i].dtLatitude));  
    arrPois.push(new BMap.Point(val[i+1].dtLongitude,val[i+1].dtLatitude));  
    //区间颜色  
    if(val[i].speed<30){  
        lineColor="yellow";  
    }else if(val[i].speed>30&&val[i].speed<60){  
        lineColor="green";  
    }else if(val[i].speed>60&&val[i].speed<90){  
        lineColor="black";  
    }else {  
        lineColor="red";  
    }  
 	  var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
    scale: 0.6,//图标缩放大小
    strokeColor:'#fff',//设置矢量图标的线填充颜色
    strokeWeight: '2',//设置线宽
});
var icons = new BMap.IconSequence(sy, '10', '50',false);
    //创建线路  
    var polyline = new BMap.Polyline(arrPois,//所有的GPS坐标点  
            {  
                strokeColor : lineColor, //线路颜色  
                 icons:[icons],
                 strokeWeight:'8',//折线的宽度，以像素为单位
                 strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
   
			});  
    //绘制线路  
    map.addOverlay(polyline);  
              }      
  
  
</script>