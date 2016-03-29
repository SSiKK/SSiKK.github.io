var YDYW_DoorKnob = SVG_Imitator.extend({
	init: function (canvas) { // Initialize 
		//Attributes
		this.cx = null;
		this.cy = null;
		this.radius = null;
		

		// Canvas on which the object is created.
		this.canvas = null;

		//Feature specific status flags
		this.locked = false;

		if (canvas!==undefined && canvas!== null) {
			this.attachToCanvas(canvas);
		}
	},
	attachToCanvas: function(canvas) {
		this.canvas = canvas;
	},
	
	draw: function () {
		// Draw
		console.log ("being drawn!", this);
	},

	toggleLockedStatusAndShow: function() {
		//TODO: change the flag, depending on the flag set color animation to the outer ring

	}


});