var YDYW_Container = SVG_Imitator.extend({

    init: function (canvas) { // Initialize
        //Attributes
        this.left = 0;
        this.top = 0;
        this.width = 0;
        this.height = 0;
        this.fill = this.fill || "white";
        this.stroke = this.stroke || "white";
        this.buttonList = this.buttonList || {};
        this.numberOfRows = this.numberOfRows || {};
        this.RowHeadings = this.RowHeadings || {};
        this.controlAndOffsetList = [];
        this.board = this.board || null;
        this.canvas = null;

        if (canvas!==undefined && canvas!== null) {
            this.attachToCanvas(canvas);
        }

    },
    attachToCanvas: function(canvas) {
        this.canvas = canvas;
    },

    draw: function () {
        this.board = new fabric.Rect({
            id: "controlBoard",
            left: this.left,
            top: this.top,
            fill: this.fill,
            stroke: this.stroke,
            rx : 10,
            ry : 10,
            width: this.width,
            height: this.height,
            angle: 0
        });
        this.board.hasControls = this.board.hasBorders = false;
        this.board.lockMovementX = this.board.lockMovementY = true;
        this.canvas.add(this.board);

    },

    textCallback: function(str){
        this.set({text: str});
    }

});


//Hex value is used to define the color, -.10 ( make it ten percent darker), 0.20 (make it twenty percent lighter)
function colorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}
