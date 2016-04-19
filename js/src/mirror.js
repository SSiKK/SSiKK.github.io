var YDYW_Mirror = SVG_Imitator.extend({

    /**
     *
     *
     */
    init: function(data) { // Initialize
        //Attributes
        this.left = null;
        this.top = null;
        this.collapsedWidth = this.width = null;
        this.collapsedHeight = this.height = null;

        // Canvas on which the object is created.
        this.canvas = null;

        this.indoorView = null; // The viewing window, should be a rect
        this.indoorViewImage = null;
        this.indoorViewImageHeight = 600;

        this.collapseButton = null;
        this.expandButton = null;
        this.closeButton = null;


        //Feature specific status flags
        this.on = false;
        this.fullScreenMode = false;
        this.firstTime = true;

        // Attach the canvas
        if (canvas !== undefined && canvas !== null) {
            this.attachToCanvas(canvas);
        }
    },


    /**
     *
     *
     */
    attachToCanvas: function(canvas) {
        this.canvas = canvas;
    },


    /**
     *
     *
     */
    draw: function() {
        // Need this in order to maintain scope for super nested functions
        var that = this;

        // This is the outside view window. It should only appear when the user
        // actively engages it. Should be hidden by default
        // The main view window. This SHOULD be visible at all times
        this.indoorView = new fabric.Rect({
            angle: 0,
            left: this.left,
            top: this.top,
            width: this.collapsedWidth = this.width,
            height: this.collapsedHeight = this.height,
            originX: 'center',
            originY: 'center',
            fill: 'white',
            stroke: 'black',
            selectable: false,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true,
            visible: false
        })


        // Store our Promises in an array to make calling a little cleaner?
        var PromisesPromises = [
            //------------------------
            //     HERE BE IMAGES
            //------------------------
            new Promise(function(resolve, reject) {
                fabric.Image.fromURL("js/assets/img/visitorF.png", function(img) {
                    resolve(img.set({
                        left: that.indoorView.left,
                        top: that.top * 4.3,
                        scaleX: .9,
                        scaleY: .9,
                        originX: 'center',
                        originY: 'center',
                        selectable: false,
                        hasControls: false,
                        hasBorders: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        visible: !that.showsub,
                        clipTo: function(ctx) {
                            ctx.rect(-400, -1000, 800, that.indoorViewImageHeight);
                        }
                    }))
                })
            }),
            //---------------------------
            //   HERE BE (svg) Buttons!
            //---------------------------
            new Promise(function(resolve, reject) {
                fabric.loadSVGFromURL('js/assets/svg/expand.svg', function(obj, opt) {
                    resolve(fabric.util.groupSVGElements(obj, {
                        width: opt.width,
                        height: opt.height,
                        svgUid: opt.svgUid,
                        toBeParsed: opt.toBeParsed,
                        left: that.indoorView.left * 1.5,
                        top: that.indoorView.top * 0.9,
                        originX: 'center',
                        originY: 'center',
                        scaleX: 0.2,
                        scaleY: 0.2,
                        fill: 'black',
                        hasControls: false,
                        hasBorders: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        visible: true
                    }))
                })
            }),
            new Promise(function(resolve, reject) {
                fabric.loadSVGFromURL('js/assets/svg/collapse.svg', function(obj, opt) {
                    resolve(fabric.util.groupSVGElements(obj, {
                        width: opt.width,
                        height: opt.height,
                        svgUid: opt.svgUid,
                        toBeParsed: opt.toBeParsed,
                        left: that.indoorView.left * 1.5,
                        top: that.indoorView.top * 0.9,
                        originX: 'center',
                        originY: 'center',
                        scaleX: 0.15,
                        scaleY: 0.15,
                        fill: 'black',
                        hasControls: false,
                        hasBorders: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        visible: this.fullScreenMode
                    }))
                })
            }),
            new Promise(function(resolve, reject) {
                fabric.loadSVGFromURL('js/assets/svg/close.svg', function(obj, opt) {
                    resolve(fabric.util.groupSVGElements(obj, {
                        width: opt.width,
                        height: opt.height,
                        svgUid: opt.svgUid,
                        toBeParsed: opt.toBeParsed,
                        left: that.indoorView.left * 1.7,
                        top: that.indoorView.top * 0.7,
                        originX: 'center',
                        originY: 'center',
                        scaleX: 0.2,
                        scaleY: 0.2,
                        fill: 'white',
                        hasControls: false,
                        hasBorders: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        visible: true
                    }))
                })
            })
        ]

        //--------------------------------
        //     Resolve All the Promises!
        //--------------------------------

        Promise.all(PromisesPromises) // [ownerPromise, visitorPromise, incognitoPromise, cameraPromise, expandPromise, collapsePromise]
        .then(function(results) { // [ownerImg, visitorImg, incognito, camera, expander, collapse]

            // simple helper function
            var selfViewCB = function(options) {
                if (that.showsub)
                    this.set('fill', 'white');
                else
                    this.set('fill', 'green');
                that.subView.bringToFront();
                that.subView.visible = !that.showsub;
                that.outsideView.visible = !that.showsub;
                that.outsideViewImage.visible = !that.showsub;
                that.showsub = !that.showsub;
                that.canvas.deactivateAll();
                that.canvas.renderAll();
            }


            that.indoorViewImage = results[0] // visitorImg

            that.expandButton = results[1] // expander
            .on('selected', function() {
                that.toggleFullScreenindoorView();
            });

            that.collapseButton = results[2] // collapse
            .on('selected', function() {
                that.toggleFullScreenindoorView();
            });

            that.closeButton = results[3]
            .on('mousedown', function() {
                this.set({'fill': '#c8878e'});
            })
            .on('mouseup', function() {
                this.set({'fill': 'white'});
                that.hide();
            })


            that.canvas.add(that.indoorViewImage);
            that.canvas.add(that.expandButton);
            that.canvas.add(that.collapseButton);
            that.canvas.add(that.closeButton);

            if (that.firstTime){
                that.hide();
                that.firstTime = false;
            }
            console.log("being drawn!", this);
        })
        .catch(function(error) {
            console.log("seems to be and error", error);
        });


        this.canvas.add(this.indoorView);

    },


    /**
     *  Makes indoor Image and Container Larger or smaller
     *
     */
    toggleFullScreenindoorView: function() {
        var refreshCallback = function() {
            this.canvas.deactivateAll();
            this.canvas.renderAll();
        }
        var that = this;

        // Make it LARGER
        if (!this.fullScreenMode) {
            // Adujust STRANGERS Image
            fabric.util.animate({
                startValue: this.indoorViewImageHeight === 600 ? 600 : this.indoorViewImageHeight,
                endValue: 600 * 4,
                duration: 900,
                onChange: function(value) {
                    that.indoorViewImageHeight = value;
                    that.canvas.renderAll();
                },
                onComplete: refreshCallback.bind(this)
            })


            this.indoorView.animate({
                'top': this.indoorView.top * 1.9,
                'height': this.collapsedHeight * 3.1
            }, {
                onChange: this.canvas.renderAll.bind(this.canvas),
                duration: 2000,
                easing: fabric.util.ease.easeOutBack,
                onComplete: refreshCallback.bind(this)
            });

            // Make it SMALLER
        } else {
            // Adjust the indoorView
            // Adujust STRANGERS Image
            fabric.util.animate({
                startValue: 600 * 4,
                endValue: 600,
                duration: 1000,
                onChange: function(value) {
                    that.indoorViewImageHeight = value;
                    that.canvas.renderAll();
                },
                onComplete: refreshCallback.bind(this)
            })

            that.indoorView.animate({
                'top': that.indoorView.top * .52,
                'height': that.collapsedHeight
            }, {
                onChange: that.canvas.renderAll.bind(that.canvas),
                duration: 1000,
                easing: fabric.util.ease.easeInBack,
                // onComplete: refreshCallback.bind(that)
            });

        }
        this.fullScreenMode = !this.fullScreenMode;
        this.expandButton.visible = !this.fullScreenMode;
        this.collapseButton.visible = this.fullScreenMode;
    },

    show: function(){
        this.indoorView.setVisible(true); // The viewing window, should be a rect
        this.indoorViewImage.setVisible(true);

        this.collapseButton.setVisible(this.fullScreenMode);
        this.expandButton.setVisible(true);
        this.closeButton.setVisible(true);
    },

    hide: function(){
        this.indoorView.setVisible(false); // The viewing window, should be a rect
        this.indoorViewImage.setVisible(false);

        this.collapseButton.setVisible(false);
        this.expandButton.setVisible(false);
        this.closeButton.setVisible(false);
    }
});
