var YDYW_languageManager = Class.extend({
	init: function (data) {
		this.langauges = {};
		this.current = "english";
		this.setTextCallbacks = [];
		this.populateDictionary();
	},

	setLanguage: function(lang) {
		if (this.langauges.hasOwnProperty(lang) === true) {
			this.current = lang;
		}
		for (var i in this.setTextCallbacks) {
			this.setTextCallbacks[i](this.langauges[this.current]);
		}
	},
	
	addSetTextCallback: function(callback) {
		this.setTextCallbacks.push(callback);
	},
	getLanguages: function() {
		return Object.keys(this.langauges);
	},

	getText: function(id) {
		return this.langauges[this.current][id] || id;
	},
	populateDictionary: function() {
		this.langauges = {
			english:{
				language: "Language",
				temperature: "Temperature",
				flow: "Rate of flow",
				kidModeOn: "Kids mode",
				kidModeOff: "Adults mode",
				presets: "Presets",
				doorBell: "Door Bell",
				crow: "Crow"
			},
			kannada: {
				language: "ಭಾಷೆ",
				temperature: "ತಾಪಮಾನ",
				flow: "ಹರಿವಿನ ಪ್ರಮಾಣ",
				kidModeOn: "ಮಕ್ಕಳ ಮೋಡ್",
				kidModeOff: "ವಯಸ್ಕರ ಮೋಡ್",
				presets: "ಪೂರ್ವನಿಗದಿಗಳು",
				doorBell: "ಬಾಗಿಲ ಗಂಟೆ",
				crow: "ಕಾಗೆ"
			},
			hindi: {
				language: "भाषा",
				temperature: "तापमान",
				flow: "प्रवाह की दर",
				kidModeOn: "बच्चोंका मोड़",
				kidModeOff: "बड़ोंका मोड़",
				presets: "प्रीसेट",
				doorBell: "दर्वाज़ी की घंटी",
				crow: "कौआ"
			},
			spanish: {
				language: "Idioma",
				temperature: "तापमान",
				flow: "प्रवाह की दर",
				kidModeOn: "बच्चोंका मोड़",
				kidModeOff: "बड़ोंका मोड़",
				presets: "प्रीसेट",
				doorBell: "timbre de la puerta",
				crow: "cuervo"
			},
			italian: {
				language: "Lingua",
				doorBell: "campanello di casa",
				crow: "corvo"
			}
		};	
	}
});