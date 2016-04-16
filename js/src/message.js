var YDYW_Message = SVG_Imitator.extend({
	init: function (canvas) { // Initialize
		//Attributes
		this.left = null;
		this.top = null;
		this.height = null;
		this.width = null;

		this.subCanvasOn = true;
		this.subCanvasHTML = null;
		window.subCanvas = this.subCanvas = new fabric.Canvas('subC', { backgroundColor: "#DDDDDD", isDrawingMode: true});

		// Canvas on which the object is created.
		this.canvas = null;

		//Feature specific status flags
		this.inStroke = false;

		//Initially drawing mode is off
		this.isMessageBoxSelected = false;


		if (canvas!==undefined && canvas!== null) {
			this.attachToCanvas(canvas);
			this.configureSubCanvas();
		}
	},

	attachToCanvas: function(canvas) {
		this.canvas = canvas;
	},

	configureSubCanvas: function() {
		this.subCanvasHTML = document.getElementsByClassName('canvas-container')[1];
		this.subCanvasHTML.style.position = "absolute"
		this.subCanvasHTML.style.top = "300px"
		this.subCanvasHTML.style.left = "100px"
	},

	display: function() {
		if (this.subCanvasOn)
			this.subCanvasHTML.style.display = "none";
		else
			this.subCanvasHTML.style.display = 'block';

		this.subCanvasOn = !this.subCanvasOn;
	},


	// This function should draw the box and any message that has been written inside
	draw: function () {
		// The trick behind subclass reference!
		var that = this;

		this.sendButton = new fabric.Rect({
	  		originX: 'center',
			originY: 'center',
	  		left: this.left-90,
	  		top: this.top+335,
	  		width: this.width * 0.5,
	  		height: this.height * .25,
	  		fill: 'red',
			hasControls: false,
			hasBorders: false,
			lockMovementX: true,
			lockMovementY: true
		})
		.on('selected', function() {
			console.log('red cube');
            that.canvas.deactivateAll();
            that.canvas.renderAll();
		});

		this.cancelButton = new fabric.Rect({
	  		originX: 'center',
			originY: 'center',
	  		left: this.left+100,
	  		top: this.top+335,
	  		width: this.width * 0.5,
	  		height: this.height * .25,
	  		fill: 'green',
			hasControls: false,
			hasBorders: false,
			lockMovementX: true,
			lockMovementY: true
		})
		.on('selected', function() {
			console.log('green cube');
            that.canvas.deactivateAll();
            that.canvas.renderAll();
		});


		//TODO draw the list of strokes that are saved

		//add to canvas
		this.canvas.add(this.sendButton);
		this.canvas.add(this.cancelButton);

		console.log ("being drawn!", this.sendButton);

	},

	sendMessage: function(){
		// Sends the message on the inside of the door

	},

	cancelMessage: function(){
		//
	}
});