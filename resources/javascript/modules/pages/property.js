// Generated by CoffeeScript 1.4.0
(function() {

  (Project.Pages.Property = function() {
    var elements, search_bar_animation;
    elements = [$('#navigation_browse'), $('#navigation_top'), $('#logo'), $('#search'), $('#header')];
    Project.Pages.Bumpbox(elements);
    return search_bar_animation = new Project.Modules.form_animation($('#search'));
  })();

}).call(this);
