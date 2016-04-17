var YDYW_Message = SVG_Imitator.extend({
    init: function(canvas) { // Initialize
        //Attributes
        this.left = null;
        this.top = null;
        this.height = null;
        this.width = null;

        this.subCanvasOn = true;
        this.subCanvasHTML = null;
        this.subCanvas = null;

        // Canvas on which the object is created.
        this.canvas = null;

        //Feature specific status flags
        this.inStroke = false;

        //Initially drawing mode is off
        this.isMessageBoxSelected = false;


        if (canvas !== undefined && canvas !== null) {
            this.attachToCanvas(canvas);
            this.configureSubCanvas();
        }
    },

    attachToCanvas: function(canvas) {
        this.canvas = canvas;
    },

    configureSubCanvas: function() {
        window.subCanvas = this.subCanvas = new fabric.Canvas('subC', { backgroundColor: "#DDDDDD", isDrawingMode: true });
        this.subCanvasHTML = document.getElementsByClassName('canvas-container')[1];
        // this.subCanvasHTML.style.display = "none"
        this.subCanvasHTML.style.position = "absolute"
        this.subCanvasHTML.style.top = "300px"
        this.subCanvasHTML.style.left = "100px"
    },

    display: function() {
    	that = this;
        console.log(this.cancelButton, this.sendButton);

        for (var i = 0; i < 2; i++) {
            this.cancelButton.item(i).visible = !this.subCanvasOn;
            this.sendButton.item(i).visible = !this.subCanvasOn;
        }

        if (this.subCanvasOn) {
			fabric.util.animate({
	            startValue: that.subCanvas.height,
	            endValue: 0,
	            duration: 1000,
	            onChange: function(value) {
	                that.subCanvas.setHeight(value)
	            },
	            onComplete: function() {
	            	that.subCanvasHTML.style.display = "none"
	            }
	        })
        } else {
            fabric.util.animate({
                startValue: 0,
                endValue: that.height,
                duration: 1000,
                onChange: function(value) {
                    that.subCanvas.setHeight(value)
                },
                onComplete: function() {
                	that.subCanvasHTML.style.display = "block"
                }
            })
        }

        this.subCanvasOn = !this.subCanvasOn;
        this.canvas.deactivateAll();
        this.canvas.renderAll();
    },


    // This function should draw the box and any message that has been written inside
    draw: function() {
        // The trick behind subclass reference!
        var that = this;

        this.sendButton = new fabric.Group([
                new fabric.Rect({
                    originX: 'center',
                    originY: 'center',
                    left: this.left - 90,
                    top: this.top + 335,
                    width: this.width * 0.5,
                    height: this.height * .25,
                    fill: 'red',
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true
                }),
                new fabric.Text('Send to', {
                    originY: 'center',
                    originX: 'center',
                    left: this.left - 90,
                    top: this.top + 340,
                    fontFamily: 'Helvetica',
                    fontSize: 40
                })
            ], {
                visible: true,
                left: this.left - 150,
                top: this.top + 310,
                clicked: 0
            })
            .on('selected', function() {
                console.log('USER IS KRBA!!! Change this!!');
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
                    left: this.left + 100,
                    top: this.top + 335,
                    width: this.width * 0.5,
                    height: this.height * .25,
                    fill: 'green',
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true
                }),
                new fabric.Text('Cancel', {
                    originY: 'center',
                    originX: 'center',
                    left: this.left + 100,
                    top: this.top + 340,
                    fontFamily: 'Helvetica',
                    fontSize: 40
                })
            ], {
                visible: true,
                left: this.left,
                top: this.top + 310,
                clicked: 0
            })
            .on('selected', function() {
                this.clicked++
                    console.log(this.clicked);
                if (this.clicked > 1) {
					that.display();
                }
                that.subCanvas.clear();
                that.canvas.deactivateAll();
                that.canvas.renderAll();
            });





        //TODO draw the list of strokes that are saved

        //add to canvas
        this.canvas.add(this.sendButton);
        this.canvas.add(this.cancelButton);

        console.log("being drawn!", this.sendButton);

    },

    sendMessage: function() {
        // Sends the message on the inside of the door

    },

    cancelMessage: function() {
        //
    }


});
