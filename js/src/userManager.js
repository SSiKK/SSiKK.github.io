var YDYW_userManager = Class.extend({
	init: function (data) {
		this.users = {};
		

	},
	addUser: function (data) {
		data || (data = {});
		var user = {
			src: data.src || 'js/assets/sound/doorBell1.mp3',
			img: data.img || 'js/assets/img/icons/people1.jpg',
			id:  data.id || "doorBell"
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