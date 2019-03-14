var page = 0;
var markers = [];
var positions = [
    []
];
var driving;
var map = null;
$(document).ready(function () {
    map = new AMap.Map('map', {
        resizeEnable: true,
        zoom: 13,
        center: [116.449917,39.939481]
    });
    driving = new AMap.Driving({
        map: map,
        panel: "panel"
    });
    getData();

});

function get_ticket() {
    layer.open({
content: '<h4>酒仙桥北路 —— 后鼓楼苑胡同</h4>'
+'<img id="image"   width="30%" height="30%"'+
' src="qrcode.jpg">'+
' <h4>乘车时间：15:00 —— 16:20</h4>'+
' <h4>乘车里程：22.70公里</h4>'+

'<h4>扫码上车检票</h4>'+
'<button type="button"  style="width:80%"class="btn btn-default btn-lg"><span class="glyphicon glyphicon-share" aria-hidden="true"></span>分享</button>'
,skin: 'footer'
});
    // layer.open({
    //     type: 2,
    //     area: ['200px', '200px'],
    //     title: '车票',
    //     fixed: false, //不固定
    //     maxmin: true,
    //     shadeClose: true, //点击遮罩关闭
    //     content: 'qrcode.html'
    // });
}



function getData() {
    positions = [];
    $.get('data/data.txt', function (result) {
        var arr = result.split("\n");
        arr.forEach(function (value, index, arr) {
            var item = value.split(" ");
            positions.push(item);
        });
        removeMarkers();
        add_markers('#00CD00');
    });

};


function get_all_port() {
    positions = [];
    $.get('data/all_port.txt', function (result) {
        var arr = result.split("\n");
        arr.forEach(function (value, index, arr) {
            var item = value.split("\t");
            positions.push(item);
        });
        removeMarkers();
        add_markers('#FF0000');
    });

};


function get_one_port() {
    positions = [];
    $.get('data/one_port.txt', function (result) {
        var arr = result.split("\n");
        arr.forEach(function (value, index, arr) {
            var item = value.split("\t");
            positions.push(item);
        });
        removeMarkers();
        add_markers('#FF0000');
        driving_line();
    });

};

function driving_line() {
    // positions.forEach(value,index){
    //     var lng=value[0],
    //     var lat =value[1]
    // });
    driving.search(new AMap.LngLat(positions[0][0], positions[0][1]), new AMap.LngLat(positions[3][0],
        positions[3][1]), {
        waypoints: [new AMap.LngLat(positions[1][0], positions[1][1]), new AMap.LngLat(positions[2][0],
            positions[2][1])]
    }, function (
        status, result) {});
}



function removeMarkers() {
    map.remove(markers);
}

function add_markers(color) {
    console.log(positions)
    for (var i = 0; i < positions.length; i++) {
        var center = positions[i];
        
        var circleMarker = new AMap.CircleMarker({
            map: map,
            center: center,
            radius: 5, 
            strokeColor: color,
            strokeWeight: 1,
            strokeOpacity: 1,
            fillColor: color,
            fillOpacity: 1,
            zIndex: 10,
            cursor: 'pointer',
            clickable: true
        });
        markers.push(circleMarker);
    }
}
