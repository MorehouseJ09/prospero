<?php
/*
	This class is responsible for generating all of the content to be displayed for the property pages 
	This class generates the content, header etc for each object
*/
class Listing_content extends Listing_base{

	// get categories from category_type, type, and general!
	function __construct($parameters) {

		parent::__construct($parameters);
		
		$this->banned_categories = $this->CI->general->non_global_categories();//return the non-global categories that should not be in the main list

		$this->init();//initialize the list!
	}

	// public content
	public function elements() {

		return $this->elements;
	}	

	public function content() {

		$content = array(

				"name" => $this->CI->general->get_category($this->property_id, "name"),
				"header" => $this->CI->general->get_category_title("property_content"),
				"content" => $this->CI->general->get_category($this->property_id, "property_content"),
			);

		return $content;
	}

	public function header() {

		return $this->CI->general->get_category($this->property_id, "name");
	}

	// initialize the entire element
	private function init() {

		$type_category = $this->CI->general->get_category($this->property_id, "type_category");
		$type = $this->CI->general->get_category($this->property_id, "type");

		$this->elements = array();//holds all elements and types!

		foreach (array("general", $type, $type_category, "other") as $category_type) {

			// grab the category type content and then add the elemnets to the list if there are more than one element
			$_category_type = $this->get_category_type($category_type);
			if (count($_category_type['elements']) > 0)
				array_push($this->elements, $this->get_category_type($category_type));//
		}		
	}

	// return an entire category_type
	private function get_category_type($category_type) {//used for individually setting the general, tyep and category_type array of header and then element => value mappings

		$categories = $this->CI->general->get_category_type_categories($category_type);
		$header = $this->CI->general->get_category_type_header($category_type);

		$elements = $this->helper($categories, $category_type);
		return array("header" => $header, "elements" => $elements);
		
	}

	// generate the list of elements. Pass category type to help clean up in case we need to grab a title
	private function helper($category_list, $category_type) {

		$content = array();

		foreach ($category_list as $category) {

			if (in_array($category, $this->banned_categories)) continue;//check if the elements should be in the list of master elements

			$value = $this->CI->general->get_category($this->property_id, $category);//generate the value
			$title = $this->CI->general->get_category_title($category, $category_type);//maps the category title to clean it up

			if (!$value) continue;//only add in legitimate values

			array_push($content, array("title" => $title, "value" => $value));
		}

		return $content;
	}
};

