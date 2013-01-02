do Project.Pages.Listing = () ->

	elements = [$('#navigation_left'), $('#navigation_top'), $('#logo'), $('#search'), $('#header'), $('#content')]

	topBumpbox = Project.Pages.Bumpbox elements

	fade = topBumpbox.fade

	bumpboxes = pageData.listing_bumpboxes #this is the list of elements

	# map individual modules to the proper objects
	bumpboxDependencies = 

		listing_inquire: Project.Modules.inquire_controller

	do listingBumpboxes = () ->

		# create the dom elements and cache them
		# create the show / hide master listeners
		# for each of the elements, require the proper functions etc
		listeners = {} #the listeners -- cached so we can optimize
		containers = {}	#the actual containers that hold the content	
		modules = {} #responsible for showing the elements and not showing them
		contentModules = {} #the magic behind what happens in the bumpboxes

		# notes, we send modules a reset element from contentModules ... that way we can easily map these together
		for bumpbox in bumpboxes
			 listeners[bumpbox] = $("#navigation_left li[data-link=\"#{bumpbox}\"]")
			 containers[bumpbox] = $(".bumpbox.#{bumpbox}")

			 # initialize the bumpbox popup controller
			 modules[bumpbox] = new Project.Modules.bumpbox listeners[bumpbox], containers[bumpbox]
			 modules[bumpbox]['config']['in_callback'] = fade.fadeOut
			 modules[bumpbox]['config']['out_callback'] = fade.fadeIn

			 # initialize the bumpbox content controller -- this is what controls what happens inside!
			 # create a map?
			 if bumpboxDependencies[bumpbox]
			 	modules[bumpbox] = new bumpboxDependencies[bumpbox] listeners[bumpbox], containers[bumpbox]


		#special cases for bumpboxes here!
		if "listing_inquire" in bumpboxes
			inquireAnimation = new Project.Modules.form_animation containers["listing_inquire"]

		# development work
		listeners['listing_map'].trigger "click"
	
	do listingSlideshow = () ->

		containers = 
			thumbnails : $("#slideshow > div.thumbnails")
			slideshow : $("#slideshow > div.content")

		# want an 
		image_template = (image) ->

			return "<div data-id='#{image.id}'>\n\t<img src='#{image.url}' alt='#{image.alt}' />\n</div>"

		# initialize the images 
		Project.Modules.Slideshow_loader pageData.slideshow_images[1..], containers.slideshow, image_template
		Project.Modules.Slideshow_loader pageData.slideshow_thumbnail_images[1..], containers.thumbnails, image_template

		# initialize slideshow controller!
		controller = new Project.Modules.thumbnail_controller containers.thumbnails, containers.slideshow











