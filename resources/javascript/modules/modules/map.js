// Generated by CoffeeScript 1.4.0
(function() {
  var _this = this;

  Project.Modules.map = function(container, data) {
    var createPropertyThumbnail, initCenter, initMap;
    _this.container = container;
    _this.data = data;
    (initMap = function() {
      _this.options = {
        center: new google.maps.LatLng(_this.data.center.latitude, _this.data.center.longitude),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.TERRAIN
      };
      return _this.map = new google.maps.Map(_this.container, _this.options);
    })();
    createPropertyThumbnail = function(thumbnail) {
      var options, parent;
      parent = document.createElement("div");
      $(parent).html("<a href='" + thumbnail.property_url + "'><img width='50' height='50' src='" + thumbnail.image.url + "' alt='" + thumbnail.image.alt + "' /></a>");
      options = {
        content: parent,
        boxClass: "map_info_box",
        disableAutoPan: false,
        enableEventPropagation: false,
        isHidden: false
      };
      return new InfoBox(options);
    };
    (initCenter = function() {
      _this.marker = new google.maps.Marker({
        map: _this.map,
        draggable: false,
        position: new google.maps.LatLng(_this.data.center.latitude, _this.data.center.longitude),
        visible: true
      });
      _this.centerBox = createPropertyThumbnail(_this.data.thumbnail);
      return _this.centerBox.open(_this.map, _this.marker);
    })();
    return {
      createPropertyThumbnail: createPropertyThumbnail,
      map: map
    };
  };

}).call(this);
