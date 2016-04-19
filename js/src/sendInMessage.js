var YDYW_SendIn_Message = SVG_Imitator.extend({
    init: function(canvas) { // Initialize
        //Attributes
        this.left = null;
        this.top = null;
        this.height = null;
        this.width = null;

        this.subBanvasOn = true;
        this.subBanvasHTML = null;
        this.subBanvas = null;

        this.firstTime = true;
        // Relative position to the SendTo button.
        this.leftRef = this.left + 150;
        this.topRef = this.top + 450;

        // Canvas on which the object is created.
        this.canvas = null;

        //Feature specific status flags
        this.inStroke = false;

        //Initially drawing mode is off
        this.isMessageBoxSelected = false;
        this.profileBox = [];

        if (canvas !== undefined && canvas !== null) {
            this.attachToCanvas(canvas);
            this.configureSubBanvas();
        }
    },

    attachToCanvas: function(canvas) {
        this.canvas = canvas;
    },

    configureSubBanvas: function() {
        // var subB = document.createElement('canvas')
        //     subB.id = 'subB';
        //     subB.width = canvas.height * 0.35 + "";
        //     subB.height = canvas.height * 0.15 +"";
        //     subB.style.border = "2px solid black"

        subB = document.getElementById('subB')
        subB.style.display = 'block';
        console.log(subB);

        window.subBanvas = this.subBanvas = new fabric.Canvas('subB', {
            backgroundColor: "#DDDDDD",
            isDrawingMode: true
        });
        this.subBanvasHTML = document.getElementsByClassName('canvas-container')[1];
        this.subBanvasHTML.style.position = "absolute"
        this.subBanvasHTML.style.top = (this.topRef + 200) + "px"
        this.subBanvasHTML.style.left = document.getElementsByClassName('container')[1] ? '1650px': "310px"
    },

    display: function() {

        that = this;
        console.log(this.cancelButton, this.sendButton);

        for (var i = 0; i < 2; i++) {
            this.cancelButton.item(i).visible = !this.subBanvasOn;
            this.sendButton.item(i).visible = !this.subBanvasOn;
        }

        if (this.subBanvasOn) {
            fabric.util.animate({
                startValue: that.subBanvas.height,
                endValue: 0,
                duration: 1000,
                onChange: function(value) {
                    that.subBanvas.setHeight(value)
                },
                onComplete: function() {
                    that.subBanvasHTML.style.display = "none"
                    that.cancelButton.item(1).setText('Cancel')
                    for (var i = 0; i < that.profileBox.length; i++) {
                        that.profileBox[i].setVisible(false);
                    }
                }
            })
        } else {
            fabric.util.animate({
                startValue: 0,
                endValue: that.height * .35,
                duration: 1000,
                onChange: function(value) {
                    that.subBanvas.setHeight(value)
                },
                onComplete: function() {
                    that.subBanvasHTML.style.display = "block"
                }
            })
        }

        this.subBanvasOn = !this.subBanvasOn;
        this.canvas.deactivateAll();
        this.canvas.renderAll();
    },


    // This function should draw the box and any message that has been written inside
    draw: function() {
        // The trick behind subBlass reference!
        var that = this;

        this.sendButton = new fabric.Group([
            new fabric.Rect({
                originX: 'center',
                originY: 'center',
                left: this.left * 4,
                // top: this.top,
                width: this.width * 0.3,
                height: this.height * .05,
                fill: '#8ec887',
                selectable: true,
                hasControls: false,
                hasBorders: false,
                lockMovementX: true,
                lockMovementY: true
            }),
            new fabric.Text('Note to', {
                originY: 'center',
                originX: 'center',
                left: this.left * 4,
                // top: this.top,
                fontFamily: 'Helvetica',
                fontSize: 30
            })
        ], {
            visible: true,
            left: this.leftRef * 5, //TODO
            top: this.topRef + 2,
            clicked: 0
        })
            .on('selected', function() {

                // Give an option to select General or specific user.

                // Start of User profiles
                //var leftOffset = 0;
                // for (var i = 0; i < 4; i++) {
                //     that.addProfiles(i);
                // }

                //End of General User
                that.subBanvas.clear();
                console.log('USER IS KRBA!!! Change this!!');
                localStorage['ssikk'] = JSON.stringify(that.subBanvas);
                that.cancelButton.item(1).setText('Cancel');
                that.cancelButton.clicked = 0;
                that.canvas.deactivateAll();
                that.canvas.renderAll();
            });


        this.subBanvas
            .on("mouse:down", function() {
                that.cancelButton.clicked = 0;
                that.cancelButton.item(1).setText('Cancel')
            })

        this.cancelButton = new fabric.Group([
            new fabric.Rect({
                originX: 'center',
                originY: 'center',
                left: this.left * 4,
                width: this.width * 0.3,
                height: this.height * .05,
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
                fontSize: 30
            })
        ], {
            visible: true,
            left: this.leftRef * 6,
            top: this.topRef + 2,
            clicked: 0
        })
            .on('selected', function() {
                this.clicked++
                console.log(this.clicked);
                if (this.clicked === 1)
                    this.item(1).setText('Close?')
                if (this.clicked > 1) {
                    that.hide();
                    // that.display();


                }
                that.subBanvas.clear();
                that.canvas.deactivateAll();
                that.canvas.renderAll();
            });



        //TODO draw the list of strokes that are saved

        //add to canvas
        this.canvas.add(this.sendButton);
        this.canvas.add(this.cancelButton);

        if (this.firstTime)
            that.hide();
        console.log("being drawn!", this.sendButton);

    },

    addProfiles: function(i) {
        var that = this;
        var path = "js/assets/img/profiles/";
        var ext = ".jpg";

        imgFile = path + "p" + i + ext;
        var offset = i * 200;
        fabric.Image.fromURL(imgFile, function(img) {

            that.profileBox[i] = img.set({
                left: that.leftRef + 233 + offset,
                top: that.topRef + 775,
                scaleX: 0.2,
                scaleY: 0.2,
                originX: 'center',
                originY: 'center',
                stroke: 'black',
                strokeWidth: 3,
                hasControls: false,
                hasBorders: false,
                lockMovementX: true,
                lockMovementY: true
            }).on('selected', function() {

                console.log('USER IS SAVED !!' + i);
                localStorage['ssikk'] = JSON.stringify(that.subBanvas);
                that.cancelButton.item(1).setText('Cancel');
                that.cancelButton.clicked = 0;

                that.hide();
        })

            that.canvas.add(that.profileBox[i]);
        });
        console.log("Profile 1 has been drawn!", that);

        // End of user profiles.
    },

    show: function() {
        var that = this;
        for (var i = 0; i < that.profileBox.length; i++) {
            that.profileBox[i].setVisible(false);
            that.profileBox[i].setVisible(false);
        }
        that.subBanvasHTML.style.display = "block"
        that.cancelButton.setVisible(true);
        that.sendButton.setVisible(true);

        that.cancelButton.item(1).setText('Cancel')
    },


    hide: function() {
        var that = this;
        for (var i = 0; i < that.profileBox.length; i++) {
            that.profileBox[i].setVisible(false);
            that.profileBox[i].setVisible(false);
        }
        that.subBanvasHTML.style.display = "none"
        that.cancelButton.setVisible(false);
        that.sendButton.setVisible(false);

        that.cancelButton.item(1).setText('Cancel')
    }


});