var YDYW_Maps = SVG_Imitator.extend({
    init: function(canvas) { // Initialize
        //Attributes
        this.left = null;
        this.top = null;
        this.width = null;
        this.height = null;
        this.mapBox = null;
        this.mapBoxCancel = null;
        //var apikey = "AIzaSyDUKdlzQb66rveFae-G34RdxJ4Ld4jJYdQ"

        //first time load
        this.firstTime = true;

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
        // Draw map

        var that = this;
        var leftRef = this.left + 377;
        var topRef = this.top + 500;

        var path = "js/assets/maps/";
        var ext = ".PNG"
        var genRandomNum = Math.floor(Math.random() * 5);
        console.log("Map selected : " + genRandomNum);
        var imgFile = path + genRandomNum + ext;

        var mapPromise = new Promise(function(resolve, reject) {
            fabric.Image.fromURL(imgFile, function(img) {
                resolve(img.set({
                    left: leftRef,
                    top: topRef,
                    scaleX: 1,
                    scaleY: 1,
                    originX: 'center',
                    originY: 'center',
                    stroke: '#2e2e1f',
                    strokeWidth: 1.2,
                    selectable: false,
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true

                }))
            })
        })

        var cancelPromise = new Promise(function(resolve, reject) {
            fabric.loadSVGFromURL('js/assets/svg/close.svg', function(obj, opt) {
                resolve(fabric.util.groupSVGElements(obj, {
                    width: opt.width,
                    height: opt.height,
                    svgUid: opt.svgUid,
                    toBeParsed: opt.toBeParsed,
                    left: leftRef + 400,
                    top: topRef - 200,
                    scaleX: 0.2,
                    scaleY: 0.2,
                    fill: 'white',
                    originX: 'center',
                    originY: 'center',
                    selectable: true,
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true
                    //visible: that.showsub
                }))
            })
        })

        Promise.all([mapPromise, cancelPromise])
            .then(function(results) {
                that.mapBox = results[0]
                that.mapBoxCancel = results[1]
                    .on('selected', function() {
                        console.log('selected a the cancel button');
                        that.mapBox.setVisible(false);
                        that.mapBoxCancel.setVisible(false);
                        // that.canvas.remove(that.mapBox);
                        // that.canvas.remove(that.mapBoxCancel);

                    });
                that.canvas.add(that.mapBox);
                that.canvas.add(that.mapBoxCancel);
                that.canvas.renderAll();

                if (that.firstTime)
                    that.hide();
            })
    },

    show: function() {
        this.mapBox.setVisible(true);
        this.mapBoxCancel.setVisible(true);
    },

    hide: function() {
        this.mapBox.setVisible(false);
        this.mapBoxCancel.setVisible(false);
    }
});