var YDYW_CheckBox = SVG_Imitator.extend({
	init: function (canvas) { // Initialize 
		//Attributes
		this.left = null;
		this.top = null;
		this.width = null;
		this.height = null;
		
		this.entries = [];
		this.selected = null;
		this.boxColor = "rgba(154,175,193,1.0)";
		this.boxEmptyColor = "rgba(230,230,230,1.0)";
		this.selectedColor = "rgba(135,168,193,1.0)";
		this.fabEntries = [];

		this.defaults = {
			hasControls: false,
			hasBorders: false,
			selectable: true,
			lockMovementX: true,
			lockMovementY: true
		};
		// Canvas on which the object is created.
		this.canvas = null;
		
		this.selectedEntry = 0;
		this.showing = false;

		if (canvas!==undefined && canvas!== null) {
			this.attachToCanvas(canvas);
		}
		return this;
	},
	attachToCanvas: function(canvas) {
		this.canvas = canvas;
		return this;
	},
	addEntries: function(entries) {
		for(var e in entries) {
			this.entries.push(entries[e]);
		}
	},
	draw: function () {
		var e = 0;
		
		var entryHeight = this.height / (2.0*this.entries.length + 1);
		var entryWidth = entryHeight;
		var entryLeft = this.left + this.width/20;

		for(e = 0; e < this.entries.length; e++) {
			if (!this.fabEntries[e]) {
				this.fabEntries[e] = {
					in: new fabric.Rect(this.defaults),
					out: new fabric.Rect(this.defaults),
					label: new fabric.Text(this.entries[e], this.defaults)
				}
				this.canvas.add(this.fabEntries[e].out);
				this.canvas.add(this.fabEntries[e].in);
				this.canvas.add(this.fabEntries[e].label);
			}
			this.fabEntries[e].out.set({
				fill: this.boxEmptyColor,
				width: entryWidth,
				height: entryHeight,
				stroke: this.boxColor,
				left: entryLeft,
				top: this.top + (2*e + 1) * entryHeight,
				opacity: 1.0,
				selectable:false,
				id: this.entries[e]
			});
			this.fabEntries[e].in.set({
				fill: this.selectedColor,
				width: entryWidth * 0.6,
				height: entryHeight * 0.6,
				stroke: this.selectedColor,
				left: entryLeft + 0.2*entryWidth,
				top: this.top + (2*e + 1.2) * entryHeight,
				opacity: 0.0,
				id: this.entries[e]
			});
			this.fabEntries[e].label.set({
				fontFamily: 'Helvetica',
			  	fontSize: 16 * this.zoomFactor,
			  	fill: "rgba(10,10,10,1.0)",
			  	left: entryLeft + 1.5*entryWidth,
				top: this.top + (2*e + 1.5) * entryHeight,
				id: this.entries[e],
				originY: "center"
			});
			this.fabEntries[e].in.on('selected',this.checkEntry.bind(this));
			console.log("added : " + this.entries[e].id);
		}
		this.fabEntries[this.selectedEntry].in.set({opacity: 1.0});
		return this;
	},
	checkEntry: function(e) {
		var id = this.canvas.getActiveObject().id;
		var refreshCallback = function() {
			this.canvas.deactivateAll();
			this.canvas.renderAll();
		}
		for(var e in this.fabEntries) {
			if (this.fabEntries[e].in.id === id) {
				this.selectedEntry = e;
				this.fabEntries[e].in.set({opacity:1.0});
			} else {
				this.fabEntries[e].in.set({opacity:0.0});
			}
		}
		refreshCallback();
		this.callback(id);

	},
	onSelect: function(callback) {
		this.callback = callback;
	},
	hide: function(){
		for(var e in this.fabEntries) {
			this.fabEntries[e].out.set({opacity: 0.0});
			this.fabEntries[e].in.set({opacity: 0.0});
			this.fabEntries[e].label.set({opacity: 0.0});
		}
	},
	show: function(){
		for(var e in this.fabEntries) {
			this.fabEntries[e].out.set({opacity: 1.0});
			this.fabEntries[e].in.set({opacity: 0.0});
			this.fabEntries[e].label.set({opacity: 1.0});
		}
		this.fabEntries[this.selectedEntry].in.set({opacity: 1.0});
	},

	toggle: function(){
		if(this.showing) {
			this.hide();
		} else {
			this.show();
		}
		this.showing = !this.showing;
	}
	


});
