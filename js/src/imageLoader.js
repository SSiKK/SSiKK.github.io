var YDYW_imageLoader = Class.extend({
	init: function (data) {
		this.images = {};
		this.patterns = {};
		this.addImage({url:"js/assets/img/profiles/dishonored.jpg", id:"donald"});
		this.addPattern({url:"js/assets/img/profiles/dishonored.jpg", id:"donald"});
	},
	addImage: function (data) {
		fabric.Image.fromURL(data.url, function(img) {
			this.images[data.id] = img;
		}.bind(this));

	},
	addPattern: function(data) {
		fabric.Image.fromURL(data.url, function(img) {
			this.patterns[data.id] = img;
		}.bind(this));
	},
	getImage: function (id) {
		return this.images[id] || this.images["donald"];
	},

	getPattern: function (id, width, height, padding,repeat) {
		var pattern;
		if (!padding) padding = 1;
		var img = this.patterns[id] || this.patterns["donald"];
		img.scaleToWidth(width);

	    var patternSourceCanvas = new fabric.StaticCanvas();
	    patternSourceCanvas.add(img);

	    pattern = new fabric.Pattern({
	    	source: function() {
		        patternSourceCanvas.setDimensions({
		          width: img.getWidth() + padding,
		          height: img.getHeight() + padding
		        });
		        return patternSourceCanvas.getElement();
	      	},
	      	repeat: repeat || 'no-repeat'
	    });

		
		return pattern;
	},
	getImageIDs: function() {
		return Object.keys(this.images);
	},
	getPatternIDs: function() {
		return Object.keys(this.patterns);
	}
});







