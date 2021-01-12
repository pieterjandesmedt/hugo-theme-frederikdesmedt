function checkOrientation() {
	// Announce the new orientation number
	if (window.matchMedia('(orientation: portrait)').matches) {
		document.body.classList.add('portrait');
		document.body.classList.remove('landscape');
		return;
	}
	document.body.classList.add('landscape');
	document.body.classList.remove('portrait');
}

window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.onload = checkOrientation;


class ResponsiveBackgroundImage {

	constructor(element) {
		this.element = element;
		this.img = element.querySelector('img');
		this.src = '';

		this.img.addEventListener('load', () => {
			this.update();
		});

		this.img.addEventListener('DOMAttrModified', function(event) {
			if (event.attrName == 'src') {
			   this.update();
			}
		});

		if (this.img.complete) {
			this.update();
		}
	}

	update() {
		console.log('update');
		let src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;
		if (this.src !== src) {
			this.src = src;
			this.element.style.backgroundImage = 'url("' + this.src + '")';

		}
	}
}

document.querySelectorAll('[data-responsive-background-image]').forEach(function (element) {
	new ResponsiveBackgroundImage(element);
});


document.addEventListener('DOMContentLoaded', function () {

	// Get all "navbar-burger" elements
	var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {

		// Add a click event on each of them
		$navbarBurgers.forEach(function ($el) {
			$el.addEventListener('click', function () {

				// Get the target from the "data-target" attribute
				var target = $el.dataset.target;
				var $target = document.getElementById(target);

				// Toggle the class on both the "navbar-burger" and the "navbar-menu"
				$el.classList.toggle('is-active');
				$target.classList.toggle('is-active');

			});
		});
	}

	// https://github.com/ApoorvSaxena/lozad.js/issues/188
	const images = document.getElementsByClassName('lozad');
	for (const image of images) {
		if (!image.getAttribute('data-background-image')) {
			if (image.complete) {
				image.setAttribute('data-fully-loaded', true);
			} else {
				image.onload = function () {
					this.setAttribute('data-fully-loaded', true);
				};
			}
		}
	}


});

