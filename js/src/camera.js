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
		this.cameraButton = null;  // The personal display view
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
		// Need this in order to maintain scope for super nested functions
		var that = this;

		// Draw the viewportt
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

		// draw the subview
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

		// Draw Camera button
		fabric.loadSVGFromURL('js/assets/svg/camera.svg', function(obj, opt){
			console.log(obj, opt);
			this.cameraButton = fabric.util.groupSVGElements(obj, {
				width: opt.width,
				height: opt.height,
				svgUid: opt.svgUid,
				toBeParsed: opt.toBeParsed,
				left: that.viewport.left+200,
				top: that.viewport.top-60,
                originX: 'center',
                originY:'center',
                scaleX: 0.1,
                scaleY: 0.1,
                fill: 'white',
                selected: false,
				hasControls: false,
				hasBorders: false,
				lockMovementX: true,
				lockMovementY: true,
                visible: true
			}).on('selected', function(options) {
				if (that.showsub)
					this.set('fill', 'white');
				else
					this.set('fill', 'green');
				that.subview.visible = !that.showsub;
				that.showsub = !that.showsub;
				this.canvas.deactivateAll();
                that.canvas.renderAll();
	        });

			this.canvas.add(this.cameraButton);
		})


		// Draw incognito button
		fabric.loadSVGFromURL('js/assets/svg/incognito.svg', function(obj, opt){
			console.log(obj, opt);
			this.incogButton = fabric.util.groupSVGElements(obj, {
				width: opt.width,
				height: opt.height,
				svgUid: opt.svgUid,
				toBeParsed: opt.toBeParsed,
				left: that.viewport.left+200,
				top: that.viewport.top-20,
                originX: 'center',
                originY:'center',
                scaleX: 0.25,
                scaleY: 0.25,
                fill: 'white',
                selected: false,
				hasControls: false,
				hasBorders: false,
				lockMovementX: true,
				lockMovementY: true,
                visible: true
			}).on('selected', function(options) {
				if (that.showsub)
					this.set('fill', 'white');
				else
					this.set('fill', 'green');
				that.subview.visible = !that.showsub;
				that.showsub = !that.showsub;
				this.canvas.deactivateAll();
                that.canvas.renderAll();
	        });

			this.canvas.add(this.incogButton);
		})



		this.canvas.add(this.viewport);
		this.canvas.add(this.subview);

		console.log ("being drawn!", this);
	},

	toggleFullScreenSubview: function() {
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
			this.viewport.animate({ 'top': this.top+150, 'height': this.collapsedHeight * 3 },
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
