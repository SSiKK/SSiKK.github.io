var YDYW_Emergency = SVG_Imitator.extend({
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
		this.emergencyScreen = new fabric.Rect({
            angle: 0, 
            left: this.left, 
            top: this.top,
            width: this.width,
            height: this.height,
            originX: 'center',
            originY: 'center',
            fill: '#ff9999',
            selectable: true,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true
        })

        this.canvas.add(this.emergencyScreen);
        this.canvas.deactivateAll();
        this.canvas.renderAll(); 

	},

	emergencyModeOn : function(){

	}


});
