var YDYW_Message = SVG_Imitator.extend({
	init: function (canvas) { // Initialize 
		//Attributes
		//this.left = null;
		//this.top = null;
		this.cx = null;
		this.cy = null;
		this.height = null;
		this.width = null;

		this.subCanvasOn = false;
		this.subCanvasHTML = null;
		this.subCanvas = null;
		// Canvas on which the object is created.
		this.canvas = null;

		//Feature specific status flags
		this.inStroke = false;

		//Initially drawing mode is off
		this.isMessageBoxSelected = false;

		if (canvas!==undefined && canvas!== null) {
			this.attachToCanvas(canvas);
		}
	},
	
	attachToCanvas: function(canvas) {
		this.canvas = canvas;
	},

	display: function() {
		if (this.subCanvasOn)
			this.subCanvasHTML.style = "none";
		else
			this.subCanvasHTML.style = 'block';
		this.subCanvasOn = !this.subCanvasOn;
	},

	draw: function () {

		this.subCanvasHTML = document.getElementById('subC');
		this.subCanvas = new fabric.Canvas('subC');
		// This function should draw the box and any message that has been written inside
		//TODO draw rect

		// The trick behind subclass reference!
		var innerRef = this;

		this.messageBox = new fabric.Rect({
	  		originX: 'center',
			originY: 'center',
	  		left: this.cx,
	  		top: this.cy,
	  		width: this.width,
	  		height: this.height,
	  		fill: 'green',
	  		opacity: 1.0,
			hasControls: false,
			hasBorders: false,
			lockMovementX: true,
			lockMovementY: true,
			name: 'messageBitch'
			//isDrawingMode : true
		}).on('selected', function(options) {
			console.log("selected!", this);
        	innerRef.writeMessage();
        });
        window.message = this.messageBox; 
        console.log(this.messageBox); 
		// this.sendButton = new fabric.Rect({
	 //  		originX: 'center',
		// 	originY: 'center',
	 //  		left: this.cx,
	 //  		top: this.cy,
	 //  		width: this.width,
	 //  		height: this.height,
	 //  		fill: 'red',
	 //  		opacity: 0.0,
		// 	hasControls: false,
		// 	hasBorders: false,
		// 	selectable: false,
		// 	lockMovementX: true,
		// 	lockMovementY: true
		// });

		// this.cancelButton = new fabric.Rect({
	 //  		originX: 'center',
		// 	originY: 'center',
	 //  		left: this.cx,
	 //  		top: this.cy,
	 //  		width: this.width,
	 //  		height: this.height,
	 //  		fill: 'red', 
	 //  		opacity: 0.0, 
		// 	hasControls: false, 
		// 	hasBorders: false, 
		// 	selectable: false, 
		// 	lockMovementX: true, 
		// 	lockMovementY: true 
		// }); 


		//TODO draw the list of strokes that are saved 

		//add to canvas
		this.canvas.add(this.messageBox);
		// this.messageBox.bringToFront(); 
		//this.canvas.add(this.sendButton); 
		//this.canvas.add(this.cancelButton); 

		console.log ("being drawn!", this); 
 
		//this.messageBox.on('selected' , function(options){ 
    	//	this.writeMessage(); 
		//}); 
	}, 

	bringToFrontNow:function(){
		this.messageBox.bringToFront();
	},
	strokeBegin: function(position) { 
		//position will have x and y values 
		//This function will be called when left mouse button is pressed down 
		this.inStroke = true; 
 
		//TODO start recording the stroke 
	}, 

// We are creating an onclick() function instead of strokeBegin and strokeEnd ! 
	writeMessage: function(position){ 
		// Write a message by left clicking on the mouse  button 
		console.log("Ready to draw"); 
		var canHeight = this.canvas.getHeight() 
		var canWidth = this.canvas.getWidth() 
			
		this.canvas.on('mouse:down', function(e){ 
 			getMouse(e); 
		}); 
 
		function getMouse(e){ 
  			console.log(e.e.clientX + " " + e.e.clientY); 
			this.mouseX = e.e.clientX; 
			this.mouseY = e.e.clientY; 

			if(mouseX >= (canWidth/4 - 150) && mouseX <= (canWidth/4 + 150) && mouseY >= (canHeight/2 - 100) && mouseY <= (canHeight/2 + 100))
			{ 
				this.canvas.isDrawingMode = true; 
			} 
			else 
			{ 
				this.canvas.isDrawingMode = false; 
		
			} 
		} 
	}, 

	sendMessage: function(position){
		// Sends the message on the inside of the door

	},

	cancelMessage: function(position){
		// 
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