var YDYW_Emergency = SVG_Imitator.extend({
    init: function(canvas) { // Initialize
        //Attributes
        this.left = null;
        this.top = null;
        this.width = null;
        this.height = null;
        this.firstTime = true;
        this.emergencyScreen = null;

        this.fire = null;
        this.police = null;
        this.alert = null;
        this.mark = null;

        this.fireText = null;
        this.policeText = null;

        this.languageEntries
        // Canvas on which the object is created.
        this.canvas = null;

        this.languageMgr = null;
        this.languageEntries = {}

        //Feature specific status flags
        this.on = false;
        if (canvas !== undefined && canvas !== null) {
            this.attachToCanvas(canvas);
            this.buildLanguageEntries();
        }
    },
    attachToCanvas: function(canvas) {
        this.canvas = canvas;
    },

    draw: function() {

        var that = this;

        this.languageMgr.addSetTextCallback(this.setTextCallback.bind(this));

        // Draw a Rect and have all the UI elements in it.
        this.emergencyScreen = new fabric.Rect({
            left: that.left,
            top: that.top,
            width: that.width,
            height: that.height,
            fill: 'white', //'#ff9999',
            selectable: false,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true
        });


        this.emergencyScreen = new fabric.Rect({
            left: that.left,
            top: that.top,
            width: that.width,
            height: that.height,
            fill: 'white', //'#ff9999',
            selectable: false,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true
        })


        console.log(that.left, that);

        var images = [ "fire", "police", "alert","mark"].map(function(el, i) {
            return new Promise(function(resolve, reject) {
                fabric.loadSVGFromURL('js/assets/svg/' + el + '.svg', function(obj, opt) {
                    resolve(fabric.util.groupSVGElements(obj, {
                        width: opt.width,
                        height: opt.height,
                        svgUid: opt.svgUid,
                        toBeParsed: opt.toBeParsed,
                        left: that.left + 700,
                        top: that.top + 800,
                        originX: 'center',
                        originY: 'center',
                        scaleX: 0.5,
                        scaleY: 0.5,
                        fill: 'white',
                        hasControls: false,
                        hasBorders: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        visible: true
                    }))
                })
            })
        })




        Promise.all(images).then(function(results) {

            that.fire = results[0].set({
                "top": 1200, "left": 500,
                'fill': 'orange'
            }).on('selected', function(){
                that.callFireExt();
            });


            that.police = results[1].set({
                "top": 1200, "left": 900,
                'fill': 'blue'
            }).on('selected', function(){
                that.callPolice();
            })

            that.alert = results[2].set({
                "top": 600,
                'scaleX': 2.0, 'scaleY': 2.0,
                'fill': 'rgb(200,0,0)'
            })

            that.mark = results[3].set({
                "top": 900, 'left': 1200,
                'scaleX': 0.2, 'scaleY': 0.2,
                'fill': "#8ec887"
            })
            .on('selected',function(){
                that.hide();
            })

            that.canvas.add(that.fire);
            that.canvas.add(that.police);
            that.canvas.add(that.alert);
            that.canvas.add(that.mark);

            if (that.firstTime)
                that.hide();

        })
        that.canvas.add(that.emergencyScreen);
        that.emergencyScreen.bringToFront();
        that.canvas.deactivateAll();
        that.canvas.renderAll();
    },

    callFireExt: function() {
        var that = this;

        this.fireText = this.languageEntries['callFire'].set({
            'fontSize': 80,
            'top': that.top + 500,
            'left': that.left + 700
        })
        this.canvas.add( this.fireText );

        setTimeout(function(){
            console.log("goodbye fire!");
            that.canvas.remove( that.fireText );
        }, 4000);



    },

    callPolice: function() {
        var that = this;

        this.policeText = this.languageEntries['callPolice'].set({
            'fontSize': 80,
            'top': that.top + 500,
            'left': that.left + 700
        })
        this.canvas.add( this.policeText );

        setTimeout(function(){
            console.log("goodbye police!");
            that.canvas.remove( that.policeText );
        }, 4000);

    },

    hide: function() {
        this.emergencyScreen.setVisible(false);
        this.fire.setVisible(false);
        this.police.setVisible(false);
        this.alert.setVisible(false);
        this.mark.setVisible(false);
    },

    show: function() {
        this.emergencyScreen.setVisible(true);
        this.fire.setVisible(true)
        this.police.setVisible(true)
        this.alert.setVisible(true)
        this.mark.setVisible(true)
    },

    buildLanguageEntries: function(){
        var common = {
            originY: 'center',
            originX: 'center',
            left: this.left * 4,
            fontFamily: 'Helvetica',
            fontSize: 35
        }

        this.languageEntries = {
            callFire: new fabric.Text("Calling Fire Department", common),
            callPolice:  new fabric.Text("Calling Police Department", common)
        }

    },

    //dict contains all text that are being used in the entire app
    setTextCallback: function(dict) {
        for (var key in this.languageEntries) {
            console.log(key, dict[key]);
            this.languageEntries[key].set({
                text: dict[key]
            })

        }
    },


});