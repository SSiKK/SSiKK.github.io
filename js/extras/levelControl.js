var levelControl = Class.extend({
	construct: function (){
		arguments.callee.superClass.construct.call(this);
		this.canvas = null;
		this.left = 0;
		this.top = 0;
		this.width = 0;
		this.name = null;
		this.kidMode = null;
		this.currentlevel = 0;
		this.maxLevel = 0;
		this.colors = null;
		this.inactiveLevelColor = null;
		this.inactiveButtonColor = null;
		this.activeButtonColor = null;
		this.higherLevelColor = null;
		this.nameTextColor = null;
		this.isActive = false;
	},
	init: function(data){
		this.colors = data.colors;
		this.inactiveLevelColor = "rgb(124, 136, 136)";
		this.higherLevelColor = "rgb(70,68,80)";
		this.inactiveButtonColor = "rgb(124, 136, 136)";
		this.activeButtonColor = "rgb(230,230,245)";
		this.nameTextColor = "rgb(220,230,240)";
		this.name = data.name;
		this.scaleFactor = data.scale;
		this.currentlevel = 7;
		this.maxLevel = 9;
		this.isActive = true;
		this.kidMode = false;
	},
	setLevel: function(level){
		this.currentlevel = level;
		this.refresh();
	},
	getLevel: function() {
		return this.currentlevel;
	}, 
	decreaseLevel: function(){
		if (this.currentlevel > 0){
			this.currentlevel = this.currentlevel - 1;	
		}
		this.refresh();
	},
	increaseLevel: function(){
		if (this.currentlevel < this.maxLevel){
			this.currentlevel = this.currentlevel + 1;	
		}
		this.refresh();
	},
	toggleKidsMode: function(state){
		if (state === this.kidMode) return;
		if (this.kidMode){
			this.maxLevel = this.maxLevel + 3;
		} else {
			this.maxLevel = this.maxLevel - 3;
		}
		this.kidMode = !this.kidMode;
		this.refresh();
	},
	draw: function(canvas, data){
		this.canvas = canvas;
		this.left = data.left;
		this.top = data.top;
		this.width = data.width;
		this.height = data.height;
		this.background = new fabric.Rect({
			id: "controlBackground",
			fill: 'rgb(65,73,70)',
			strokeWidth: 0,
			width: this.width,
			height: this.height,
			angle: 0
		});
		this.background.hasControls = this.background.hasBorders = false;
		this.background.lockMovementX = this.background.lockMovementY = true;
		this.background.set({
			left: this.left,
			top: this.top
		});
	 	this.canvas.add(this.background);
	 	this.downButton = new fabric.Triangle({
	 		id: "downButton",
  			fill: this.activeButtonColor,
			stroke: 'black',
			width: this.width * 0.6,
			height: this.height/10.0,
			angle: 180
		});
		this.downButton.hasControls = this.downButton.hasBorders = false;
		this.downButton.lockMovementX = this.downButton.lockMovementY = true;
		this.downButton.set({
			left: this.left + (this.width + this.downButton.width)/2 + 1 ,
			top: this.top + this.height - 4
		});
		this.canvas.add(this.downButton);
		this.upButton = new fabric.Triangle({
			id: "upButton",
  			fill: this.activeButtonColor,
			stroke: 'black',
			width: this.width * 0.6,
			height: this.height/10.0,
			angle: 0
		});
		this.upButton.hasControls = this.upButton.hasBorders = false;
		this.upButton.lockMovementX = this.upButton.lockMovementY = true;
		this.upButton.set({
			left: this.left + (this.width - this.upButton.width)/2 ,
			top: this.top + this.height * 0.7
		});

		this.canvas.add(this.upButton);
		this.upButton.on('selected', function(options) {
		  this.increaseLevel();
		}.bind(this));
		this.downButton.on('selected', function(options) {
		  this.decreaseLevel();
		}.bind(this));
		this.addNameText(languageDictionary[languageSelector][this.name], {left:11,top:this.height*0.82});
		this.buildLevels();
		this.refresh();
	},
	reposition: function(data){
		this.left = data.left;
		this.top = data.top;
		this.background.set({
			left: this.left,
			top: this.top
		});
		this.upButton.set({
			left: this.left + (this.width - this.upButton.width)/2 ,
			top:  this.top + this.height * 0.7
		});
		this.downButton.set({
			left: this.left + (this.width + this.downButton.width)/2 + 1 ,
			top: this.top + this.height - 4
		});
		var deltaW = this.width/30 ;
		var deltaH = this.height/25 ;
		for (var i=0; i<10; i++){
			var tempW = this.width*0.3 + i * deltaW;
			this.levelIndicators[i].set({
				left: this.left + (this.width - tempW)/2,
				top: this.top + (16 - 1.5*i) * deltaH
			});
		}
		var offset = (this.width - this.nameText.width)/2.0;		
		this.nameText.set({
			left:(this.left + offset),
			top: this.top + this.textTopOffset
		});
		this.canvas.deactivateAll().renderAll();
	},
	buildLevels: function(){
		this.levelIndicators = [];
		var deltaW = this.width/30 ;
		var deltaH = this.height/25 ;
		for (var i=0; i<10; i++){
			var tempW = this.width*0.3 + i * deltaW;
			var indicator = new fabric.Rect({
				fill: 'rgb(210,160,160)',
				strokeWidth: 0,
				width: tempW,
				height: deltaH,
				angle: 0,
				shadow: 'rgba(160,160,160,0.8) 0 0 2px'
			});
			indicator.hasControls = indicator.hasBorders = false;
			indicator.lockMovementX = indicator.lockMovementY = true;
			indicator.set({
				left: this.left + (this.width - tempW)/2,
				top: this.top + (16 - 1.5*i) * deltaH
			});
			this.canvas.add(indicator);
			this.levelIndicators.push(indicator);
		}
	},
	addNameText: function(text, position){
		this.textTopOffset = position.top;
		this.nameText = new fabric.Text(text, {
			fontFamily: 'Helvetica',
		  	fontSize: 11,
		  	fill: this.nameTextColor,
		  	left: this.left + (16 - text.length),
		  	top: this.top + this.textTopOffset
		});
		this.nameText.hasControls = this.nameText.hasBorders = false;
		this.nameText.lockMovementX = this.nameText.lockMovementY = true;
		
		this.canvas.add(this.nameText);
	},
	toggleActive: function(){
		this.isActive = !this.isActive;
		this.refresh();
	},
	changeNameText: function(){
		var temp = languageDictionary[languageSelector][this.name];
		this.nameText.set("text",temp);
		var offset = (this.width - this.nameText.width)/2.0;		
		this.nameText.set("left",(this.left + offset) * this.scaleFactor);
		console.log(this.nameText.width);
		this.canvas.renderAll();
	},
	refresh: function(){
		var i=0;
		if (this.isActive){
			this.upButton.set({
				fill: this.activeButtonColor,
				selectable: true
			});
			this.downButton.set({
				fill: this.activeButtonColor,
				selectable: true
			});
			for (i=0; i<=this.currentlevel; i++){
				this.levelIndicators[i].set({
					fill: this.colors[this.currentlevel]
				});
			}
			for (i=this.currentlevel+1; i<=this.maxLevel; i++){
				this.levelIndicators[i].set({
					fill: this.higherLevelColor
				})
			}
			for (i=this.maxLevel+1; i<10; i++){
				this.levelIndicators[i].set({
					fill: this.inactiveLevelColor
				})
			}
		} else {
			for (var i=0; i<10; i++){
				this.levelIndicators[i].set({
					fill: this.inactiveLevelColor
				});
			}
			this.upButton.set({
				fill: this.inactiveButtonColor,
				selectable: false
			});
			this.downButton.set({
				fill: this.inactiveButtonColor,
				selectable: false
			});
		}
		console.log("getting refreshed!")
		this.canvas.deactivateAll().renderAll();
	}

});
