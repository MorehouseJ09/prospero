<div class='bumpbox services'>

	<div class='content'>

		<?php
			foreach ($this->services_bumpbox as $index=>$service)
				echo "<div data-id='${index}'><h1>${service['title']}</h1>${service['content']}</div>\n";
		?>
	</div>

	<div class='thumbnails'>
		<ul>
			<?php
				foreach ($this->services_bumpbox as $index=>$service)
					echo "<li data-id='${index}'>${service['title']}</li>";
			?>
		</ul>
	</div>

</div>