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
			this.imageLoader.addImage({url:entries[e].url,id:entries[e].time + entries[e].id});
			this.entries.push(entries[e]);
		}
	},
	draw: function () {
		var e = 0;
		
		var entryHeight = this.height / (2.0*this.entries.length + 3);
		var entryWidth = entryHeight;
		var entryLeft = this.left + this.width/20;
		if (!this.board) {
			this.board = new fabric.Rect(this.defaults);
			this.canvas.add(this.board);
		}
		this.board.set({
			id: "logBoard",
            left: this.left,
            top: this.top,
            fill: "#dddddd",
            stroke: "#dddddd",
            rx : 10,
            ry : 10,
            width: this.width,
            height: this.height,
            angle: 0
        });
        if (!this.heading) {
        	this.heading = new fabric.Text(this.caption, this.defaults);
        	this.canvas.add(this.heading);
        }
        this.heading.set({
			fontFamily: 'Helvetica',
		  	fontSize: 10 * this.zoomFactor,
		  	fill: "rgba(10,10,10,1.0)",
		  	left: entryLeft,
			top: this.top + entryHeight,
			id: "logCaption",
			originY: "top",
			selectable:false
		});
        
  		for(e = 0; e < this.entries.length; e++) {
			if (!this.fabEntries[e]) {
				this.fabEntries[e] = {
					time: new fabric.Text(this.entries[e].time, this.defaults),
					userName: new fabric.Text(this.entries[e].name, this.defaults),
					userImg: this.imageLoader.getImage(this.entries[e].time + this.entries[e].id),
				}
				this.canvas.add(this.fabEntries[e].time);
				this.canvas.add(this.fabEntries[e].userName);
				this.canvas.add(this.fabEntries[e].userImg);
			}
			this.fabEntries[e].time.set({
				fontFamily: 'Helvetica',
			  	fontSize: 7 * this.zoomFactor,
			  	fill: "rgba(10,10,10,1.0)",
			  	left: entryLeft,
				top: this.top + (2*e + 3) * entryHeight,
				id: this.entries[e].time + this.entries[e].id,
				originY: "center",
				selectable:false
			});
			
			this.fabEntries[e].userName.set({
				fontFamily: 'Helvetica',
			  	fontSize: 7 * this.zoomFactor,
			  	fill: "rgba(10,10,10,1.0)",
			  	left: entryLeft + 0.3*this.width,
				top: this.top + (2*e + 3.6) * entryHeight,
				id: this.entries[e].time + this.entries[e].id,
				originY: "center",
				selectable:false
			});

			this.fabEntries[e].userImg.set({
				width: entryWidth * 0.6,
				height: entryHeight * 0.6,
				//stroke: this.selectedColor,
				left: entryLeft + 0.6*this.width,
				top: this.top + (2*e + 3) * entryHeight,
				id: this.entries[e].time + this.entries[e].id
			});
			this.fabEntries[e].in.on('selected',this.checkEntry.bind(this));
			console.log("added : " + this.entries[e].id);
		}
		return this;
	},
	
	hide: function(){
		this.board.set({visible: false});
		this.heading.set({visible: false});
		for(var e in this.fabEntries) {
			this.fabEntries[e].time.set({visible: false});
			this.fabEntries[e].userName.set({visible: false});
			this.fabEntries[e].userImg.set({visible: false});
		}
		this.showing = false;
	},
	show: function(){
		this.board.set({visible: true});
		this.heading.set({visible: true});
		for(var e in this.fabEntries) {
			this.fabEntries[e].time.set({visible: true});
			this.fabEntries[e].userName.set({visible: true});
			this.fabEntries[e].userImg.set({visible: true});
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

