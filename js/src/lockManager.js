var YDYW_LockManager = SVG_Imitator.extend({
	init: function (canvas) { // Initialize 
		//Attributes
		this.deadBolt = null;
		this.doorKnobIn = null;
		this.doorKnobOut = null;
		
		this.deadBoltPosition = null;
		this.doorKnobInPosition = null;
		this.doorKnobOutPosition = null;

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
		if (!this.doorKnobIn) {
			this.doorKnobIn = new YDYW_DoorKnob();
			this.doorKnobIn.init(canvas); 
		}
		if (!this.doorKnobOut) {
			this.doorKnobOut = new YDYW_DoorKnob();
			this.doorKnobOut.init(canvas); 
		}
		if (!this.deadBolt) {
			this.deadBolt = new YDYW_DeadBolt();
			this.deadBolt.init(canvas); 
		}
		this.doorKnobIn.set(this.doorKnobInPosition);
		this.doorKnobOut.set(this.doorKnobOutPosition);
		this.deadBolt.set(this.deadBoltPosition);
		//console.log ("being drawn!", this);
		return this;
	},
	
	isLocked: function() {
		return this.locked;
	},
	toggleLockedStatusAndShow: function() {
		this.locked = !this.locked;
		this.doorKnobOut.toggleLockedStatusAndShow();
		this.deadBolt.toggleLockedStatusAndShow();
	}


});

