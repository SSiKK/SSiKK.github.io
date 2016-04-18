var YDYW_Welcome = SVG_Imitator.extend({
    init: function(canvas) { // Initialize
        //Attributes
        this.left = null;
        this.top = null;
        this.width = null;
        this.height = null;

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
    },

    draw: function() {
        // Draw
        console.log("being drawn!", this);
        //Have a selectable rect with
        this.floatingWelcome();

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
            var url = 'js/assets/flags/byIndex/' + i + '.png'
            var code = '';
            switch (i) {
                case 13:
                    code = 'italian';
                    break;
                case 9:
                    code = 'hindi';
                    break;
                case 7:
                case 19:
                case 20:
                case 23:
                    code = 'spanish';
                    break;
                default:
                    code = 'english';
                    break;
            }

            languagePromises.push(
                new Promise(function(resolve, reject) {
                    fabric.Image.fromURL(url, function(img) {
                        resolve(img.set({
                            scaleX: .5,
                            scaleY: .5,
                            originX: 'center',
                            originY: 'center',
                            selectable: false,
                            hasControls: false,
                            hasBorders: false,
                            lockMovementX: true,
                            lockMovementY: true,
                            code: code
                        }))
                    })
                })
            )
        }

        Promise.all(languagePromises)
            .then(function(results) {
                results.forEach(function(tex, i) {
                    var x = i % 4;
                    var y = Math.floor(i / 4);
                    tex.set({
                        top: that.top + 500 + (y * 250),
                        left: that.left + 200 + (x * 250)
                    })
                    that.canvas.add(tex);
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

    }


});

//http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function randomRange(min, max) {
    return Math.random() * (max - min + 1) + min;
}