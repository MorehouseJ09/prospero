// Generated by CoffeeScript 1.4.0
(function() {

  Project.Modules.listing_map_controller = function() {
    var changeTrigger, directionsInit, nearbyPropertiesInit, status, walkscoreInit,
      _this = this;
    status = {
      "walkscore": false,
      "nearby_properties": false,
      "directions": false
    };
    changeTrigger = function(id) {
      if (id === "walkscore" && !status.walkscore) {
        walkscoreInit();
        return status.walkscore = true;
      } else if (id === "directions" && !status.directions) {
        directionsInit();
        return status.directions = true;
      }
    };
    walkscoreInit = function() {
      var animation, data, leftElement, map, mapElement, placesController;
      data = pageData.listing_map.walkscore;
      leftElement = $('.bumpbox.listing_map > div.content > div[data-id="walkscore"] > div:first-child');
      mapElement = $('.bumpbox.listing_map > div.content > div[data-id="walkscore"] > div:nth-child(2)');
      animation = new Project.Modules.form_animation(leftElement.children());
      map = new Project.Modules.walkscore_map(mapElement.get(0), data);
      return placesController = new Project.Modules.places_controller(leftElement, map, data);
    };
    nearbyPropertiesInit = function() {
      var container, data, map;
      data = pageData.listing_map.nearby_properties;
      container = $('.bumpbox.listing_map > div.content > div[data-id="nearby_properties"]');
      return map = new Project.Modules.nearby_properties(container.get(0), data);
    };
    directionsInit = function() {
      var animation, container, controller, data, directions, leftElement, map, mapElement, thumbnailAnimation;
      data = pageData.listing_map.directions;
      leftElement = $('.bumpbox.listing_map > div.content > div[data-id="directions"] > div:first-child');
      container = $('.bumpbox.listing_map > div.content > div[data-id="directions"] > div:nth-child(2)');
      mapElement = container.find("> .content > div[data-id='map']");
      directions = container.find("> .content > div[data-id='directions']");
      animation = new Project.Modules.form_animation(leftElement);
      thumbnailAnimation = new Project.Modules.thumbnail_controller(container.children(".thumbnails").children("ul"), container.children(".content"), "map");
      map = new Project.Modules.map(mapElement.get(0), data);
      return controller = new Project.Modules.listing_directions(leftElement, container, data, map, thumbnailAnimation);
    };
    return {
      changeTrigger: changeTrigger
    };
  };

}).call(this);
