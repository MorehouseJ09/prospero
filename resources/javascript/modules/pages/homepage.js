Project.Pages.Homepage = (function() {

	// elements
	var elements = [$('#navigation_left'), $('#navigation_top'), $('#logo'), $('#homepage_blurb'), $('#search'), $('#current_member'), $('#member_thumbnails')];
	var bumpbox = Project.Pages.Bumpbox(elements);//initialize the bumpbox
	var fade = bumpbox.fade;

	// BUMPBOX INIT
	var bumpbox_init = (function() {

		var bumpbox_controllers = {

			"about" : new Project.Modules.bumpbox($('#navigation_top li.about'), $('.bumpbox.about')),
		};

		var bumpbox_modules = {


			"about" : new Project.Modules.thumbnail_controller($('.bumpbox.about > .thumbnails > ul'), $('.bumpbox.about > .content'), 0),//will create a pause function later -- this can be embedded in a different element
		}; 

		for (controller in bumpbox_controllers) 
			(function(controller) {

				bumpbox_controllers[controller]['config']['in_callback'] = fade.fadeOut;
				bumpbox_controllers[controller]['config']['out_callback'] = fade.fadeIn;

			}(controller));
	}());//end of homepage initialization section
	//END OF BUMPBOX CONTROLLERS!

	// initialize the global animations
	var global_animation = (function() {

		var search_bar_animation = new Project.Modules.form_animation($('#search'));

	}());

	// initialize the homepage gallery -- not needed on any other pages
	var homepage_gallery = new Project.Pages.Site_wide();

}());
