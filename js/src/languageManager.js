var languageDictionary = {
	
};
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
		this.langauges.keys();
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
				waterOn: "Water on",
				waterOff: "Water off",
				bathOn: "Bath on",
				bathOff: "Bath off",
				sourceShower: "Select faucet",
				sourceFaucet: "Select shower",
				"Hot shower": "Hot shower",
				"Hot bath": "Hot bath",
				"Cold shower": "Cold shower",
				"Kid bath": "kid bath",
				"Comfortable bath": "Comfortable bath",
				"Kid in a beach": "Kid in a beach",
				"Presets": "Presets"
			},
			kannada: {
				language: "ಭಾಷೆ",
				temperature: "ತಾಪಮಾನ",
				flow: "ಹರಿವಿನ ಪ್ರಮಾಣ",
				kidModeOn: "ಮಕ್ಕಳ ಮೋಡ್",
				kidModeOff: "ವಯಸ್ಕರ ಮೋಡ್",
				waterOn: "ನೀರು ಬಿಡು",
				waterOff: "ನೀರು ನಿಲ್ಲಿಸು",
				bathOn: "ಸ್ನಾನ ಆನ್",
				bathOff: "ಸ್ನಾನ ಆಫ್",
				sourceShower: "ನಲ್ಲಿ ಆಯ್ದುಕೊಳ್ಳಿ",
				sourceFaucet: "ಸಿಂಪಿಣಿ ಆಯ್ದುಕೊಳ್ಳಿ",
				"Hot shower": "ಬಿಸಿನೀರಿನ ಸಿಂಪಿಣಿ",
				"Hot bath": "ಬಿಸಿನೀರಿನ ಸ್ನಾನ",
				"Cold shower": "ತಂಪಾದ ಸಿಂಪಿಣಿ",
				"Kid bath": "ಮಗು ಸ್ನಾನ",
				"Comfortable bath": "ಆರಾಮದಾಯಕ ಸ್ನಾನ",
				"Kid in a beach": "ಬೀಚ್ ನಲ್ಲಿ ಮಕ್ಕಳು",
				"Presets": "ಪೂರ್ವನಿಗದಿಗಳು"
			},
			hindi: {
				language: "भाषा",
				temperature: "तापमान",
				flow: "प्रवाह की दर",
				kidModeOn: "बच्चोंका मोड़",
				kidModeOff: "बड़ोंका मोड़",
				waterOn: "पानी चालू",
				waterOff: "पानी बंद",
				bathOn: "स्नान चालू",
				bathOff: "स्नान बंद",
				sourceShower: "नल चुने",
				sourceFaucet: "बौछार चुने",
				"Hot shower": "गरम बौछार",
				"Hot bath": "गरम स्नान",
				"Cold shower": "ठंडा बौछार",
				"Kid bath": "बच्चा स्नान",
				"Comfortable bath": "आरामदायक स्नान",
				"Kid in a beach": "तट पर बच्चे",
				"Presets": "प्रीसेट"
			}
		};	
	}
});