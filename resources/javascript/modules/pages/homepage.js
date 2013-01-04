Project.Pages.Homepage = (function() {

	// elements
	var elements = [$('#navigation_left'), $('#navigation_top'), $('#logo'), $('#homepage_blurb'), $('#search')];
	var bumpbox = Project.Pages.Bumpbox(elements);//initialize the bumpbox
	var fade = bumpbox.fade;

	// BUMPBOX INIT
	var bumpbox_init = (function() {

		var bumpbox_controllers = {

			"about" : new Project.Modules.bumpbox($('#navigation_left li.about'), $('.bumpbox.about')),
			"team" : new Project.Modules.bumpbox($('#navigation_left li.team'), $('.bumpbox.team')),
			"services" : new Project.Modules.bumpbox($('#navigation_left li.services'), $('.bumpbox.services'))
		};

		var bumpbox_modules = {


			"team" : new Project.Modules.thumbnail_controller($('.bumpbox.team > .thumbnails'), $('.bumpbox.team > .content'), 0),//will create a pause function later -- this can be embedded in a different element
			"services" : new Project.Modules.thumbnail_controller($('.bumpbox.services > .thumbnails ul'), $('.bumpbox.services > .content'), 0),//will create a pause function later -- this can be embedded in a different element
			"about" : new Project.Modules.thumbnail_controller($('.bumpbox.about > .thumbnails ul'), $('.bumpbox.about > .content'), 0),//will create a pause function later -- this can be embedded in a different element

		}; 

		// set the reset on each member here
		// for (var controller in bumpbox_controllers) {
		// 	(function() {

		// 		bumpbox_controllers[controller]["config"]["in_callback"] = function() {

		// 			fade.fadeOut();
		// 			bumpbox_modules[controller]["change_trigger"]("0");

		// 		};

		// 		bumpbox_controllers[controller]["config"]["out_callback"] = function() {

		// 			fade.fadeIn();
		// 			bumpbox_modules[controller]["change_trigger"]("0");

		// 		};





		// 	}(controller));
		// }//end loop


		}());//end of homepage initialization section
	//END OF BUMPBOX CONTROLLERS!
	
	var global_animation = (function() {

		var search_bar_animation = new Project.Modules.form_animation($('#search'));

	}());

}());