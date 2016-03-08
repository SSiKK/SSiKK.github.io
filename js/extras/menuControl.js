var menuControl = Class.extend({
	construct: function () {
		this.menuItems = null;
	},
	init: function(data) {
		this.menuItems = [];
		this.scaleFactor = data.scale;
		this.name = data.name;
		this.entries = [];
		this.fontSize = 6;
		this.currentItem = 0;
		this.showAll = false;
		this.nameTextColor = "rgb(220,230,240)";
		this.backgroundColor = 'rgb(65,73,70)';
		this.itemBackgroundColor = 'rgb(220,220,220)';
		this.itemBackgroundShadow = 'rgba(160,160,160,0.8) 0 0 2px';
		this.changesLanguage = data.changesLanguage || false;

	},
	addMenuItemList : function(data){
		this.menuItems = data.items;
		this.callback = data.callback;
	},
	draw: function(canvas, data) {
		this.canvas = canvas;
		this.left = data.left;
		this.top = data.top;
		this.width = data.width;
		this.height = data.height;
		
		var len = this.menuItems.length;
		var deltaH = this.height / (1.1*len + 1.5);
		this.background = new fabric.Rect({
			id: "menuBackground",
			fill: this.backgroundColor,
			strokeWidth: 0,
			width: this.width,
			angle: 0,
			selectable: false
		});
		this.background.hasControls = this.background.hasBorders = false;
		this.background.lockMovementX = this.background.lockMovementY = true;
		this.background.set({
			left: this.left,
			top: this.top
		});
		this.nameText = new fabric.Text(this.name, {
			id: this.name,
			fontFamily: 'Helvetica',
		  	fontSize: 14,
		  	fill: this.nameTextColor,
		  	selectable: false,
		  	left: this.left + this.width * 0.05,
			top: this.top + 0.5*deltaH 
		});
		this.nameText.hasControls = this.nameText.hasBorders = false;
		this.nameText.lockMovementX = this.nameText.lockMovementY = true;
	 	this.canvas.add(this.background);
	 	this.canvas.add(this.nameText);
	 	this.buildEntries();
	},
	
	buildEntries: function() {
		this.entries = [];
		var len = this.menuItems.length;
		var start = 0;
		var end = len;		
		var deltaH = this.height / (1.1*len + 1.5);
		this.background.set("height", 2.6 * deltaH);
		for (var i=start; i<end; i++){
			var item = this.menuItems[i];
			var itemBackground = new fabric.Rect({
				id: i.toString(),
				fill: this.itemBackgroundColor,
				strokeWidth: 0,
				width: this.width * 0.9,
				height: deltaH,
				angle: 0,
				visible:false, 
				selectable: false,
				shadow: this.itemBackgroundShadow
			});
			itemBackground.hasControls = itemBackground.hasBorders = false;
			itemBackground.lockMovementX = itemBackground.lockMovementY = true;
			itemBackground.set({
				left: this.left + this.width * 0.05,
				top: this.top + (1.5 + 1.1*i)*deltaH 
			});
			itemBackground.on('selected', function(options) {
				var id = this.canvas.getActiveObject().id;
			  	this.changeView(id);
			  	console.log(id);
			}.bind(this));
			if (this.changesLanguage) {
				item = languageDictionary[languageSelector][this.menuItems[i]];
			}
			console.log(item);
			var itemText = new fabric.Text(item, {
				id: i.toString(),
				fontFamily: 'Helvetica',
			  	fontSize: 12,
			  	fill: "rgb(65,88,88)",
			  	visible:false, 
			  	selectable: false
			});
			itemText.hasControls = itemText.hasBorders = false;
			itemText.lockMovementX = itemText.lockMovementY = true;
			this.canvas.add(itemBackground);
			this.canvas.add(itemText);
			
			this.entries.push({
				background: itemBackground, 
				itemText: itemText
			});
		}
		this.entries[0].background.set({visible:true, selectable: true});
		this.entries[0].itemText.set({visible:true, selectable: true});
		console.log(this.entries);
		this.canvas.deactivateAll().renderAll();
	},
	select: function(itemStr){
		this.changeView(itemStr);
		this.changeView(itemStr);
	},
	changeView: function(itemStr) {
		var itemNum = parseInt(itemStr);
		this.canvas.deactivateAll();
		var text;
		if (this.showAll){
			var len = this.entries.length;
			var deltaH = this.height / (1.1*len + 1.5);
			this.background.set({height: 2.6 * deltaH});
			for (i=1;i<this.entries.length;i++) {
				this.entries[i].background.set({visible:false, selectable: false});
				this.entries[i].itemText.set({visible:false, selectable: false});
			}
			if (this.changesLanguage) {
				text = languageDictionary[languageSelector][this.menuItems[itemNum]];
			} else {
				text = this.menuItems[itemNum];
			}
			this.entries[0].itemText.set({text: text});
			this.callback(this.menuItems[itemNum]);
		} else {
			this.background.set({height: this.height});
			if (this.changesLanguage) {
				this.changeNameText();
				text = languageDictionary[languageSelector][this.menuItems[0]];
			} else {
				text = this.menuItems[0];
			}
			this.entries[0].itemText.set({text: text});
			for (i=1;i<this.entries.length;i++) {
				this.entries[i].background.set({visible:true, selectable: true});
				this.entries[i].itemText.set({visible:true, selectable: true});
			}
			
		}
		
		this.showAll = !this.showAll;
	},
	changeUser: function(user) {
		this.user = user;
		
	},
	refresh: function(){
		var len = this.entries.length;
		var deltaH = this.height / (1.1*len + 1.5);
		var offsetLeft;
		var offsetTop = 0.2 * deltaH;
		var top;
		for (var i=0; i<this.entries.length; i++) {
			var entry = this.entries[i];
			var background = entry.background;
			background.set({
				left: (this.left + this.width * 0.05),
				top: (this.top + (1.5 + 1.1*i)*deltaH),
				width: this.width * 0.9 ,
				height: deltaH ,
			});
			var width = entry.itemText.width;
			var height = entry.itemText.height;
			top = entry.background.top;
			if (width > this.width*0.8){
				var text = entry.itemText.text;
				var lst = text.split(" ");
				if (lst.length > 1){
					text = lst.slice(0,lst.length/2).join(" ") + "\n" + lst.slice(lst.length/2).join(" ");
				} else {
					text = text.slice(0,text.length/2) + "\n" + text.slice(text.length/2);
				}
				
				entry.itemText.set({text: text});
				
				width = entry.itemText.width;
				height = entry.itemText.height;
			}
			//entry.itemText.set({fontSize: this.fontSize * this.scaleFactor});
			this.canvas.deactivateAll().renderAll();
			//offsetLeft = (this.width - width)/2.0;		
			entry.itemText.set("left",(this.left + this.width * 0.10));
			entry.itemText.set("top",top + (deltaH - height)/2.0);
			offsetTop = offsetTop + height + 0.2 * deltaH;
		}
		this.canvas.deactivateAll().renderAll();
	},
	reposition: function(data){
		this.left = data.left;
		this.top = data.top;
		var len = this.entries.length;
		var deltaH = this.height / (1.1*len + 1.5);
		this.background.set({
			left: this.left,
			top: this.top
		});
		this.nameText.set({
			left: this.left + this.width * 0.05,
			top: this.top + 0.5*deltaH 
		})
		this.refresh();
	},
	getCurrentValue: function(){
		return this.menuItems[this.currentItem];
	},
	changeNameText: function(){
		var temp = languageDictionary[languageSelector][this.name];
		this.nameText.set("text",temp);
		this.nameText.set("left",(this.left + this.width * 0.05) * this.scaleFactor);
		console.log(this.nameText.width);
		for (var i=0; i<this.entries.length; i++) {
			var entry = this.entries[i];
			var text = languageDictionary[languageSelector][this.menuItems[i]];
			entry.itemText.set({text: text});				
			//entry.itemText.set({fontSize: this.fontSize * this.scaleFactor});
			var offsetLeft = (this.width - this.nameText.width)/2.0;			
			entry.itemText.set("left",(this.left + this.width * 0.10) * this.scaleFactor);
		}
		this.canvas.deactivateAll().renderAll();
	},
	

});