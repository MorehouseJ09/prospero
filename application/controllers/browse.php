<?php

class Browse extends Page_Controller{
	
	function __construct(){


		// VALID IDS--Corresponds to the type_category which is retail/residential/office/industrial etc
		$this->valid_ids = array('retail', 'residential', 'office_industrial');

		// initialize global variables
		$this->page_type = 'property';
		$this->id = 'property';
		$this->page_filter = $this->valid_ids['2'];

		// call our parent construct etc
		parent::__construct();
		
		// load up any needed codeigniter specific libraries that are not already auto initialized
		$this->load->library('session');
	}
	
	// FUNCTION REMAP IS TO MAKE SURE THAT WE NEVER LAND ON A 404!
	public function _remap($id, $uri){
		
		$post = $this->input->post();

		// validate for the rest api segment of this
		if ($post && array_key_exists("data", $post)) {

			echo "REST API FUNCTIONALITY NOT COMPLETED YET";
		}

		// validate for a search page
		else if ($id === "search" && $post && array_key_exists("search", $post)) {

			$this->id = "search";
			$this->output();
		}
		
		// just a user browsing!
		else {
		// First need to make sure that a valid id is chosen
			if(!in_array($id, $this->valid_ids))
				$this->redirect();
		
			// 	Basic parameters
			$this->id = $id;//id corresponds to type_category
			$this->category = 'all';//category corresponds to the second uri, such as rent_price/location_category/type etc
			$this->category_filter = 'all';//category_filter corresponds to how we want to category_filter properties ie: a certain location_category, a price range etc
		
			// Determine if category/category_filter is passed
			if(isset($uri[0]) && strlen($uri[0]) > 0)
				$this->category = $uri[0];
			if(isset($uri[1]) && strlen($uri[1]) > 0)
				$this->category_filter = $uri[1];

			// Output/Redirection
			$this->output();
		}
	}
	
	private function redirect(){
		// Redirect to the property/office_industrial in case of an error. 
		redirect('browse/office_industrial');//default re-route
	}
	
	private function output(){
					
		// initialize our output
		$this->base();
		$this->header = $this->dynamic_header->get_header();

		// initialize our generic elements for the browse page
		$libraries =  array("property/base_filter", "property/map_api");
		$this->load->library($libraries, array('page_id' => $this->page_type, "page_filter" => $this->id));

		// grab our thumbnails
		$this->thumbnails = $this->get_thumbnails();//seperate the logic out into another method for grabbing the proper thumbnail!

		// grab all of the resulting property_ids from the thumbnail elements
		if (gettype($this->thumbnails) == "array") {

			// initialize results and save them in the session
			$this->results = array_map(function($thumbnail) { return $thumbnail["property_id"];}, $this->thumbnails);
			
			// we need to cache our results in a session for future requests
			$this->session->set_userdata(array('results' => $this->results));
		}

		// this is the box in the middle of the screen the user sees
		$this->site_label = $this->elements->site_label();
		$this->thumbnail_label = ($this->id === "search") ? ($this->headers->search_header()) : ($this->headers->browse_header($this->id, $this->category, $this->category_filter));

		// FINAL OUTPUT
		$this->load->view('browse/browse_base');//THIS HANDLES EVERYTHING BASED ON THE $This->ID

	}

	private function rest_search() {

		// validate rest and then return thumbnails etc
		// return json elements here
	}

	private function get_thumbnails() {

		$this->load->library("property/base_filter");//initialize the base filter

		if ($this->id == "search") {

			$this->load->library("property/property_search");

			$properties = $this->property_search->general_search($this->input->post("search"));
		}

		else {

			// load property search classes
			$libraries = array("property/base_filter", "property/property_filter");
			$this->load->library($libraries, array("category" => "type_category", "filter" => $this->id));//initialize the category_filter library for the type of page this is

			$properties = $this->property_filter->filter_properties($this->category, $this->category_filter);
		}

		if (!count($properties))
			return $this->messages->no_listings();

		return $this->base_filter->get_thumbnails($properties);
	}

}
