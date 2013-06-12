// Generated by CoffeeScript 1.6.3
/*
	Initialize a temporary bumpbox listener that will pop up a bigger box that the image can be displayed in etc
*/


(function() {
  Project.Pages.ListingImage = function(listener, bumpbox, fade) {
    var animationDuration, currentUrl, exit, hide, image, images, length, next, prev, show;
    images = pageData.slideshow_images;
    image = bumpbox.find(".content > img");
    currentUrl = images["0"].url;
    next = bumpbox.find(".next");
    prev = bumpbox.find(".prev");
    exit = bumpbox.find(".exit");
    length = images.length;
    animationDuration = 200;
    hide = function() {
      bumpbox.fadeOut(animationDuration);
      return fade.fadeOut();
    };
    show = function() {
      currentUrl = listener.find("div:visible > img").attr("src");
      image.attr("src", currentUrl);
      bumpbox.fadeIn(animationDuration);
      return fade.fadeIn();
    };
    exit.click(function() {
      return hide();
    });
    listener.click(function() {
      return show();
    });
    next.click(function() {
      var id, key, object;
      for (key in images) {
        object = images[key];
        if (object.url === currentUrl) {
          id = parseInt(key);
        }
      }
      next = id < length - 1 ? id + 1 : 0;
      currentUrl = images["" + next].url;
      return image.attr("src", currentUrl);
    });
    return prev.click(function() {
      var id, key, object;
      for (key in images) {
        object = images[key];
        if (object.url === currentUrl) {
          id = parseInt(key);
        }
      }
      prev = id === 0 ? length - 1 : id - 1;
      currentUrl = images["" + prev].url;
      return image.attr("src", currentUrl);
    });
  };

}).call(this);
