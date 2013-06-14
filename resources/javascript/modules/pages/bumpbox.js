// Generated by CoffeeScript 1.6.3
(function() {
  var _this = this;

  Project.Pages.Bumpbox = function(elements) {
    var animationTime, fade, fadedOpacity, init;
    animationTime = 1000;
    fadedOpacity = 0.3;
    fade = {
      fadeIn: function() {
        return elements.map(function(element) {
          var css;
          css = {
            opacity: 1.0
          };
          return element.animate(css, animationTime);
        });
      },
      fadeOut: function() {
        return elements.map(function(element) {
          var css;
          css = {
            opacity: fadedOpacity
          };
          return element.animate(css, animationTime);
        });
      }
    };
    (init = function() {
      var controller, controllers, key, modules, setConfig;
      controllers = {
        map: new Project.Modules.bumpbox($('#navigation_top li[data-link="map"]'), $('.bumpbox.map')),
        contact: new Project.Modules.bumpbox($('#navigation_top li[data-link="contact"]'), $('.bumpbox.contact'))
      };
      modules = {
        map: new Project.Modules.thumbnail_controller($('.bumpbox.map > .thumbnails ul'), $('.bumpbox.map > .content'), "all"),
        map_controller: new Project.Modules.general_maps($('.bumpbox.map > .thumbnails ul'), $('.bumpbox.map > .content')),
        contact: new Project.Modules.contact($('.bumpbox.contact').children("div:nth-child(2)"), site_url + "general_rest/submit_email"),
        contact_animation: new Project.Modules.form_animation($('.bumpbox.contact'))
      };
      setConfig = (function() {
        var _results;
        _results = [];
        for (key in controllers) {
          controller = controllers[key];
          controller["config"]["in_callback"] = fade.fadeOut;
          _results.push(controller["config"]["out_callback"] = fade.fadeIn);
        }
        return _results;
      })();
      controllers.map.config.in_callback = function() {
        fade.fadeOut();
        modules.map.reset();
        return modules.map_controller.changeTrigger("all");
      };
      controllers.map.config.out_callback = function() {
        fade.fadeIn();
        modules.map.reset();
        return modules.map_controller.changeTrigger("all");
      };
      return modules.map.config.change_trigger = modules.map_controller.changeTrigger;
    })();
    return {
      fade: fade
    };
  };

}).call(this);
