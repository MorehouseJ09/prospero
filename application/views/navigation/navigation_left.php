<div id='navigation_left'>
	<li><a href='<?php 
		// THIS IS SO YOU CAN'T RELOAD THE HOMEPAGE FROM THE HOMEPAGE!!!--THATS ANNOYING
			if(strtolower($this->id)=='homepage')
				echo '#';
			else
				echo site_url();
		?>'>Home</a></li>
	<li class='about'>About</li>
	<li class='team'>Team</li>
	<li class='services'>Team</li>
	<li class='careers'>Careers</li>
</div>

<?php
	$this->load->view('navigation/bumpboxes/about');
	$this->load->view('navigation/bumpboxes/team');
	$this->load->view('navigation/bumpboxes/careers');
?>