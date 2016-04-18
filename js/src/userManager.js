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
		this.users[user.id] = user;
	},
	addUserData: function (data) {
		if(this.users.hasOwnProperty(data.id) === true) {
			var user = this.users[data.id];
			user.name = data.name || user.name;
			user.img = data.img || user.img;
			user.passCode = data.passCode || user.passCode;
			user.handPrint = data.handPrint || user.handPrint;
		}
	},
	lookUpUser: function (id) {
		return this.users[id];
	},
	
	getIDs: function() {
		return Object.keys(this.users);
	}
});