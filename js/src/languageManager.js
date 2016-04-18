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
				crow: "Crow",
				violin: "Violin",
				harmonica: "Harmonica",
				trumpet: "Trumpet",

				// welcome
	    		hiName: "Hello, Name!",
	    		hasPhoneInstruct: "If you would like to change your profile picture, touch the camera or choose a photo",
	    		getKnowU: "Getting to know you...",
	    		noPhoneInstruct: "Touch the camera icon to take your profile picture\nOR\nswipe through the array of available photos",
	    		fTfKeys: "First things first. Keys...",
	    		handInstruct: "Place your hand in the space provided",
	    		greenHand: "Great! Now you can user your hand-print to unlock your door!",
	    		sweet: "SWEET",
	    		aFewMore: "A couple more things and you are all set"
			},
			kannada: {
				language: "ಭಾಷೆ",
				temperature: "ತಾಪಮಾನ",
				flow: "ಹರಿವಿನ ಪ್ರಮಾಣ",
				kidModeOn: "ಮಕ್ಕಳ ಮೋಡ್",
				kidModeOff: "ವಯಸ್ಕರ ಮೋಡ್",
				presets: "ಪೂರ್ವನಿಗದಿಗಳು",
				doorBell: "ಬಾಗಿಲ ಗಂಟೆ",
				crow: "ಕಾಗೆ",
				violin: "ಪಿಟೀಲು",
				harmonica:"ಹಾರ್ಮೋನಿಕಾ",
				trumpet: "ಕಹಳೆ",

				// welcome
	    		hiName: "ಹಲೋ, ಹೆಸರು!",
	    		hasPhoneInstruct: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಚಿತ್ರ ಬದಲಾಯಿಸಲು ಬಯಸುತ್ತೀರಿ, ಕ್ಯಾಮರಾ ಸ್ಪರ್ಶಕ್ಕೆ ಅಥವಾ ಫೋಟೋ ಆಯ್ಕೆ",
	    		getKnowU: "ನೀವು ತಿಳಿಯಲು ಗೆಟ್ಟಿಂಗ್ ...",
	    		noPhoneInstruct: "ಕ್ಯಾಮರಾ ಐಕಾನ್ ಲಭ್ಯವಿರುವ ಛಾಯಾಚಿತ್ರಗಳನ್ನು ರಚನೆಯ ಮೂಲಕ ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಚಿತ್ರ ಅಥವಾ ಸ್ವೈಪ್ ತೆಗೆದುಕೊಳ್ಳಲು ಟಚ್",
	    		fTfKeys: "ಮೊದಲ ವಿಷಯಗಳು ಮೊದಲು. ಕೀಸ್ ...",
	    		handInstruct: "ಜಾಗದಲ್ಲಿ ನಿಮ್ಮ ಕೈ ಇರಿಸಿ",
	    		greenHand: "ಗ್ರೇಟ್! ಈಗ ನೀವು ಬಳಕೆದಾರ ನಿಮ್ಮ ಬಾಗಿಲು ಅನ್ಲಾಕ್ ನಿಮ್ಮ ಕೈ ಮುದ್ರಿಸಬಹುದು!",
	    		sweet: "ಸಿಹಿ",
	    		aFewMore: "ಒಂದೆರಡು ಹೆಚ್ಚು ವಿಷಯಗಳನ್ನು ಮತ್ತು ನೀವು ಎಲ್ಲಾ ಸೆಟ್ ಇವೆ",
			},
			hindi: {
				language: "भाषा",
				temperature: "तापमान",
				flow: "प्रवाह की दर",
				kidModeOn: "बच्चोंका मोड़",
				kidModeOff: "बड़ोंका मोड़",
				presets: "प्रीसेट",
				doorBell: "दर्वाज़ी की घंटी",
				crow: "कौआ",
				violin: "वायोलिन",
				harmonica: "अकार्डियन",
				trumpet: "तुरही",
				// welcome
				hiName: "हैलो, नाम!",
				hasPhoneInstruct: "यदि आप अपने प्रोफ़ाइल तस्वीर बदलने के लिए चाहते हैं, तो कैमरे को छूने या एक तस्वीर का चयन",
				getKnowU: "तुम्हें समझ रहा हूं...",
				noPhoneInstruct: "उपलब्ध तस्वीरों की सरणी के माध्यम से अपने प्रोफ़ाइल चित्र या ज़ोर से मारना लेने के लिए कैमरा आइकन स्पर्श करें",
				fTfKeys: "सबसे पहली बात। कुंजी ...",
				handInstruct: "प्रदान की अंतरिक्ष में अपने हाथ की जगह",
				greenHand: "वाह! अब आप उपयोगकर्ता अपने हाथ-प्रिंट अपने दरवाजे अनलॉक करने के लिए कर सकते हैं!",
				sweet: "मिठाई",
				aFewMore: "कुछ और बातें और तुम सब सेट कर रहे हैं"


			},
			spanish: {
				language: "Idioma",
				temperature: "तापमान",
				flow: "प्रवाह की दर",
				kidModeOn: "बच्चोंका मोड़",
				kidModeOff: "बड़ोंका मोड़",
				presets: "प्रीसेट",
				doorBell: "timbre de la puerta",
				crow: "cuervo",
				violin: "violín",
				harmonica: "harmónica",
				trumpet: "trompeta",

				// welcome
	    		hiName: "Hola, Nombre!",
	    		hasPhoneInstruct: "Si usted quiere cambiar su imagen de perfil, toque la cámara o elegir una foto",
	    		getKnowU: "Conocer a usted...",
	    		noPhoneInstruct: "Toca el icono de la cámara para tomar su foto de perfil o pase a través de la serie de fotos disponibles",
	    		fTfKeys: "Lo primero es lo primero. Claves ...",
	    		handInstruct: "Ponga su mano en el espacio proporcionado",
	    		greenHand: "Great! Ahora puedes usuario de su mano de impresión para desbloquear la puerta!",
	    		sweet: "SUAVE",
	    		aFewMore: "Un par de cosas más y que está todo listo"
			},
			italian: {
				language: "Lingua",
				doorBell: "campanello di casa",
				crow: "corvo",
				violin: "violino",
				harmonica: "armonica a bocca",
				trumpet: "tromba",

				// welcome
	    		hiName: "Ciao, nome!",
	    		hasPhoneInstruct: "Se si desidera cambiare la tua immagine del profilo, toccare la fotocamera o scegliere una foto",
	    		getKnowU: "Conoscerti, riuscire a conoscerti...",
	    		noPhoneInstruct: "Toccare l'icona della fotocamera per scattare una foto o strisciare il profilo attraverso la serie di fotografie",
	    		fTfKeys: "Per prima cosa. Le chiavi ...",
	    		handInstruct: "Mettere la mano nell'apposito spazio",
	    		greenHand: "Grande! Ora è possibile all'utente la mano-stampa per sbloccare la porta!",
	    		sweet: "Bravo",
	    		aFewMore: "Un paio di cose e voi siete tutti insieme"

			}
		};
	}
});