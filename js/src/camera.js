var YDYW_Camera = SVG_Imitator.extend({
	init: function (canvas) { // Initialize
		//Attributes
		this.left = null;
		this.top = null;
		this.width = null;
		this.height = null;

		// Canvas on which the object is created.
		this.canvas = null;

		this.viewport = null; // The viewing window, should be a rect


		//Feature specific status flags
		this.on = false;
		this.fullScreenMode = false;


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
		this.viewport = new fabric.Rect({
			originX: 'center',
			originY: 'center',
			fill: 'rgb(255,255,255,1.0)',

		});
	}

});
