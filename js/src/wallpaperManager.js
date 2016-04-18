var YDYW_wallpaperManager = SVG_Imitator.extend({
    init: function (canvas) { // Initialize
        //Attributes
        this.left = null;
        this.top = null;
        this.width = null;
        this.height = null;
        this.selected = null;
        this.visible = false;
        this.container = null;
        this.zoomFactor = null;
        this.buttonDataList =  [];
        this.showing = false;

        this.defaults = {
            hasControls: false,
            hasBorders: false,
            selectable: true,
            lockMovementX: true,
            lockMovementY: true
        };
        // Canvas on which the object is created.
        this.canvas = null;
        this.selectedEntry = 0;
        this.showing = false;

        if (canvas!==undefined && canvas!== null) {
            this.attachToCanvas(canvas);
        }
        return this;
    },
    attachToCanvas: function(canvas) {
        this.canvas = canvas;
        return this;
    },
    draw: function () {
        this.container = new YDYW_Container();
        this.container.init(this.canvas);
        this.container.set({
            top: this.top ,
            left: this.left,
            height: this.height,
            width: this.width,
            visible: this.visible,
            buttonDataList : this.buttonDataList,
            zoomFactor: this.zoomFactor
        });
        return this;
    },
    hide: function(){
        this.container.hide();
    },
    show: function(){
        this.container.show();
    },

    //dict contains all text that are being used in the entire app
    setTextCallback: function(dict) {
        var t;
        this.heading.set({text: dict[this.caption]});
        for (var e = 0; e<this.entries.length; e++) {
            t = dict[this.entries[e]] || this.entries[e];
            //console.log(t);
            //Set the text attribute of text elements to dictionary lookup value
            this.fabEntries[e].label.set({text: t});
        }
    }



});

