<?php

class Admin{
	
	var $CI;
	
	function Admin(){
		
		$this->CI =& get_instance();
		$models = array('user_information', 'general');
		$this->CI->load->model($models);
		$libraries = array('session', 'utilities/format');
		$this->CI->load->library($libraries);
	}
	
	// THIS WILL BE Called from the create_property_listing
	public function add_admin($property_id){
		
		$username = $this->CI->session->userdata('username');
		$user_id = $this->CI->general->get('user_information', array('username' => $username))->row()->user_id;
		$this->CI->general->insert('property_management', array('property_id' => $property_id, 'user_id' => $user_id));
	
	}

	public function property_list($username){
		
		$user_query = $this->CI->general->get('user_information', array('username' => $username));
		$user_id = $user_query->row()->user_id;
		$rights = $user_query->row()->admin_rights;

		if($rights === 'all')
			$property_list = $this->CI->general->get_properties('property_name', false);
		else
			$property_list = $this->CI->general->get_properties('property_management', array('user_id' => $user_id));
		
		
		return $property_list;
	}

	public function admin_rights($username){
		
		return $this->CI->user_information->get_user_information('username', $username, 'admin_rights');
	}


};