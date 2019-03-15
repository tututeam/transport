

$('#start').datetimepicker();
$('#end').datetimepicker();
var autoOptions = {
        input: "tipinput_up",
    };
    var autoOptions_down = {
        input: "tipinput_down",
    };
    var auto = new AMap.Autocomplete(autoOptions);
    var auto_down = new AMap.Autocomplete(autoOptions_down);

    var placeSearch = new AMap.PlaceSearch({});

    AMap.event.addListener(auto, "select", select);
    AMap.event.addListener(auto_down, "select", select);

    function select(e) {
        placeSearch.search(e.poi.name);
    }