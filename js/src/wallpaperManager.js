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
        this.button =  null;
        this.board = null;
        this.zoomFactor = null;
        this.canvas = null;
        this.buttonList = [];
        this.visible = false;
        this.showing = false;
        this.outsideDoorObject = null;
        this.insideDoorObject = null;

        this.outsideDoorTab = null;
        this.insideDoorTab = null;

        this.languageManager =  null;
        this.imgManager = null;
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


        var that = this;

        var promises = [];

        for(var i = 0; i< that.wallpaperList.length ; i++){
            if(that.wallpaperList[i].type === "image"){
                var imagepromise = new Promise( function(resolve, reject){
                    fabric.Image.fromURL(that.wallpaperList[i].fill,function(img) {
                        resolve(
                            img.set({
                                height: img.height,
                                width: img.width,
                                selectable: false,
                                hasBorders: false,
                                originX: 'center',
                                originY: 'center'
                            }));
                    });
                });

                promises.push(imagepromise);

            }

        }

        console.log("before promise this");
        console.log(this);

        var imageDatabase = [];

        Promise.all(promises).then(function(results){

            console.log("ONLY DO THINGS AFTER PROMISE RESOLVES");
            var index = 0,indexh = 0,indexv = 0, len = this.buttonList.length;
            var n = this.RowIconNumber.length;
            console.log("The number of rows are " + n);
            //Setting up individual button size.
            var buttonHeight = this.height/(n + 1);
            var buttonWidth = this.width/(this.RowIconNumber[0] + 1);
            var buttonRadius = buttonHeight/2;

            var rowTop = this.top, rowLeft = this.left;
            rowLeft = rowLeft - buttonWidth/3;
            console.log("rowTop , rowLeft,", this.top, rowLeft);
            console.log(this);
            console.log(this.canvas);

            this.board = new fabric.Rect({
                left: this.left,
                top: this.top,
                fill: "white",
                stroke: "white",
                rx : 10,
                ry : 10,
                width: this.width,
                height: this.height,
                angle: 0,
                visible: this.visible,
                id: 'board'
            });
            console.log(this.board);
            this.board.hasControls = this.board.hasBorders = false;
            this.board.lockMovementX = this.board.lockMovementY = true;

            canvas.add(this.board);

            console.log(canvas);
            outsideDoorTab = new YDYW_Button();
            outsideDoorTab.init(this.canvas);
            

            outsideDoorTab.set({
                left: rowLeft + 50,
                top: rowTop + 20,
                width: this.width/2 - 20,
                type: "tab",
                fill: "#ddddd",// label/icon/tab
                //text: "Menu", // displays the text inside the button
                zoomFactor: this.zoomFactor,
                textSize: 25,
                text: "outsideDoor"
            });

            console.log("This is the left and top ", outsideDoorTab.left, outsideDoorTab.right);
            this.outsideDoorTab = outsideDoorTab;
            this.languageManager.addSetTextCallback(this.outsideDoorTab.setTextCallback.bind(this.outsideDoorTab));

            insideDoorTab = new YDYW_Button();
            insideDoorTab.init(this.canvas);
            insideDoorTab.set({
                left: rowLeft + 50 + this.width/2 - 20 ,
                top: rowTop + 20,
                width: this.width/2 - 20,
                type: "tab",
                fill: "#dddddd",// label/icon/tab
                //text: "Menu", // displays the text inside the button
                zoomFactor: this.zoomFactor,
                textSize: 25,
                text: "insideDoor"// textSize
            });
            this.insideDoorTab = insideDoorTab;
            this.languageManager.addSetTextCallback(this.insideDoorTab.setTextCallback.bind(this.insideDoorTab));

            rowLeft = this.left; rowTop = this.top;
            rowLeft = rowLeft - buttonWidth/3;

            console.log(this.canvas);
            console.log(canvas);

            var indexwall = 0;
            for (indexv = 0; indexv <n; ++indexv) {
                for(indexh = 0;indexh < this.RowIconNumber[indexv]; ++indexh) {

                    if( this.wallpaperList[index].type === "image"){

                        var key =  this.wallpaperList[index].key;
                            console.log("Getting the image " + results[indexwall]);
                            var img1 = results[indexwall];
                            indexwall ++;

                            this.button = new fabric.Rect({
                                top: rowTop + buttonHeight,
                                left: rowLeft + (indexh + 1)*(buttonWidth),
                                height : buttonRadius,
                                width : buttonRadius,
                                stroke : "white",
                                fill : "black",
                                id : this.wallpaperList[index].key,
                                rx : 5,
                                ry : 5
                            });



                            this.button.setPatternFill(new fabric.Pattern({
                                source: img1._element,
                                repeat: "no-repeat"
                            }));

                            imageDatabase.push(img1);

                            console.log("Adding buttons");

                            this.button.hasControls = this.button.hasBorders = false;
                            this.button.lockMovementX = this.button.lockMovementY = true;
                            console.log(this.buttonList);

                            this.canvas.add(this.button);
                            this.buttonList.push(this.button);


                    }else{

                        this.button = new fabric.Rect({
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
                        console.log("Adding buttons");

                        this.button.hasControls = this.button.hasBorders = false;
                        this.button.lockMovementX = this.button.lockMovementY = true;

                        this.canvas.add(this.button);
                        this.buttonList.push(this.button);

                    }

                    this.button.on("mousedown", function(evt){
                        //if(insideDoorTab.selected == true){
                        var id = this.canvas.getActiveObject().id;
                        console.log("Printing the id of the touched object " + id);
                        //console.log("printing out " ,this.insideDoorTab.selected, this.outsideDoorTab.selected );

                        if(this.insideDoorTab.selected === true) {

                            if(id === "wallpaper1"){
                                console.log("selected!!" + imageDatabase[0] );

                                new Promise(function(resolve, reject){
                                    fabric.Image.fromURL("js/assets/img/wallpaper1.jpg",function(imageObj){
                                        resolve(imageObj.set({
                                            height: imageObj.height,
                                            width: imageObj.width,
                                            selectable: false,
                                            hasBorders: false,
                                            originX: 'center',
                                            originY: 'center'
                                        }))
                                    });
                                }).then(function(resulting){
                                    this.insideDoorObject.setPatternFill(new fabric.Pattern({
                                        source : resulting._element,
                                        repeat: "no-repeat"
                                    }));
                                }.bind(this));


                            }else if(id === "wallpaper2"){

                                new Promise(function(resolve, reject){
                                    fabric.Image.fromURL("js/assets/img/wallpaper2.jpg",function(imageObj){
                                        resolve(imageObj.set({
                                            height: imageObj.height,
                                            width: imageObj.width,
                                            selectable: false,
                                            hasBorders: false,
                                            originX: 'center',
                                            originY: 'center'
                                        }))
                                    });
                                }).then(function(resulting){
                                    this.insideDoorObject.setPatternFill(new fabric.Pattern({
                                        source : resulting._element,
                                        repeat: "no-repeat"
                                    }));
                                }.bind(this));
                            }else if(id === "wallpaper3"){

                                new Promise(function(resolve, reject){
                                    fabric.Image.fromURL("js/assets/img/wallpaper3.jpg",function(imageObj){
                                        resolve(imageObj.set({
                                            height: imageObj.height,
                                            width: imageObj.width,
                                            selectable: false,
                                            hasBorders: false,
                                            originX: 'center',
                                            originY: 'center'
                                        }))
                                    });
                                }).then(function(resulting){
                                    this.insideDoorObject.setPatternFill(new fabric.Pattern({
                                        source : resulting._element,
                                        repeat: "no-repeat"
                                    }));
                                }.bind(this));
                            }else if(id === "christmas"){

                                new Promise(function(resolve, reject){
                                    fabric.Image.fromURL("js/assets/img/christmas.jpg",function(imageObj){
                                        resolve(imageObj.set({
                                            height: imageObj.height,
                                            width: imageObj.width,
                                            selectable: false,
                                            hasBorders: false,
                                            originX: 'center',
                                            originY: 'center'
                                        }).scale(0.75,0.75))
                                    });
                                }).then(function(resulting){
                                    this.insideDoorObject.setPatternFill(new fabric.Pattern({
                                        source : resulting._element,
                                        repeat: "no-repeat"
                                    }));
                                }.bind(this));
                            }else if(id === "bb8"){

                                new Promise(function(resolve, reject){
                                    fabric.Image.fromURL("js/assets/img/bb8.jpg",function(imageObj){
                                        resolve(imageObj.set({
                                            height: imageObj.height,
                                            width: imageObj.width,
                                            selectable: false,
                                            hasBorders: false,
                                            originX: 'center',
                                            originY: 'center'
                                        }).scale(0.75,0.75))
                                    });
                                }).then(function(resulting){
                                    this.insideDoorObject.setPatternFill(new fabric.Pattern({
                                        source : resulting._element,
                                        repeat: "no-repeat"
                                    }));
                                }.bind(this));
                            }else{
                                this.insideDoorObject.set({fill: id});
                            }


                            //this.insideDoorTab.set({selected : false});
                            //console.log(this.insideDoorTab.selected);
                            //this.insideDoorTab.shapeObject.setFill("#dddddd");
                            //canvas.renderAll();
                            //this.insideDoorTab.deselect();
                            //this.canvas.renderAll();
                        }
                        if(this.outsideDoorTab.selected === true){

                            if(id === "wallpaper1"){
                                console.log("selected!!" + imageDatabase[0] );

                                new Promise(function(resolve, reject){
                                    fabric.Image.fromURL("js/assets/img/wallpaper1.jpg",function(imageObj){
                                        resolve(imageObj.set({
                                            height: imageObj.height,
                                            width: imageObj.width,
                                            selectable: false,
                                            hasBorders: false,
                                            originX: 'center',
                                            originY: 'center'
                                        }))
                                    });
                                }).then(function(resulting){
                                    this.outsideDoorObject.setPatternFill(new fabric.Pattern({
                                        source : resulting._element,
                                        repeat: "no-repeat"
                                    }));
                                }.bind(this));


                            }else if(id === "wallpaper2"){

                                new Promise(function(resolve, reject){
                                    fabric.Image.fromURL("js/assets/img/wallpaper2.jpg",function(imageObj){
                                        resolve(imageObj.set({
                                            height: imageObj.height,
                                            width: imageObj.width,
                                            selectable: false,
                                            hasBorders: false,
                                            originX: 'center',
                                            originY: 'center'
                                        }))
                                    });
                                }).then(function(resulting){
                                    this.outsideDoorObject.setPatternFill(new fabric.Pattern({
                                        source : resulting._element,
                                        repeat: "no-repeat"
                                    }));
                                }.bind(this));
                            }else if(id === "wallpaper3"){

                                new Promise(function(resolve, reject){
                                    fabric.Image.fromURL("js/assets/img/wallpaper3.jpg",function(imageObj){
                                        resolve(imageObj.set({
                                            height: imageObj.height,
                                            width: imageObj.width,
                                            selectable: false,
                                            hasBorders: false,
                                            originX: 'center',
                                            originY: 'center'
                                        }))
                                    });
                                }).then(function(resulting){
                                    this.outsideDoorObject.setPatternFill(new fabric.Pattern({
                                        source : resulting._element,
                                        repeat: "no-repeat"
                                    }));
                                }.bind(this));
                            }else if(id === "christmas"){

                                new Promise(function(resolve, reject){
                                    fabric.Image.fromURL("js/assets/img/christmas.jpg",function(imageObj){
                                        resolve(imageObj.set({
                                            height: imageObj.height,
                                            width: imageObj.width,
                                            selectable: false,
                                            hasBorders: false,
                                            originX: 'center',
                                            originY: 'center'
                                        }))
                                    });
                                }).then(function(resulting){
                                    this.outsideDoorObject.setPatternFill(new fabric.Pattern({
                                        source : resulting._element,
                                        repeat: "no-repeat"
                                    }));
                                }.bind(this));
                            }else if(id === "bb8"){

                                new Promise(function(resolve, reject){
                                    fabric.Image.fromURL("js/assets/img/bb8.jpg",function(imageObj){
                                        resolve(imageObj.set({
                                            height: imageObj.height,
                                            width: imageObj.width,
                                            selectable: false,
                                            hasBorders: false,
                                            originX: 'center',
                                            originY: 'center'
                                        }))
                                    });
                                }).then(function(resulting){
                                    this.outsideDoorObject.setPatternFill(new fabric.Pattern({
                                        source : resulting._element,
                                        repeat: "no-repeat"
                                    }));
                                }.bind(this));
                            }else{
                                this.outsideDoorObject.set({fill: id});
                            }
                        }

                    }.bind(this));
                    index++;
                }
                rowTop = rowTop + buttonHeight;
                console.log("Completed creating button " + indexv);

            }
            this.hide();
            this.showing = false;
            canvas.renderAll();
        }.bind(this));





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
