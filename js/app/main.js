// the aspect ratios given here are not quite tall enough for a 36" x 80" door
// we are assuming bottom 15 inches of the door are not part of the display.
// that part contains lots of necessary electronics so the bottom of the door
// sits off the bottom of our display wall. You are implementing the interface
// for the top 65" of the display / door

(function() {

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Start of Main ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

    // within the code below I assume I am drawing into a 1220x990 box
    // then I can scale the group to whatever size the final canvas is
    var localHeight = 990;
    var localWidth = 1220;

    var insideDoorLeft = 22;
    var outsideDoorLeft = 642;
    var doorTop = 0;
    var doorWidth = 555;
    var doorHeight = localHeight;



    // Door elements
    var messageIn;
    var lock;
    var doorBell;
    var languageButton;
    var chimesButton;

    window.canvas = this.__canvas = new fabric.Canvas('c');

    var zoomFactor = canvas.height / localHeight;


    // set background to blue to make it easier to see it
    canvas.backgroundColor = "#DDDDDD"; // light grey

    // Draw the Basic In/Outside doors,
    DrawDoors();

    placeElementsOnDoor();
    // Draw the Message Box
    // DrawMessageBox();

    // Draw the Camera view and associated controls
    // DrawCameraView();

    //Weather layout
    // DrawWeatherLayout();

    var soundMgr = new YDYW_soundManager();
    soundMgr.init();
    AddSounds();

    var languageMgr = new YDYW_languageManager();
    languageMgr.init();

    var soundCheckBox = new YDYW_CheckBox();
    soundCheckBox.init(canvas);

    var welcome = new YDYW_Welcome();
    welcome.init(canvas);
    welcome.set({
        top: doorTop,
        left: insideDoorLeft,
        width: doorWidth,
        height: doorHeight,
        languageMgr: languageMgr
    })

    soundCheckBox.addEntries(soundMgr.getIDs());
    soundCheckBox.onSelect(function(id) {
        soundMgr.setCurrent(id);
        soundMgr.play();
        soundCheckBox.hide();
        chimesButton.show();
    });
    soundCheckBox.set({
        left: outsideDoorLeft + 30,
        top: doorTop,
        width: doorWidth/3.0,
        height: doorHeight/3.0,
        zoomFactor: zoomFactor
    });
    soundCheckBox.hide();


    var languageCheckBox = new YDYW_CheckBox();
    languageCheckBox.init(canvas);

    languageCheckBox.addEntries(languageMgr.getLanguages());
    languageCheckBox.onSelect(function(id) {
        languageMgr.setLanguage(id);
        languageCheckBox.hide();
        languageButton.show();
    });
    languageCheckBox.set({
        left: outsideDoorLeft + 30,
        top: doorTop + doorHeight/2.0,
        width: doorWidth/3.0,
        height: doorHeight/3.0,
        zoomFactor: zoomFactor
    });
    languageCheckBox.hide();
    //Do this to whatever element needs to change its text when a new language is selected.
    languageMgr.addSetTextCallback(soundCheckBox.setTextCallback.bind(soundCheckBox));
    //languageMgr.addSetTextCallback(soundCheckBox.setTextCallback.bind(soundCheckBox));
    languageMgr.setLanguage("english");




    var Menu = new YDYW_Container();
    Menu.init(canvas);
    Menu.set({
        top: (doorTop + doorHeight/2.0)-100,
        left: outsideDoorLeft + doorWidth/2.0-50,
        height : 200,
        width : 300,
        stroke : "white",
        fill : "white",
        RowHeadings : ["testing"],
        RowIconNumber : [1,2,1],
        buttonDataList: [{icon: '../js/assets/svg/incognito.svg'},{icon: '../js/assets/svg/incognito.svg'},{icon: '../js/assets/svg/incognito.svg'},{icon: '../js/assets/svg/incognito.svg'}],
        zoomFactor: zoomFactor
    });

    var button = new YDYW_Button();
    button.init(canvas);
    button.set({
        top: (doorTop + doorHeight/2.0) - 100,
        //top: 100,
        left: outsideDoorLeft + doorWidth/2.0 - 100,
        type: "icon", // label/icon/tab
        //text: "Menu", // displays the text inside the button
        zoomFactor: zoomFactor,
        textSize: 50, // textSize
        radius: 50, // define a radius if you are going to make an icon. you dont need to do this for the label
        icon: "../js/assets/svg/circle.svg", //icon asset path
        cb: function(){
            if(button.selected === false){
                Menu.hide();
                button.selected = true;
            }else{
                Menu.show();
                button.selected = false;
            }

        }
    });

    // draw everything at the appropriate scale for this canvas

    zoomAll(zoomFactor);


////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Function Definitions /////////////////////////////
////////////////////////////////////////////////////////////////////////////////

    function DrawDoors() {
        // need 36 wide instead of 40 as now
        var insideDoor = new fabric.Rect({
            left: insideDoorLeft,
            top: doorTop,
            fill: 'grey',
            stroke: 'black',
            width: doorWidth,
            height: doorHeight,
            angle: 0
        });

        // the doors will not be selectable or movable
        insideDoor.hasControls = insideDoor.hasBorders = insideDoor.selectable = false;
        insideDoor.lockMovementX = insideDoor.lockMovementY = true;


        var outsideDoor = new fabric.Rect({
            left: outsideDoorLeft,
            top: doorTop,
            fill: 'grey',
            stroke: 'black',
            width: doorWidth,
            height: doorHeight,
            angle: 0
        });

        outsideDoor.hasControls = outsideDoor.hasBorders = false;
        outsideDoor.lockMovementX = outsideDoor.lockMovementY = true;

        outsideDoor.on('selected', function(options) {
            lock.toggleLockedStatusAndShow();
        });

        // add all of the elements to the canvas

        canvas.add(insideDoor);
        canvas.add(outsideDoor);
    }

    function DrawCameraView() {
        var cameraView = new YDYW_Camera();
            cameraView.init(canvas)
            cameraView.set({
                width: localWidth * .30,
                height: localHeight * 0.25,
                left: localWidth * 0.25,
                top: localHeight * .3 // 250
            });
    }

    // Instantiate the message class to set the 4 parameters from SVG_Imitator
    function DrawMessageBox(){

        messageIn = new YDYW_Message();
        messageIn.init(canvas);
        messageIn.set({
            width: doorWidth,
            height: doorHeight,
            left: insideDoorLeft, // * 1.25, //300,
            top: doorTop // 25
        });
    }

    function DrawWeatherLayout(){
        var weatherView = new YDYW_Weather();
        weatherView.init(canvas);
        weatherView.set({
            top: 500,
            left: 300,
            height: 300.0,
            width: 444.0
        });
    }


    function AddSounds() {
        soundMgr.addSound();
        soundMgr.setCurrent("doorBell");

        soundMgr.addSound({src:'js/assets/sound/crow.mp3', img:'js/assets/img/icons/crow.jpg', id: "crow"});
        soundMgr.addSound({src:'js/assets/sound/violin.wav', img:'js/assets/img/icons/violin.png', id: "violin"});
        soundMgr.addSound({src:'js/assets/sound/harp.wav', img:'js/assets/img/icons/harp.png', id: "harmonica"});
        soundMgr.addSound({src:'js/assets/sound/trumpet.wav', img:'js/assets/img/icons/trumpet.ico', id: "trumpet"});
    }

    function placeElementsOnDoor() {
        // Doorknob stuff
        lock = new YDYW_LockManager();
        lock.init(canvas);
        lock.set({
            deadBoltPosition: {
                left: insideDoorLeft + doorWidth - 80,
                top: doorTop  + doorHeight/2.0 - 50,
                width: doorWidth/8.0,
                height: 30,
                zoomFactor: zoomFactor
            },
            doorKnobInPosition: {
                cy: doorTop + doorHeight/2.0,
                cx: insideDoorLeft + doorWidth - 40,
                radius: 20.0
            },
            doorKnobOutPosition: {
                cy: doorTop + doorHeight/2.0,
                cx: outsideDoorLeft + 40,
                radius: 20.0
            }
        });

        doorBell = new YDYW_Button();
        doorBell.init(canvas);
        doorBell.set({
            top: doorTop  + doorHeight/2.0 - 50,
            left: outsideDoorLeft + 40,
            type: "icon", // label/icon/tab
            //text: "cancel", // displays the text inside the button
            fill: '#c8878e',
            zoomFactor: zoomFactor,
            strokeWidth: 3,
            textSize: 50, // textSize
            radius: 50, // define a radius if you are going to make an icon. you dont need to do this for the label
            icon: "js/assets/img/icons/doorbell.svg", //icon asset path
            cb:function() {
                soundMgr.play();
            }
        });

        languageButton = new YDYW_Button();
        languageButton.init(canvas);
        languageButton.set({
            top: doorTop  + doorHeight/2.0 - 50,
            left: outsideDoorLeft + 100,
            type: "icon", // label/icon/tab
            text: "Language", // displays the text inside the button
            fill: '#c8878e',
            zoomFactor: zoomFactor,
            strokeWidth: 3,
            textSize: 30, // textSize
            radius: 50, // define a radius if you are going to make an icon. you dont need to do this for the label
            icon: "js/assets/img/icons/language.svg", //icon asset path
            cb:function() {
                languageCheckBox.show();
                languageButton.hide();
            }
        });

        chimesButton = new YDYW_Button();
        chimesButton.init(canvas);
        chimesButton.set({
            top: doorTop  + doorHeight/2.0 - 50,
            left: outsideDoorLeft + 150,
            type: "icon", // label/icon/tab
            text: "Chimes", // displays the text inside the button
            fill: '#c8878e',
            zoomFactor: zoomFactor,
            strokeWidth: 3,
            textSize: 30, // textSize
            radius: 50, // define a radius if you are going to make an icon. you dont need to do this for the label
            icon: "js/assets/img/icons/music.svg", //icon asset path
            cb:function() {
                soundCheckBox.show();
                chimesButton.hide();
            }
        });

    }


    // code adapted from http://jsfiddle.net/tornado1979/39up3jcm/
    // this code deals with scaling all the elements on the canvas
    function zoomAll(SCALE_FACTOR) {

        var objects = canvas.getObjects();
        for (var i in objects) {
            var scaleX = objects[i].scaleX;
            var scaleY = objects[i].scaleY;
            var left = objects[i].left;
            var top = objects[i].top;

            var tempScaleX = scaleX * SCALE_FACTOR;
            var tempScaleY = scaleY * SCALE_FACTOR;
            var tempLeft = left * SCALE_FACTOR;
            var tempTop = top * SCALE_FACTOR;

            objects[i].scaleX = tempScaleX;
            objects[i].scaleY = tempScaleY;
            objects[i].left = tempLeft;
            objects[i].top = tempTop;

            objects[i].setCoords();
        }

        canvas.renderAll();
    }



})();