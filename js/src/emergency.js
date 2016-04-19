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

        var that = this;
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
            });

            that.police = results[1].set({
                "top": 1200, "left": 900,
                'fill': 'blue'
            })

            that.alert = results[2].set({
                "top": 600,
                'scaleX': 2.0, 'scaleY': 2.0,
                'fill': 'rgb(200,0,0)'
            })

            that.mark = results[3].set({
                "top": 1100, 'left': 1200,
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

    },

    callPolice: function() {

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
    }



});