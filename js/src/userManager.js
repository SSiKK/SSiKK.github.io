var YDYW_userManager = Class.extend({
	init: function (data) {
		this.users = {};
		

	},
	addUser: function (data) {
		data || (data = {});
		var user = {
			name: data.name || 'Jane',
			img: data.img || 'js/assets/img/icons/people1.jpg',
			id:  (data.name || "Jane") + Date.now(),
			passCode: data.passCode || '1234',
			handPrint: data.handPrint
		};
		sound.audioObj = new Audio(sound.src);
		this.sounds[sound.id] = sound;
	},
	lookUpSound: function (id) {
		return this.sounds[id];
	},
	play: function () {
		this.sounds[this.current].audioObj.play();
	},
	setCurrent: function (id) {
		this.current = id;
	},
	getIDs: function() {
		return Object.keys(this.sounds);
	}
});