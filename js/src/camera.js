var YDYW_Camera = SVG_Imitator.extend({
	init: function (data) { // Initialize
		//Attributes
		this.left = null;
		this.top = null;
		this.collapsedWidth = this.width = null;
		this.collapsedHeight = this.height = null;

		// Canvas on which the object is created.
		this.canvas = null;

		this.viewport = null; // The viewing window, should be a rect
		this.subview = null; // The picture in picture display of owner

		// The different buttons
		this.pipButton = null;  // The personal display view
		this.incogButton = null; // The incognito button




		//Feature specific status flags
		this.on = false;
		this.showsub = false; // should we show subview?
		this.fullScreenMode = false;
		this.fullSubScreenMode = false; // Since the subview is decoupled



		// Attach the canvas
		if (canvas!==undefined && canvas!== null) {
			this.attachToCanvas(canvas);
		}
	},
	attachToCanvas: function(canvas) {
		this.canvas = canvas;
	},

	draw: function () {
		// Draw
		var that = this;
		this.viewport = new fabric.Rect({
			angle: 0,
            left: this.left,
            top: this.top,
			width: this.collapsedWidth = this.width,
			height: this.collapsedHeight = this.height,
			originX: 'center',
			originY: 'center',
			fill: 'white',
			stroke: 'black',
			hasControls: false,
			hasBorders: false,
			lockMovementX: true,
			lockMovementY: true
		})
		.on('selected', function(options) {
			console.log("selected!", this);
        	that.toggleFullScreenViewport();
        });

		// do NOT add to canvas on init, should be hidden for now
		this.subview = new fabric.Rect({
			angle: 0,
            left: this.viewport.left-160,
            top: this.viewport.top-60,
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
        	that.toggleFullScreenSubview();
        });



		this.canvas.add(this.viewport);
		this.canvas.add(this.subview);

		console.log ("being drawn!", this);
	},

	toggleFullScreenSubview: function() {
		console.log("toggleFullScreenSubview", this.toggleFullScreenSubview, this);
		var refreshCallback = function() {
			this.canvas.deactivateAll();
			this.canvas.renderAll();
		}

		// Make it SMALLER
		if (this.fullSubScreenMode) {
			// Adjust the SUBVIEW
			this.subview.animate({
				'top': this.top-100,
				'height': this.collapsedHeight * 0.35
			},
			{
				onChange: this.canvas.renderAll.bind(this.canvas),
				duration: 1000,
				easing: fabric.util.ease.easeOutBounce,
				onComplete: refreshCallback.bind(this)
			});

		// Make it LARGER
		} else {

			// Adjust the SUBVIEW
			this.subview.animate({
				'top': this.top-75,
				'height': this.collapsedHeight * 0.45
			},
			{
				onChange: this.canvas.renderAll.bind(this.canvas),
				duration: 1000,
				easing: fabric.util.ease.easeOutBounce,
				onComplete: refreshCallback.bind(this)
			});
		}
		this.fullSubScreenMode = !this.fullSubScreenMode;
	},


	toggleFullScreenViewport: function() {
		console.log("toggleFullScreenViewport", this.fullScreenMode, this);

		var refreshCallback = function() {
			this.canvas.deactivateAll();
			this.canvas.renderAll();
		}

		// Make it SMALLER
		if (this.fullScreenMode) {
			// Adjust the Viewport
			this.viewport.animate({ 'top': this.top-50, 'height': this.collapsedHeight },
			{
				onChange: this.canvas.renderAll.bind(this.canvas),
				duration: 1000,
				easing: fabric.util.ease.easeOutBounce,
				onComplete: refreshCallback.bind(this)
			});

		// Make it LARGER
		} else {
			// Adjust the Viewport
			this.viewport.animate({ 'top': this.top+160, 'height': this.collapsedHeight * 3.5 },
			{
				onChange: this.canvas.renderAll.bind(this.canvas),
			  	duration: 1000,
			  	easing: fabric.util.ease.easeOutBounce,
			  	onComplete: refreshCallback.bind(this)
			});
		}
		this.fullScreenMode = !this.fullScreenMode;
	}
});
