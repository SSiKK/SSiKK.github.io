var YDYW_DoorKnob = SVG_Imitator.extend({
	init: function (canvas) { // Initialize 
		//Attributes
		this.cx = null;
		this.cy = null;
		this.radius = null;
		this.zoomFactor = null;
		this.knobColor = "rgba(230,230,230,1.0)";
		this.lockActivateColor = "rgba(200,135,142,1.0)";
		this.lockDeactivateColor = "rgba(142,200,135,1.0)";
		this.oulineColor = "black";
		this.defaults = {
			originX: 'center',
			originY: 'center',
			hasControls: false,
			hasBorders: false,
			selectable: false,
			lockMovementX: true,
			lockMovementY: true
		};
		// Canvas on which the object is created.
		this.canvas = null;
		this.knob = null;
		//Feature specific status flags
		this.locked = false;

		if (canvas!==undefined && canvas!== null) {
			this.attachToCanvas(canvas);
		}
		return this;
	},
	attachToCanvas: function(canvas) {
		this.canvas = canvas;
		return this;
	},
	
	draw: function () {
		// Draw
		if (!this.feedBackRing) {
			this.feedBackRing = new fabric.Circle(this.defaults);
			this.canvas.add(this.feedBackRing);
		}
		if (!this.knob) {
			this.knob = new fabric.Circle(this.defaults);
			this.canvas.add(this.knob);
		}
		if (!this.knobShine) {
			this.knobShine = new fabric.Circle(this.defaults);
			this.canvas.add(this.knobShine);
		}
		this.feedBackRing.set({
			fill: this.knobColor,
			radius: this.radius,
			stroke: this.oulineColor,
			left: this.cx,
			top: this.cy,
			opacity:0.0
		});
		this.knob.set({
			fill: this.knobColor,
			radius: this.radius*0.6,
			stroke: this.oulineColor,
			left: this.cx,
			top: this.cy
		});
		this.knobShine.set({
			fill: '',
			radius: this.radius*0.45,
			stroke: this.oulineColor,
			startAngle: Math.PI,
			endAngle: 1.5*Math.PI,
			left: this.cx,
			top: this.cy
		});		
		//console.log ("being drawn!", this);
		return this;
	},

	toggleLockedStatusAndShow: function() {
		//TODO: change the flag, depending on the flag set color animation to the outer ring
		if (this.locked) {
			this.feedBackRing.set('fill', this.lockDeactivateColor);
		} else {
			this.feedBackRing.set('fill', this.lockActivateColor);
		}
		this.locked = !this.locked;
		var refreshCallback = function() {
			this.canvas.deactivateAll();
			this.canvas.renderAll();
		}
		this.feedBackRing.animate('opacity', 1.0, {
			onChange: refreshCallback.bind(this),
			duration: 2000,
			easing: fabric.util.ease.easeOutElastic,
			onComplete: function() {
				this.feedBackRing.animate('opacity', 0.0, {
					onChange: refreshCallback.bind(this),
					duration: 2000,
					easing: fabric.util.ease.easeOutElastic
				});
			}.bind(this)
		});
		return this;
	}


});

