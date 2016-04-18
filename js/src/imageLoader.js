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
		fabric.util.loadImage(data.url, function(img) {
			this.patterns[data.id] = new fabric.Pattern({
				source: img,
				repeat: "repeat"
			});			
		}.bind(this));
	},
	getImage: function (id) {
		return this.images[id] || this.images["donald"];
	},

	getPattern: function (id) {
		var p = this.patterns[id] || this.patterns["donald"];
		return p;
	},
	getImageIDs: function() {
		return Object.keys(this.images);
	},
	getPatternIDs: function() {
		return Object.keys(this.patterns);
	}
});







