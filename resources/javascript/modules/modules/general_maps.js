// Generated by CoffeeScript 1.6.3
(function() {
  var _this = this;

  Project.Modules.general_maps = function(thumbnails, container) {
    var changeTrigger, data, mapInit, maps, thumbnailMarker;
    _this.thumbnails = thumbnails;
    data = pageData.general_maps;
    maps = {};
    thumbnailMarker = function(thumbnail) {
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
    mapInit = function(id) {
      var map, marker, options, property, _container, _data, _i, _len, _ref;
      _data = data[id];
      _container = container.find("div[data-id='" + id + "'] > div").get(0);
      options = {
        center: new google.maps.LatLng(_data.center.latitude, _data.center.longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(_container, options);
      _ref = _data.properties;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        property = _ref[_i];
        marker = new google.maps.Marker({
          map: map,
          draggable: false,
          visible: true,
          position: new google.maps.LatLng(property.coordinates.latitude, property.coordinates.longitude)
        });
      }
      return true;
    };
    changeTrigger = function(id) {
      var callback;
      if (!maps[id]) {
        callback = function() {
          return maps[id] = mapInit(id);
        };
        return setTimeout(callback, 500);
      }
    };
    return {
      changeTrigger: changeTrigger
    };
  };

}).call(this);
