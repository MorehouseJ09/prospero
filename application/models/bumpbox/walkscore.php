<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 


class Walkscore extends CI_Model {


	function __construct() {

		$models = array("general", "property/geographical_information", "pages/thumbnail", "pages/elements");
		
		$this->load->model($models);
	}

	public function walkscore($property_id) {

		return array(

			"center" => $this->geographical_information->get_coordinates($property_id),//center of property = center of map!
			"triangle" => $this->geographical_information->get_triangle($property_id),//not currently available, implement later?
			"boundary" => $this->general->config("places_bounds"),//how far out we can look in each direction
			"walkscore_logo" => $this->elements->get_image("walkscore_logo"),
			"walkscore" => $this->general->get_category($property_id, "walkscore"),
			"thumbnail" => $this->thumbnail->general_thumbnail($property_id),
			"api_key" => $this->general->config("google_maps_api_key"),//
			"types" => $this->get_places_types()
		);
		// get walkscore image
		// get center
		// get walkscore value
		// get walking triangle
		// -- will then build in the places to find points in the area
	}

	private function get_places_types() {

		$types = array();
		$query = $this->db->get("places_types");

		foreach ($query->result() as $row)
			array_push($types, array("name" => $row->name, "value" => $row->value));

		return $types;		
	}



} 
	