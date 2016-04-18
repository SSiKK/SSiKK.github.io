var YDYW_Welcome = SVG_Imitator.extend({
    init: function(canvas) { // Initialize
        //Attributes
        this.left = null;
        this.top = null;
        this.width = null;
        this.height = null;

        this.languageMgr = null;
        this.languageKeys = []; // Array containing keys to phrases that need to be translated
        this.languageEntries = {}; // Matching array containing tranlated phrases
        //create an array of images
        this.hipImagesArr = [];

        // Canvas on which the object is created.
        this.canvas = null;
        //Feature specific status flags
        this.on = false;
        if (canvas !== undefined && canvas !== null) {
            this.attachToCanvas(canvas);
        }
    },

    attachToCanvas: function(canvas) {
        this.canvas = canvas;
        this.buildLanguageEntries();
    },

    buildLanguageEntries: function() {
        var common = {
            originY: 'center',
            originX: 'center',
            left: this.left * 4,
            fontFamily: 'Helvetica',
            fontSize: 35
        }

        this.languageEntries = {
            hiName: new fabric.Text("Hello, Name!", common),
            hasPhoneInstruct: new fabric.Text("If you would like to change your profile picture, touch the camera or choose a photo", common),
            getKnowU: new fabric.Text("Getting to know you...", common),
            noPhoneInstruct: new fabric.Text("Touch the camera icon to take your profile picture\nOR\nswipe through the array of available photos", common),
            fTfKeys: new fabric.Text("First things first. Keys...", common),
            handInstruct: new fabric.Text("Place your hand in the space provided", common),
            greenHand: new fabric.Text("Great! Now you can user your hand-print to unlock your door!", common),
            sweet: new fabric.Text("SWEET", common),
            aFewMore: new fabric.Text("A couple more things and you are all set", common)
        }
    },

    draw: function() {
        // Draw
        console.log("being drawn!", this);
        //Have a selectable rect with
        this.languageMgr.addSetTextCallback(this.setTextCallback.bind(this));
        // this.floatingWelcome();
        this.chooseLangauge();

    },

    // Welcome State 1: Default
    floatingWelcome: function() {
        var that = this;
        // Make a subcanvas for adding animation.
        // Hand-ripple icon to go to Language screen
        var pointer;
        var welcomeText = ["Welcome!", "¡Bienvenido!", "Bienvenue!", "Witamy!", "ようこそ！", "欢迎！", "Välkomna!", "स्वागत है!"]

        textObjs = welcomeText.map(function(phrase) {
            return new fabric.Text(phrase, {
                originY: 'center',
                originX: 'center',
                left: fabric.util.getRandomInt(that.left + 100, that.left + 450),
                top: fabric.util.getRandomInt(that.top + 50, that.top + 900),
                fontFamily: 'Helvetica',
                fontSize: 35,
                movingLeft: !!Math.round(Math.random()),
                movingUp: !!Math.round(Math.random())

            })
        }).map(function(tex) {
            that.canvas.add(tex);
            return tex
        })

        var killID = setInterval(Animate, 10);


        new Promise(function(resolve, reject) {
            fabric.loadSVGFromURL('js/assets/svg/hand-ripple.svg', function(obj, opt) {
                resolve(fabric.util.groupSVGElements(obj, {
                    width: opt.width,
                    height: opt.height,
                    svgUid: opt.svgUid,
                    toBeParsed: opt.toBeParsed,
                    left: that.left + 700, //randomRange(that.left+100, that.left+450),
                    top: that.top + 800, //randomRange(that.top+50, that.top+900),
                    originX: 'center',
                    originY: 'center',
                    scaleX: 0.3,
                    scaleY: 0.3,
                    fill: 'white',
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    visible: true
                }))
            })
        })
            .then(function(result) {
                // Clear the page and
                result.on("selected", function() {
                    textObjs.map(function(tex) {
                        that.canvas.remove(tex)
                    })
                    that.canvas.remove(this)
                    clearInterval(killID)
                    that.chooseLangauge();
                })
                that.canvas.add(result)
            })

        // Needs to be Bounded!!!
        function Animate() {
            textObjs.forEach(function(tex) {
                tex.left += (tex.movingLeft ? 1 : -1)
                tex.top += (tex.movingUp ? 1 : -1)

                if (Math.round(Math.random() * 100) % 100 === 0) {
                    tex.movingLeft = !!Math.round(Math.random())
                    tex.movingUp = !!Math.round(Math.random())
                }
            })
            that.canvas.renderAll();
        }
    },

    // Welcome State 2
    chooseLangauge: function() {
        var that = this;
        //Promises with language icons.
        var languagePromises = [];

        for (var i = 0; i < 24; i++) {
			console.log(i, getLangCode(i));
            languagePromises.push(
                new Promise(function(resolve, reject) {
            		var url = 'js/assets/flags/byIndex/' + i + '.png'
                    fabric.Image.fromURL(url, function(img) {
                        resolve(img.set({
                            scaleX: .5,
                            scaleY: .5,
                            originX: 'center',
                            originY: 'center',
                            selectable: true,
                            hasControls: false,
                            hasBorders: false,
                            lockMovementX: true,
                            lockMovementY: true
                        }))
                    })
                })
            )
        }

        Promise.all(languagePromises)
            .then(function(results) {

                results.forEach(function(flag, i) {
                    var x = i % 4;
                    var y = Math.floor(i / 4);
                    console.log(i, x, y, flag );
                    flag.set({
                        top: that.top + 500 + (y * 250),
                        left: that.left + 200 + (x * 250)
                    })
                    // console.log(i, flag.positionID, getLangCode(flag.positionID), flag.code);
                    flag.on('selected', function() {
                    	console.log('flag selected!', getLangCode(i));
                        that.languageMgr.setLanguage(getLangCode(i));

                        results.forEach(function(lang) {
                            that.canvas.remove(lang);
                        })

                        that.newUserImageCapture();

                    })
                    that.canvas.add(flag);
                })

                // 13: italian
                // 9: hindi
                // 2,3,8,12: english
                // 7,19,20,23
            })
    },

    // Welcome State 3
    newUserImageCapture: function() {
        var that = this;
        // New user provided with camera and an array of hip images to set his profile picture.

        var hipPromises = [];

        this.canvas.add(
        	this.languageEntries['hiName'].set({
            'fontSize': 80,
            'top': that.top + 500,
            'left': that.left + 700
        }));

        for (var i = 0; i < 5; i++) {
            url = 'js/assets/img/profiles/p' + i + '.jpg'
            hipPromises.push(
                new Promise(function(resolve, reject) {
                    fabric.Image.fromURL(url,
                        function(img) {
                            resolve(img.set({
                                scaleX: .1,
                                scaleY: .1,
                                originX: 'center',
                                originY: 'center',
                                stroke: 'black',
                                strokeWidth: 25,
                                opacity: 0.3,
                                selectable: true,
                                hasControls: false,
                                hasBorders: false,
                                lockMovementX: true,
                                lockMovementY: true
                            }))
                        })
                })
            )
        }


        // Resolve all of the Promises
        Promise.all(hipPromises)
            .then(function(results) {
                that.hipImagesArr = results.map(function(img, i) {
                    img.set({
                        left: that.left + 800 + (i * 75),
                        top: that.top + 600
                    })
                    .on('mousemove', function() {
                        console.log("mouseOver");
                        var there = this;
                        results.forEach(function(t) {
                            if (t !== this) {
                                t.sendBackwards()
                                t.opacity = 0.3;
                            }
                            there.opacity = 1.0;
                            there.bringToFront();
                        })
                    })
                    .on('selected', function() {
                        results.map(function(t) {
                            that.canvas.remove(t);
                        })
                        this.handprintScanner();

                    })
                    that.canvas.add(img)
                })
            })
    },

    // Welcome State 3.1 : Alternate
    existingUserProfile: function() {
        var that = this;
        /** Existing Users. A text for name, Image display and give users an option to change the profile picture
		 or choosing from the array of hip images. **/
        // Set time interval of 2s and next screen appears

    },

    // Welcome State 4
    handprintScanner: function() {
        var that = this;
        // Add feedback after the user places hand! Palm turns green
        // Set time interval of 2s and next screen appears

    },

    setPhonePasscode: function() {
        var that = this;
        // To ask user to set the passcode.

    },

    //dict contains all text that are being used in the entire app
    setTextCallback: function(dict) {
        for (var key in this.languageEntries) {
            console.log(key, dict[key]);
            this.languageEntries[key].set({text: dict[key]})

        }
    }
});

function getLangCode(id) {
    switch (id) {
        case 11:
            return 'italian';
            break;
        case 9:
            return 'hindi';
            break;
        case 8:
            return 'kannada';
            break;
        case 7:
        case 19:
        case 20:
        case 23:
            return 'spanish';
            break;
        default:
            return 'english';
            break;
    }
}
