// Generated by CoffeeScript 1.6.3
(function() {
  var _this = this;

  Project.Modules.nearby_properties = function(container, data) {
    _this.container = container;
    _this.data = data;
    _this.map = new Project.Modules.map(_this.container, _this.data);
    _this.map.map.setZoom(13);
    return _this.thumbnails = (function() {
      var box, element, marker, _i, _len, _ref, _results;
      _ref = _this.data.properties;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        marker = new google.maps.Marker({
          map: _this.map.map,
          draggable: false,
          position: new google.maps.LatLng(element.coordinates.latitude, element.coordinates.longitude),
          visible: true
        });
        box = _this.map.createPropertyThumbnail(element.thumbnail);
        _results.push(box.open(_this.map.map, marker));
      }
      return _results;
    })();
  };

}).call(this);
