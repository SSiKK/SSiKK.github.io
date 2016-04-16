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
			localStorage['krba'] = JSON.stringify(that.subCanvas)
            that.canvas.deactivateAll();
            that.canvas.renderAll();
		});


		this.subCanvas
			.on("mouse:down", function() {
				that.cancelButton.clicked = 0;
			})

		this.cancelButton = new fabric.Group([
			new fabric.Rect({
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
			}),
			new fabric.Text('default', {
				text: 'Cancel',
                originY: 'center',
                originX: 'center',
		  		left: this.left+100,
		  		top: this.top+340,
                fontFamily: 'Helvetica',
                fontSize: 40
            })
            ],{
			visible: true,
	  		left: this.left,
	  		top: this.top+310,
	  		clicked: 0
		})
		.on('selected', function() {
			this.clicked++
			console.log(this.clicked);
			if (this.clicked > 1) {
				console.log("KILL IT WITH FIRE!!!");
			}
			that.subCanvas.clear();
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