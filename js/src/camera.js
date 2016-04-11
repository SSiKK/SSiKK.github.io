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

		//Feature specific status flags
		this.on = false;
		this.fullScreenMode = false;
		this.showsub = false; // should we show subview?


		if (canvas!==undefined && canvas!== null) {
			this.attachToCanvas(canvas);
		}
	},
	attachToCanvas: function(canvas) {
		this.canvas = canvas;
	},

	draw: function () {
		// Draw
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
			lockMovementY: true,
		});

		// do NOT add to canvas on init, should be hidden for now
		this.subview = new fabric.Rect({
			angle: 0,
            left: this.viewport.left-160,
            top: this.viewport.top-60,
			width: this.width * 0.2,
			height: this.height * 0.35,
			originX: 'center',
			originY: 'center',
			fill: 'white',
			stroke: 'black',
			strokeWidth: 4,
			hasControls: false,
			hasBorders: false,
			lockMovementX: true,
			lockMovementY: true,
		});

		this.canvas.add(this.viewport);

		if (this.showsub)
			this.canvas.add(this.subview);

		console.log ("being drawn!", this);
	},

	toggleFullScreenViewport: function() {
		console.log("toggleFullScreenViewport", this.fullScreenMode, this);
		var refreshCallback = function() {
			this.canvas.deactivateAll();
			this.canvas.renderAll();
		}

		if (this.fullScreenMode) {
			this.viewport.animate({
				'top': this.top-50,
				'height': this.collapsedHeight
			},
			{
				onChange: this.canvas.renderAll.bind(this.canvas),
				duration: 1000,
				easing: fabric.util.ease.easeOutBounce,
				onComplete: refreshCallback.bind(this)
			});
		} else {
			this.viewport.animate({
				'top': this.top+150,
				'height': this.collapsedHeight * 3
			},
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
