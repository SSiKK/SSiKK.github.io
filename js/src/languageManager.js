var YDYW_languageManager = Class.extend({
	init: function (data) {
		this.langauges = {};
		this.current = "english";

	},
	addSound: function (data) {
		data || (data = {});
		var sound = {
			src: data.src || 'js/assets/sound/doorBell1.mp3',
			img: data.img || 'js/assets/img/icons/doorbell.jpg',
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
		this.sounds.keys();
	}
});