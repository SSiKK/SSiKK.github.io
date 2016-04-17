var YDYW_Welcome = SVG_Imitator.extend({
	init: function (canvas) { // Initialize
		//Attributes
		this.left = null;
		this.top = null;
		this.width = null;
		this.height = null;

		//create an array of images
		this.hipImagesArr = [];

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
		//Have a selectable rect with
		this.floatingWelcome();

	},

	// Welcome State 1: Default
	floatingWelcome : function(){
		var that = this;
		// Make a subcanvas for adding animation.
		// Hand-ripple icon to go to Language screen

		var welcomeText = [ "Welcome", "¡Bienvenido!", "Bienvenue!", "Witamy!", "ようこそ！", "欢迎！", "Välkomna!", "स्वागत है!" ]

		textObjs = welcomeText.map(function(phrase) {
			return new fabric.Text(phrase, {
                    originY: 'center',
                    originX: 'center',
                    left: randomRange(that.left+100, that.left+450),
                    top: randomRange(that.top+50, that.top+900),
                    fontFamily: 'Helvetica',
                    fontSize: 35
                })
		})
		textObjs.forEach(function(tex) { that.canvas.add(tex) })

	},

	// Welcome State 2
	chooseLangauge: function() {
		//Promises with language icons.

	},

	// Welcome State 3
	newUserImageCapture : function(){
		// New user provided with camera and an array of hip images to set his profile picture.

	},

	// Welcome State 3.1 : Alternate
	existingUserProfile : function(){
		/** Existing Users. A text for name, Image display and give users an option to change the profile picture
		 or choosing from the array of hip images. **/
		// Set time interval of 2s and next screen appears

	},

	// Welcome State 4
	handprintScanner : function(){
		// Add feedback after the user places hand! Palm turns green
		// Set time interval of 2s and next screen appears

	},

	setPhonePasscode : function(){
		// To ask user to set the passcode.

	}


});

//http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function randomRange(min, max) {
    return Math.random() * (max - min + 1) + min;
}