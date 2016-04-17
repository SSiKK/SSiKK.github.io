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
    // var subC = document.createElement('canvas')
    //     subC.id = 'subC';
    //     subC.width = canvas.height * 0.35 + "";
    //     subC.height = canvas.height * 0.15 +"";
    //     subC.style.border = "2px solid black"

    	subC = document.getElementById('subC')
    	subC.style.display = 'block';
        console.log(subC);

        window.subCanvas = this.subCanvas = new fabric.Canvas('subC', { backgroundColor: "#DDDDDD", isDrawingMode: true });
        this.subCanvasHTML = document.getElementsByClassName('canvas-container')[1];
        this.subCanvasHTML.style.position = "absolute"
        // this.subCanvasHTML.style.display = "none"
        this.subCanvasHTML.style.top = "700px"
        this.subCanvasHTML.style.left = document.getElementsByClassName('container')[1]? "566px" : '300px'
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
	            	that.cancelButton.item(1).setText('Cancel')
	            }
	        })
        } else {
            fabric.util.animate({
                startValue: 0,
                endValue: that.height*.35,
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
                    left: this.left * 4,
                    // top: this.top,
                    width: this.width * 0.25,
                    height: this.height * .08,
                    fill: '#8ec887',
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true
                }),
                new fabric.Text('Send to', {
                    originY: 'center',
                    originX: 'center',
                    left: this.left * 4,
                    // top: this.top,
                    fontFamily: 'Helvetica',
                    fontSize: 35
                })
            ], {
                visible: true,
                left: this.left * 7.5,
                top: this.top + 450,
                clicked: 0
            })
            .on('selected', function() {
                console.log('USER IS KRBA!!! Change this!!');
                localStorage['ssikk'] = JSON.stringify(that.subCanvas)
                that.cancelButton.item(1).setText('Cancel')
                that.cancelButton.clicked = 0;
                that.canvas.deactivateAll();
                that.canvas.renderAll();
            });


        this.subCanvas
            .on("mouse:down", function() {
                that.cancelButton.clicked = 0;
                that.cancelButton.item(1).setText('Cancel')

            })

        this.cancelButton = new fabric.Group([
                new fabric.Rect({
                    originX: 'center',
                    originY: 'center',
                    left: this.left * 4,
                    width: this.width * 0.25,
                    height: this.height * .08,
                    fill: '#c8878e',
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true
                }),
                new fabric.Text('Cancel', {
                    originY: 'center',
                    originX: 'center',
                    left: this.left * 4,
                    fontFamily: 'Helvetica',
                    fontSize: 35
                })
            ], {
                visible: true,
                left: this.left * 14.5,
                top: this.top + 450,
                clicked: 0
            })
            .on('selected', function() {
                this.clicked++
                    console.log(this.clicked);
                if (this.clicked === 1)
                	this.item(1).setText('Close?')
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
