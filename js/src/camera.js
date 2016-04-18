var YDYW_Camera = SVG_Imitator.extend({

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

        this.outsideView = null; // The outdoor viewing window, should be a rect
        this.outsideViewImage = null; // The outdoor viewing window, should be a rect
        this.outsideViewImageHeight = 600; // The outdoor viewing window, should be a rect

        this.subView = null; // The picture in picture display of owner
        this.subViewImage = null;
        this.subViewImageHeight = null;

        // The different buttons
        this.cameraButton = null; // The personal display view
        this.incogButton = null; // The incognito button
        this.collapseButton = null;
        this.expandButton = null;

        //Feature specific status flags
        this.on = false;
        this.showsub = false; // should we show subView?
        this.fullScreenMode = false;
        this.fullSubScreenMode = false; // Since the subView is decoupled



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
            lockMovementY: true
        })

        this.outsideView = new fabric.Rect({
            angle: 0,
            left: this.left * 3,
            top: this.top,
            width: this.collapsedWidth = this.width,
            height: this.collapsedHeight = this.height,
            originX: 'center',
            originY: 'center',
            fill: 'white',
            stroke: 'black',
            selected: false,
            visible: false,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true
        })


        // The subView window, shows the user their own image. Should be
        // hidden by default.
        this.subView = new fabric.Rect({
            angle: 0,
            left: this.indoorView.left *.6,
            top: this.indoorView.top * .75,
            width: this.collapsedWidth * 0.2,
            height: this.collapsedHeight * 0.35,
            originX: 'center',
            originY: 'center',
            fill: 'white',
            stroke: 'black',
            strokeWidth: 4,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true,
            visible: this.showsub
        }).on('selected', function(options) {
            that.toggleFullScreenSubView();
        });


        // Store our Promises in an array to make calling a little cleaner?
        var PromisesPromises = [
            //------------------------
            //     HERE BE IMAGES
            //------------------------
            new Promise(function(resolve, reject) {
                fabric.Image.fromURL("js/assets/img/visitorF.png", function(img) {
                    resolve(img.set({
                        left: that.indoorView.left*3,
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
                        visible: that.showsub,
                        clipTo: function(ctx) {
                            ctx.rect(-400, -1000, 800, that.outsideViewImageHeight);
                        }
                    }))
                })
            }),
            new Promise(function(resolve, reject) {

                fabric.Image.fromURL("js/assets/img/visitorM1.png", function(img) {
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
            // Camera button Promis
            new Promise(function(resolve, reject) {
                fabric.loadSVGFromURL('js/assets/svg/camera.svg', function(obj, opt) {
                    resolve(fabric.util.groupSVGElements(obj, {
                        width: opt.width,
                        height: opt.height,
                        svgUid: opt.svgUid,
                        toBeParsed: opt.toBeParsed,
                        left: that.indoorView.left * 1.7,
                        top: that.indoorView.top * .90,
                        originX: 'center',
                        originY: 'center',
                        scaleX: 0.3,
                        scaleY: 0.3,
                        fill: 'white',
                        hasControls: false,
                        hasBorders: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        visible: true
                    }))
                })
            }),

            // Incognito button Promis
            new Promise(function(resolve, reject) {
                fabric.loadSVGFromURL('js/assets/svg/incognito.svg', function(obj, opt) {
                    resolve(fabric.util.groupSVGElements(obj, {
                        width: opt.width,
                        height: opt.height,
                        svgUid: opt.svgUid,
                        toBeParsed: opt.toBeParsed,
                        left: that.indoorView.left * 1.7,
                        top: that.indoorView.top * 1.1,
                        originX: 'center',
                        originY: 'center',
                        scaleX: 0.6,
                        scaleY: 0.6,
                        fill: 'white',
                        hasControls: false,
                        hasBorders: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        visible: true
                    }))
                })
            }),
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
                that.outdoorViewImage.visible = !that.showsub;
                that.showsub = !that.showsub;
                that.canvas.deactivateAll();
                that.canvas.renderAll();
            }


            that.outdoorViewImage = results[0] // ownerImg

            that.indoorViewImage = results[1] // visitorImg

            that.incogButton = results[2] // incognito
            .on('selected', selfViewCB);

            that.cameraButton = results[3] // camera
            .on('selected', selfViewCB);

            that.expandButton = results[4] // expander
            .on('selected', function() {
                that.toggleFullScreenindoorView();
            })

            that.collapseButton = results[5] // collapse
            .on('selected', function() {
                that.toggleFullScreenindoorView();
            })


            that.canvas.add(that.outdoorViewImage);
            that.canvas.add(that.indoorViewImage);
            that.canvas.add(that.incogButton);
            that.canvas.add(that.cameraButton);
            that.canvas.add(that.expandButton);
            that.canvas.add(that.collapseButton);

        })
        .catch(function(error) {
            console.log("seems to be and error", error);
        })



        this.canvas.add(this.indoorView);
        this.canvas.add(this.outsideView);
        this.canvas.add(this.subView);

        console.log("being drawn!", this);
    },


    /**
     *
     *
     */
    toggleFullScreenSubView: function() {
        var refreshCallback = function() {
            this.canvas.deactivateAll();
            this.canvas.renderAll();
        }

        var that = this;
        //=================
        // Make it LARGER
        if (!this.fullSubScreenMode) {

            // Adjust the outdoorView
            fabric.util.animate({
                startValue: this.outsideViewImageHeight === 600 ? 600 : this.outsideViewImageHeight,
                endValue: (600 + 600) * 2,
                duration: 900,
                onChange: function(value) {
                    that.outsideViewImageHeight = value;
                    that.canvas.renderAll();
                },
                onComplete: refreshCallback.bind(this)
            })

            // Adjust the OUTSIDE VIEW
            this.outsideView.animate({
                'top': that.outsideView.top * 1.9, //  + 150
                'height': this.collapsedHeight * 3.1
            }, {
                onChange: this.canvas.renderAll.bind(this.canvas),
                duration: 2000,
                easing: fabric.util.ease.easeOutBack,
                onComplete: refreshCallback.bind(this)
            });
            // Adjust the SUBVIEW
            this.subView.animate({
                'top': this.subView.top * 1.1,
                'height': this.collapsedHeight * 0.45
            }, {
                onChange: this.canvas.renderAll.bind(this.canvas),
                duration: 2000,
                easing: fabric.util.ease.easeOutBack,
                onComplete: refreshCallback.bind(this)
            });


            //=================
            // Make it SMALLER
        } else {

            // Adjust Owner image
            fabric.util.animate({
                startValue: 600 * 4,
                endValue: 600,
                duration: 900,
                onChange: function(value) {
                    that.outsideViewImageHeight = value;
                    that.canvas.renderAll();
                },
                onComplete: refreshCallback.bind(this)
            })


            // Adjust the OUTSIDE VIEW
            this.outsideView.animate({
                'top': that.outsideView.top * .52, // this.top - 50,
                'height': this.collapsedHeight
            }, {
                onChange: this.canvas.renderAll.bind(this.canvas),
                duration: 1000,
                easing: fabric.util.ease.easeInBack,
                onComplete: refreshCallback.bind(this)
            });

            // Adjust the SUBVIEW
            this.subView.animate({
                'top': this.subView.top *.92,
                'height': this.collapsedHeight * 0.35
            }, {
                onChange: this.canvas.renderAll.bind(this.canvas),
                duration: 1000,
                easing: fabric.util.ease.easeInBack,
                onComplete: refreshCallback.bind(this)
            });
        }

        this.fullSubScreenMode = !this.fullSubScreenMode;

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
    }
});
