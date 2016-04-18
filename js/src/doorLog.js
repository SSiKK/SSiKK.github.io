var YDYW_DoorLog = SVG_Imitator.extend({
	init: function (canvas, imageLoader) { // Initialize 
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
		this.imageLoader = null;
		this.zoomFactor = 1;
		this.zoom = 1;
		this.heightIncrement = 0;
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
		if (imageLoader!==undefined && imageLoader!== null) {
			this.attachToImageLoader(imageLoader);
		}
		return this;
	},
	attachToCanvas: function(canvas) {
		this.canvas = canvas;
		return this;
	},
	attachToImageLoader: function(imageLoader) {
		this.imageLoader = imageLoader;
		return this;
	},
	addEntries: function(entries) {
		for(var e in entries) {
			this.imageLoader.addPattern({url:entries[e].url,id:entries[e].time});
			this.entries.push(entries[e]);
		}
	},
	draw: function () {
		var e = 0;
		this.height = this.height + this.heightIncrement;
		var entryHeight = this.height / (2.0*this.entries.length + 3);
		var entryWidth = entryHeight;
		var entryLeft = this.left + this.width/20;
		if (!this.board) {
			this.board = new fabric.Rect(this.defaults);
			this.canvas.add(this.board);
		}
		this.board.set({
			id: "logBoard",
            left: this.left * this.zoomFactor,
            top: this.top * this.zoomFactor,
            fill: "#dddddd",
            stroke: "#dddddd",
            rx : 10,
            ry : 10,
            width: this.width,
            height: this.height,
            angle: 0,
            selectable: true
        });
        this.board.on('selected',this.refreshCallback.bind(this));
        if (!this.heading) {
        	this.heading = new fabric.Text(this.caption, this.defaults);
        	this.canvas.add(this.heading);
        }
        this.heading.set({
			fontFamily: 'Helvetica',
		  	fontSize: 10 * this.fontSize,
		  	fill: "rgba(10,10,10,1.0)",
		  	left: entryLeft * this.zoomFactor,
			top: (this.top + entryHeight)* this.zoomFactor,
			id: "logCaption",
			originY: "top",
			selectable:false
		});
        
  		for(e = 0; e < this.entries.length; e++) {
			if (!this.fabEntries[e]) {
				this.fabEntries[e] = {
					time: new fabric.Text(this.entries[e].time, this.defaults),
					userImg: new fabric.Rect(this.defaults),
				}
				this.canvas.add(this.fabEntries[e].time);
				this.canvas.add(this.fabEntries[e].userImg);
			}
			this.fabEntries[e].time.set({
				fontFamily: 'Helvetica',
			  	fontSize: 7 * this.fontSize,
			  	fill: "rgba(10,10,10,1.0)",
			  	left: entryLeft * this.zoomFactor,
				top: (this.top + (2*e + 3) * entryHeight)* this.zoomFactor,
				id: this.entries[e].time + this.entries[e].id,
				originY: "center",
				selectable:false,
				scaleX: this.zoomFactor,
				scaleY: this.zoomFactor
			});
			

			this.fabEntries[e].userImg.set({
				width: (entryWidth * 0.9),
				height: (entryHeight * 0.9),
				//stroke: this.selectedColor,
				left: (entryLeft + 0.6*this.width)* this.zoomFactor,
				top: (this.top + (2*e + 3) * entryHeight)* this.zoomFactor,
				id: this.entries[e].time + this.entries[e].id,
				scaleX: this.zoomFactor,
				scaleY: this.zoomFactor,
				originY: "center"
			});
			console.log("added : " + this.entries[e].id);
		}
		return this;
	},
	
	hide: function(){
		this.board.set({visible: false});
		this.heading.set({visible: false});
		for(var e in this.fabEntries) {
			this.fabEntries[e].time.set({visible: false});
			this.fabEntries[e].userImg.set({visible: false});
		}
		this.showing = false;
	},
	show: function(){
		this.board.set({visible: true});
		this.heading.set({visible: true});
		for(var e in this.fabEntries) {
			this.fabEntries[e].time.set({visible: true});

			this.fabEntries[e].userImg.set({fill:this.imageLoader.getPattern(this.entries[e].time, this.fabEntries[e].userImg.width, this.fabEntries[e].userImg.height, 2) , visible: true});
		}
		this.showing = true;
	},

	toggle: function(){
		if(this.showing) {
			this.hide();
		} else {
			this.show();
		}
	},

	onSelect: function(callback) {
		this.callback = callback;
	},
	refreshCallback: function() {
		this.canvas.deactivateAll();
		this.canvas.renderAll();
		this.callback();
	},
	//dict contains all text that are being used in the entire app
	setTextCallback: function(dict) {
		//var t;
		this.heading.set({text: dict[this.caption]});
		/*for (var e = 0; e<this.entries.length; e++) {
			//t = dict[this.entries[e]] || this.entries[e];
			//console.log(t);
			//Set the text attribute of text elements to dictionary lookup value
			//this.fabEntries[e].label.set({text: t});
		}*/
	}
	


});

