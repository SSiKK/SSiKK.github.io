var YDYW_Weather = SVG_Imitator.extend({
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
		// Draw
		console.log ("being drawn!", this);
		var innerRef = this;

		this.weatherBox = new fabric.Rect({
	  		originX: 'center',
			originY: 'center',
	  		left: this.left,
	  		top: this.top,
	  		width: this.width,
	  		height: this.height,
	  		fill: 'white',
	  		opacity: 1.0,
			hasControls: false,
			hasBorders: false,
			lockMovementX: true,
			lockMovementY: true
		}).on('selected', function(options) {
			console.log("Weather Display Box!", this);
        	innerRef.displayWeather();
        });

	},

	displayWeather: function() {
		var xmlhttp = new XMLHttpRequest();
		var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
		xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        	var myArr = JSON.parse(xmlhttp.responseText);
        	console.log(myArr.query.channel.item.forecast[0]);

        }
       };
       	xmlhttp.open("GET", url, true);
	    xmlhttp.send();
	},

	displayTime: function() {

	},

	displayDate: function() {

	}






});