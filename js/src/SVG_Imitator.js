var SVG_Imitator = Class.extend({
	set: function (data) {
		for (var key in data) {
			if (data.hasOwnProperty(key)===true) {
				this[key] = data[key];
			}
		}
		this.draw();
	},
	draw: function() {
		
	}
});