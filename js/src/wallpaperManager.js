var YDYW_wallpaperManager = SVG_Imitator.extend({

    init: function (canvas) { // Initialize
        //Attributes
        this.left = 0;
        this.top =  0;
        this.width =  0;
        this.height =  0;
        this.fill = "#dddddd";
        this.stroke = "#dddddd";
        this.RowHeadings =  [];
        this.RowIconNumber =  [];
        this.controlAndOffsetList = [];
        this.board = null;
        this.zoomFactor = null;
        this.canvas = null;
        this.buttonList = [];
        this.visible = true;
        this.showing = true;
        this.outsideDoorObject = null;
        this.insideDoorObject = null;

        this.outsideDoorTab = null;
        this.insideDoorTab = null;

        this.wallpaperList = [];
        //this.visible = true;
        if (canvas!==undefined && canvas!== null) {
            this.attachToCanvas(canvas);
        }

    },
    attachToCanvas: function(canvas) {
        this.canvas = canvas;
    },
    attachToDoors: function( inside , outside) {
      this.insideDoorObject = inside;
      this.outsideDoorObject = outside;
    },

    draw: function () {

        this.board = new fabric.Rect({
            left: this.left,
            top: this.top,
            fill: "#ddddd",
            stroke: "#dddddd",
            rx : 10,
            ry : 10,
            width: this.width,
            height: this.height,
            angle: 0,
            visible: this.visible
        });
        this.board.hasControls = this.board.hasBorders = false;
        this.board.lockMovementX = this.board.lockMovementY = true;

        this.canvas.add(this.board);

        var index = 0,indexh = 0,indexv = 0, len = this.buttonList.length;

        var n = this.RowIconNumber.length;
        console.log("The number of rows are " + n);
        //Setting up individual button size.
        var buttonHeight = this.height/(n + 1);
        var buttonWidth = this.width/(this.RowIconNumber[0] + 1);
        var buttonRadius = buttonHeight/2;

        var rowTop = this.top, rowLeft = this.left;
        rowLeft = rowLeft - buttonWidth/3;


        outsideDoorTab = new YDYW_Button();
        outsideDoorTab.init(this.canvas);
        outsideDoorTab.set({
            left: rowLeft + 40,
            top: rowTop + 20,
            width: this.width/2 - 20,
            type: "tab",
            fill: "#ddddd",// label/icon/tab
            //text: "Menu", // displays the text inside the button
            zoomFactor: this.zoomFactor,
            textSize: 15,
            text: "Outside door"
        });
        this.outsideDoorTab = outsideDoorTab;

        insideDoorTab = new YDYW_Button();
        insideDoorTab.init(this.canvas);
        insideDoorTab.set({
            left: rowLeft + 40 + this.width/2 - 20 ,
            top: rowTop + 20,
            width: this.width/2 - 20,
            type: "tab",
            fill: "#dddddd",// label/icon/tab
            //text: "Menu", // displays the text inside the button
            zoomFactor: this.zoomFactor,
            textSize: 15,
            text: "Inside door"// textSize
        });
        this.insideDoorTab = insideDoorTab;


        //canvas.add(outsideDoor);

        for (indexv = 0; indexv <n; ++indexv) {
            for(indexh = 0;indexh < this.RowIconNumber[indexv]; ++indexh) {

                console.log("Adding buttons");
                var button = new fabric.Rect({
                    top: rowTop + buttonHeight,
                    left: rowLeft + (indexh + 1)*(buttonWidth),
                    height : buttonRadius,
                    width : buttonRadius,
                    fill : this.wallpaperList[index].fill,
                    stroke : this.wallpaperList[index].fill,
                    id : this.wallpaperList[index].key,
                    rx : 5,
                    ry : 5
                });

                button.hasControls = button.hasBorders = false;
                button.lockMovementX = button.lockMovementY = true;

                this.canvas.add(button);
                this.buttonList.push(button);

                //var id = button.id;
                button.on("mousedown", function(){
                    //if(insideDoorTab.selected == true){
                    var id = this.canvas.getActiveObject().id;
                    console.log("printing out the id ", id );
                    this.insideDoorObject.set({fill: id});
                }.bind(this));

                this.canvas.renderAll();

                index++;
            }
            rowTop = rowTop + buttonHeight;
            console.log("Completed creating button " + indexv);

        }


        canvas.renderAll();
        return this;

    },

    hide: function(){

        this.board.set({visible:false});
        this.insideDoorTab.hide();
        this.outsideDoorTab.hide();
        for(var index = 0; index < this.buttonList.length; index++)
            this.buttonList[index].set({
                visible:false
            });
        //canvas.renderAll();
        this.showing = false;
    },
    show: function(){
        this.board.set({visible:true});
        this.insideDoorTab.show();
        this.outsideDoorTab.show();

        for(var index = 0; index < this.buttonList.length; index++)
            this.buttonList[index].set({
                visible:true
            });
        //canvas.renderAll();
        this.showing = true;
    },
    setTextCallback: function(dict){
        for(var index = 0; index < this.buttonList.length; index++) {
            this.buttonList[index].setTextCallback(dict);
        }
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
