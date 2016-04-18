var YDYW_Security = SVG_Imitator.extend({
	init: function (canvas) { // Initialize 
		//Attributes
		this.left = null;
		this.top = null;
		this.width = null;
		this.height = null;

		// Canvas on which the object is created.
		this.canvas = null;

		//Feature specific status flags
		this.on = false;
		if (canvas!==undefined && canvas!== null) {
			this.attachToCanvas(canvas);
		}
	},
	attachToCanvas: function(canvas) {
		this.canvas = canvas;
	},
	
	draw: function () {
		// Draw a Rect and have all the UI elements in it. 


	},

	alertModeOn : function (){

	},

	emergencyModeOn : function(){

	}

	// initMap : function() {
	// 	//Promises with language icons.
	// 	console.log("Inside init");
	// 	var map;
	// 	var that = this;
 //        map = new google.maps.Map(that.mapBox.getActiveObject()), {
 //          center: {lat: -34.397, lng: 150.644},
 //          zoom: 8
 //        });


});
