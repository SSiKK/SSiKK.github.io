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
			English:{
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
				chimes: "Chimes",
				childSafety: "Child Safety",
				keys: "Keys",
				homeAlarm: "Home Alarm",
				users: "Users",
				camera: "Camera",
				mirror: "Mirror",
				notes: "Notes",
				maps: "Maps",
				theme: "Theme",
				emergency: "Emergency",
				tutorial: "Tutorial",
				log: "Door Log",

				// welcome
	    		hiName: "Hello, Name!",
	    		hasPhoneInstruct: "If you would like to\nchange your profile\npicture, touch the\ncamera or choose a\nphoto",
	    		getKnowU: "Getting to know you...",
	    		noPhoneInstruct: "Touch the camera icon to take your profile picture\n         OR\nswipe through the array of\navailable photos",
	    		fTfKeys: "First things first. Keys...",
	    		handInstruct: "Place your hand in the\n     space provided",
	    		greenHand: "Great! Now you can user your\nhand-print to unlock your door!",
	    		sweet: "SWEET",
	    		aFewMore: "A couple more things\nand you are all set",

	            callFire: "Calling Fire Department",
	            callPolice:  "Calling Police Department"

			},

			"ಕನ್ನಡ": {
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
				chimes: "ಘಂಟಾಮೇಳ",
				childSafety: "ಮಕ್ಕಳ ಸುರಕ್ಷತೆ",
				keys: "ಕೀಲಿಗಳು",
				homeAlarm: "ಮನೆ ಅಲಾರ್ಮ್",
				users: "ಬಳಕೆದಾರರು",
				camera: "ಕ್ಯಾಮೆರಾ",
				mirror: "ಕನ್ನಡಿ",
				notes: "ಕ್ಯೆಪತ್ರ",
				maps: "ನಕ್ಷೆಗಳು",
				theme: "ವಿಷಯ",
				emergency: "ತುರ್ತುಸ್ಥಿತಿ",
				tutorial: "ಟ್ಯುಟೋರಿಯಲ್",
				log: "ದಾಖಲೆ",

				// welcome
	    		hiName: "ಹಲೋ, ಹೆಸರು!",
	    		hasPhoneInstruct: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಚಿತ್ರ\nಬದಲಾಯಿಸಲು ಬಯಸುತ್ತೀರಿ,\nಕ್ಯಾಮರಾ ಸ್ಪರ್ಶಕ್ಕೆ\nಅಥವಾ ಫೋಟೋ ಆಯ್ಕೆ",
	    		getKnowU: "ನೀವು ತಿಳಿಯಲು ಗೆಟ್ಟಿಂಗ್ ...",
	    		noPhoneInstruct: "ಕ್ಯಾಮರಾ ಐಕಾನ್ ಲಭ್ಯವಿರುವ\nಛಾಯಾಚಿತ್ರಗಳನ್ನು ರಚನೆಯ ಮೂಲಕ\nನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಚಿತ್ರ ಅಥವಾ\nಸ್ವೈಪ್ ತೆಗೆದುಕೊಳ್ಳಲು ಟಚ್",
	    		fTfKeys: "ಮೊದಲ ವಿಷಯಗಳು ಮೊದಲು. ಕೀಸ್ ...",
	    		handInstruct: "ಜಾಗದಲ್ಲಿ ನಿಮ್ಮ ಕೈ ಇರಿಸಿ",
	    		greenHand: "ಗ್ರೇಟ್! ಈಗ ನೀವು ಬಳಕೆದಾರ\nನಿಮ್ಮ ಬಾಗಿಲು ಅನ್ಲಾಕ್\nನಿಮ್ಮ ಕೈ ಮುದ್ರಿಸಬಹುದು!",
	    		sweet: "ಸಿಹಿ",
	    		aFewMore: "ಒಂದೆರಡು ಹೆಚ್ಚು\nವಿಷಯಗಳನ್ನು ಮತ್ತು\nನೀವು ಎಲ್ಲಾ ಸೆಟ್ ಇವೆ",

	            callFire: "ಫೈರ್ ಡಿಪಾರ್ಟ್ಮೆಂಟ್ ಕರೆ",
	            callPolice:  "ಪೊಲೀಸ್ ಇಲಾಖೆ ಕರೆ"




			},
			"हिंदी": {
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
				chimes: "झंकार",
				childSafety: "बच्चों की सुरक्षा",
				keys: "चांबियाँ",
				homeAlarm: "घर अलार्म",
				users: "उपयोगकर्ताओं",
				camera: "कैमरा",
				mirror: "आईना",
				notes: "टिप्पणियाँ",
				maps: "नक्शे",
				theme: "विषय",
				emergency: "आपातकालीन",
				tutorial: "ट्यूटोरियल",
				log: "अभिलेख",

				// welcome
				hiName: "हैलो, नाम!",
				hasPhoneInstruct: "यदि आप अपने\nप्रोफ़ाइल तस्वीर\nबदलने के लिए चाहते\nहैं, तो कैमरे को छूने\nया एक तस्वीर का चयन",
				getKnowU: "तुम्हें समझ रहा हूं...",
				noPhoneInstruct: "उपलब्ध तस्वीरों की सरणी के माध्यम से अपने प्रोफ़ाइल चित्र या ज़ोर से मारना लेने के लिए कैमरा आइकन स्पर्श करें",
				fTfKeys: "सबसे पहली बात। कुंजी ...",
				handInstruct: "प्रदान की अंतरिक्ष में अपने हाथ की जगह",
				greenHand: "वाह! अब आप उपयोगकर्ता अपने हाथ-प्रिंट अपने दरवाजे अनलॉक करने के लिए कर सकते हैं!",
				sweet: "मिठाई",
				aFewMore: "कुछ और बातें और तुम सब सेट कर रहे हैं",

	            callFire: "फायर विभाग कॉलिंग",
	            callPolice:  "पुलिस विभाग कॉलिंग"



			},
			"Español": {
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
				chimes: "campaneo",
				childSafety: "seguridad infantil",
				keys: "Llaves",
				homeAlarm: "Alarma hogar",
				users: "Usuarios",
				camera: "Cámara",
				mirror: "Espejo",
				notes: "La nota",
				maps: "Mapas",
				theme: "Tema",
				emergency: "Emergencia",
				tutorial: "Tutorial",
				log: "La log",

				// welcome
	    		hiName: "Hola, Nombre!",
	    		hasPhoneInstruct: "Si usted quiere cambiar su imagen de perfil, toque la cámara o elegir una foto",
	    		getKnowU: "Conocer a usted...",
	    		noPhoneInstruct: "Toca el icono de la cámara para tomar su foto de perfil o pase a través de la serie de fotos disponibles",
	    		fTfKeys: "Lo primero es lo primero. Claves ...",
	    		handInstruct: "Ponga su mano en el espacio proporcionado",
	    		greenHand: "Great! Ahora puedes usuario de su mano de impresión para desbloquear la puerta!",
	    		sweet: "SUAVE",
	    		aFewMore: "Un par de cosas más y que está todo listo",

	            callFire: "Llamando al Departamento de Bomberos",
	            callPolice:  "Llamando al Departamento de Policía"



			},
			"Italiano": {
				language: "Lingua",
				doorBell: "campanello di casa",
				crow: "corvo",
				violin: "violino",
				harmonica: "armonica a bocca",
				trumpet: "tromba",
				chimes: "Chime",
				childSafety: "Bambino sicuro",
				keys: "Chiavi",
				homeAlarm: "Casa di allarme",
				users: "Utenti",
				camera: "La telecamera",
				mirror: "Specchio",
				notes: "Note",
				maps: "Mappe",
				theme: "Tema",
				emergency: "Emergenza",
				tutorial: "Lezione",
				log: "il record",

				// welcome
	    		hiName: "Ciao, nome!",
	    		hasPhoneInstruct: "Se si desidera cambiare la tua immagine del profilo, toccare la fotocamera o scegliere una foto",
	    		getKnowU: "Conoscerti, riuscire a conoscerti...",
	    		noPhoneInstruct: "Toccare l'icona della fotocamera per scattare una foto o strisciare il profilo attraverso la serie di fotografie",
	    		fTfKeys: "Per prima cosa. Le chiavi ...",
	    		handInstruct: "Mettere la mano nell'apposito spazio",
	    		greenHand: "Grande! Ora è possibile all'utente la mano-stampa per sbloccare la porta!",
	    		sweet: "Bravo",
	    		aFewMore: "Un paio di cose e voi siete tutti insieme",

	            callFire: "Chiamare Vigili del Fuoco",
	            callPolice:  "Chiamata Dipartimento di Polizia"



			}
		};
	}
});