var YDYW_Container = SVG_Imitator.extend({

    init: function (canvas) { // Initialize
        //Attributes
        this.left = 0;
        this.top =  0;
        this.width =  0;
        this.height =  0;
        this.fill = "#dddddd";
        this.stroke = "#dddddd";
        this.buttonDataList =  [];
        this.RowHeadings =  [];
        this.RowIconNumber =  [];
        this.controlAndOffsetList = [];
        this.board = null;
        this.zoomFactor = null;
        this.canvas = null;
        this.buttonList = [];
        this.showing = true;
        this.strokeWidth = "3";
        //this.visible = true;
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
            strokeWidth: this.strokeWidth,
            rx : 10,
            ry : 10,
            width: this.width,
            height: this.height,
            angle: 0,
            visible: this.visible
        });
        this.board.hasControls = this.board.hasBorders = false;
        this.board.lockMovementX = this.board.lockMovementY = true;


        var index = 0,indexh = 0,indexv = 0, len = this.buttonList.length;

        var n = this.RowIconNumber.length;
        //console.log("The number of rows are " + n);
        //Setting up individual button size.
        var buttonHeight = this.height/(n + 1);
        var buttonRadius = buttonHeight/2;

        var rowTop = this.top, rowLeft = this.left;

        //iterate through the rows
        for (indexv = 0; indexv <n; ++indexv) {

            //.log("Creating the row number " + indexv + " which has number of icons " + this.RowIconNumber[indexv]);

            for(indexh = 0;indexh < this.RowIconNumber[indexv]; ++indexh) {

                //console.log("Creating button " + index);

                var button = new YDYW_Button();
                button.init(this.canvas);

                if(this.buttonDataList[index] instanceof Array ){

                    var array = this.buttonDataList[index];
                    var ind = array.length;

                    for(var i =0; i<ind; ++i) {

                        button.set({
                            top: rowTop + buttonHeight,
                            left: rowLeft + (i + 1) * buttonHeight,
                            type: array[i].type || "tab", // label/icon/tab
                            text: array[i].text || "blah", // displays the text inside the button
                            zoomFactor: this.zoomFactor,
                            textSize: array[i].textSize || 20, // textSize
                            fill: array[i].fill || "#6699ff",
                            cb: array[i].cb || function () {
                            },
                            visible: this.visible
                        });

                        this.buttonList.push(button);
                    }
                    rowTop = rowTop + buttonHeight;
                }
                else {

                    button.set({
                        top: rowTop + buttonHeight,
                        left: rowLeft + (indexh + 1)*buttonHeight,
                        type: this.buttonDataList[index].type || "icon", // label/icon/tab
                        text: this.buttonDataList[index].text || "blah", // displays the text inside the button
                        zoomFactor: this.zoomFactor,
                        textSize: this.buttonDataList[index].textSize || 20, // textSize
                        radius: buttonRadius, // define a radius if you are going to make an icon. you dont need to do this for the label
                        icon: this.buttonDataList[index].icon || 'js/assets/svg/incognito.svg', //icon asset path
                        cb: this.buttonDataList[index].cb || function(){},
                        icon2: this.buttonDataList[index].icon2 || null,
                        visible: this.visible
                    });
                    this.buttonList.push(button);
                    //button.hide();
                }
                index++;
            }
            //canvas.add(new fabric.Line([ rowLeft + buttonHeight, rowTop, rowLeft + (2* indexh + 1)*buttonHeight,  rowTop], {
            //
            //    stroke: 'red'
            //}));
            rowTop = rowTop + buttonHeight;
            //console.log("Completed creating button " + indexv);

        }

        this.canvas.add(this.board);

    },

    hide: function(){
        //("HIDING THINGS");
        this.board.set({visible:false});
        for(var index = 0; index < this.buttonList.length; index++)
            this.buttonList[index].hide();
        this.showing = false;
    },
    show: function(){
        this.board.set({visible:true});
        for(var index = 0; index < this.buttonList.length; index++)
            this.buttonList[index].show();
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
