var YDYW_DeadBolt = SVG_Imitator.extend({
	init: function (canvas) { // Initialize 
		//Attributes
		this.left = null;
		this.top = null;
		this.width = null;
		this.height = null;
		this.boltXLocked = null;
		this.boltXUnlocked = null;
		this.boltColor = "rgba(230,230,230,1.0)";
		this.lockActivateColor = "rgba(200,135,142,1.0)";
		this.lockDeactivateColor = "rgba(142,200,135,1.0)";
		this.oulineColor = "black";
		this.cb = null;
		this.defaults = {
			hasControls: false,
			hasBorders: false,
			selectable: false,
			lockMovementX: true,
			lockMovementY: true
		};
		// Canvas on which the object is created.
		this.canvas = null;
		
		this.bolt = null;
		this.holder = null;
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
		if (!this.holder) {
			this.holder = new fabric.Rect(this.defaults);
			this.holder.on('selected', this.cb);
			this.canvas.add(this.holder);
		}
		if (!this.bolt) {
			this.bolt = new fabric.Circle(this.defaults);
			this.bolt.set({
				originX: 'center',
				originY: 'center'
			});
			this.canvas.add(this.bolt);
		}
		
		this.holder.set({
			selectable: true,
			fill: this.locked ? this.lockActivateColor: this.lockDeactivateColor,
			width: this.width,
			height: this.height,
			stroke: this.oulineColor,
			left: this.left,
			top: this.top,
			opacity: 1.0
		});
		var radius = this.height*0.4;
		this.boltXLocked = (this.left + this.width - 1.5*radius);
		this.boltXUnlocked = (this.left + 1.5*radius);
		this.bolt.set({
			fill: this.boltColor,
			radius: radius,
			stroke: this.oulineColor,
			left: this.locked? this.boltXLocked:this.boltXUnlocked,
			top: this.top + this.height/2.0,
		});
		console.log("uX : " + this.boltXUnlocked + " lX : " + this.boltXLocked + " boltX : " + this.bolt.left);
		//console.log ("being drawn!", this);
		return this;
	},
	lock: function() {
		
		this.locked = true;
		this.holder.set('fill', this.lockActivateColor);
		var refreshCallback = function() {
			this.canvas.deactivateAll();
			this.canvas.renderAll();
		}
		this.bolt.animate('left', this.boltXLocked * this.zoomFactor, {
			onChange: refreshCallback.bind(this),
			duration: 1000,
			easing: fabric.util.ease.easeOutElastic
		});
		console.log("uX : " + this.boltXUnlocked + " lX : " + this.boltXLocked + " boltX : " + this.bolt.left);
	},
	unlock: function() {
		
		this.locked = false;
		this.holder.set('fill', this.lockDeactivateColor);
		var refreshCallback = function() {
			this.canvas.deactivateAll();
			this.canvas.renderAll();
		}
		this.bolt.animate('left', this.boltXUnlocked * this.zoomFactor, {
			onChange: refreshCallback.bind(this),
			duration: 1000,
			easing: fabric.util.ease.easeOutElastic
		});
		console.log("uX : " + this.boltXUnlocked + " lX : " + this.boltXLocked + " boltX : " + this.bolt.left);
	},
	toggleLockedStatusAndShow: function() {
		if (this.locked) {
			this.unlock();
		} else {
			this.lock();
		}
		return this;
	}


});

