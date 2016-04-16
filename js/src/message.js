var YDYW_Message = SVG_Imitator.extend({
	init: function (canvas) { // Initialize
		//Attributes
		this.left = null;
		this.top = null;
		this.width = null;
		this.height = null;

		// Canvas on which the object is created.
		this.canvas = null;

		//Feature specific status flags
		this.inStroke = false;


		if (canvas!==undefined && canvas!== null) {
			this.attachToCanvas(canvas);
		}
	},
	attachToCanvas: function(canvas) {
		this.canvas = canvas;
	},

	draw: function () {
		// This function should draw the box and any message that has been written inside
		//TODO draw rect
		//TODO draw the list of strokes that are saved
	},

	strokeBegin: function(position) {
		//position will have x and y values
		//This function will be called when left mouse button is pressed down
		this.inStroke = true;

		//TODO start recording the stroke
	},

	strokeEnd: function(position) {
		//position will have x and y values
		//This function will be called when left mouse button is released
		this.inStroke = false;

		//TODO stop recording the stroke and save it in the list of strokes
	},

	stroke: function(position) {
		//position will have x and y values
		//This function will be called when mouse is dragged with the left mouse button down


		//TODO add the next point to the stroke being recorded
	}
});