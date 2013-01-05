// Generated by CoffeeScript 1.4.0
(function() {

  Project.Modules.walkscore_map = function(container, data) {
    var centerInit, mapInit, marker, thumbnailMarker,
      _this = this;
    this.container = container;
    this.data = data;
    (mapInit = function() {
      _this.center = new google.maps.LatLng(_this.data.center.latitude, _this.data.center.longitude);
      _this.options = {
        center: _this.center,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      return _this.map = new google.maps.Map(_this.container, _this.options);
    })();
    thumbnailMarker = function(url, src, marker) {
      var infoBox, options, parent;
      parent = document.createElement("div");
      $(parent).html("<a target='new' href='" + url + "'><img width='50' height='50' src='" + src + "' /></a>");
      options = {
        content: parent,
        boxClass: "map_info_box",
        disableAutoPan: false,
        enableEventPropagation: false,
        isHidden: false
      };
      infoBox = new InfoBox(options);
      infoBox.open(_this.map, marker);
      return infoBox;
    };
    marker = function(coordinates) {
      marker = new google.maps.Marker({
        map: _this.map,
        draggable: false,
        visible: true,
        position: new google.maps.LatLng(coordinates.latitude, coordinates.longitude)
      });
      return marker;
    };
    (centerInit = function() {
      var markerBox;
      return markerBox = thumbnailMarker(_this.data.thumbnail.property_url, _this.data.thumbnail.image.url, marker(_this.data.center));
    })();
    return {
      center: this.center,
      map: this.map,
      thumbnailMarker: thumbnailMarker
    };
  };

}).call(this);
