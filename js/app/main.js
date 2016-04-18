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

    var countTaps = 0;
    var messageIn;


    window.canvas = this.__canvas = new fabric.Canvas('c');

    var zoomFactor = canvas.height / localHeight;


    // set background to blue to make it easier to see it
    canvas.backgroundColor = "#DDDDDD"; // light grey

    // Draw the Basic In/Outside doors,
    DrawDoors();

    // Draw the Message Box
    //DrawMessageBox();

    // Draw the Camera view and associated controls
    //DrawCameraView();

    //Weather layout
    //DrawWeatherLayout();

    //Maps Layout
    //DrawMaps();

    //Draw Emergency mode
    //DrawEmergency();

    //DrawThreeTapMode



    // Doorknob stuff
    var lock = new YDYW_LockManager();
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

    var soundMgr = new YDYW_soundManager();
    soundMgr.init();
    AddSounds();

    var languageMgr = new YDYW_languageManager();
    languageMgr.init();

    var soundCheckBox = new YDYW_CheckBox();
    soundCheckBox.init(canvas);

    soundCheckBox.addEntries(soundMgr.getIDs());
    soundCheckBox.onSelect(function(id) {
        soundMgr.setCurrent(id);
        soundMgr.play();
    });
    soundCheckBox.set({
        left: outsideDoorLeft + 30,
        top: doorTop,
        width: doorWidth/3.0,
        height: doorHeight/3.0,
        zoomFactor: zoomFactor
    });

    var languageCheckBox = new YDYW_CheckBox();
    languageCheckBox.init(canvas);

    languageCheckBox.addEntries(languageMgr.getLanguages());
    languageCheckBox.onSelect(function(id) {
        languageMgr.setLanguage(id);
    });
    languageCheckBox.set({
        left: outsideDoorLeft + 30,
        top: doorTop + doorHeight/2.0,
        width: doorWidth/3.0,
        height: doorHeight/3.0,
        zoomFactor: zoomFactor
    });

    //Do this to whatever element needs to change its text when a new language is selected.
    languageMgr.addSetTextCallback(soundCheckBox.setTextCallback.bind(soundCheckBox));
    languageMgr.setLanguage("english");

    var button = new YDYW_Button();
    button.init(canvas);
    button.set({
        top: (doorTop + doorHeight/2.0),
        //top: 100,
        left: outsideDoorLeft + doorWidth/2.0,
        type: "label", // label/icon/tab
        text: "cancel", // displays the text inside the button
        fill: 'red',
        zoomFactor: zoomFactor,
        textSize: 100, // textSize
        radius: 50, // define a radius if you are going to make an icon. you dont need to do this for the label
        icon: "../js/assets/svg/incognito.svg" //icon asset path
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
        insideDoor.hasControls = insideDoor.hasBorders = false;
        insideDoor.selectable = true;
        insideDoor.lockMovementX = insideDoor.lockMovementY = true;

        
        // Tapping (or clicking ) three times on the Inside door within 2 seconds will bring Emergency mode On feature.
        insideDoor.on('selected', function(options){
            countTaps++; 
            console.log("Tap Count is " + countTaps);
            if(countTaps === 3){
                console.log('3 taps bitches')
                DrawEmergency();
                countTaps=0;
            }
            canvas.deactivateAll();
            canvas.renderAll();
        });

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
            soundMgr.play();
            soundCheckBox.toggle();
        });


        // add all of the elements to the canvas

        canvas.add(insideDoor);
        canvas.add(outsideDoor);
    }


    function DrawDoorKnob() {

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
        // subC = document.createElement('canvas')
        // subC.id = 'subC';
        // subC.width = canvas.height * 0.3036437247 + "";
        // subC.height = canvas.height * 0.25 +"";
        // subC.style.border = "2px solid black"
        // document.body.appendChild(subC);

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
    }
    
    function DrawMaps(){
        console.log("draw bitch!");
        var mapView = new YDYW_Maps();
        mapView.init(canvas);
        mapView.set({
            left: localWidth*0.25,
            top: localHeight*0.5, // 250 
            width: localWidth*0.30,
            height: localHeight*0.25               
        });    
    }

    function DrawEmergency (){
        var emergencyView = new YDYW_Emergency();
        emergencyView.init(canvas);
        emergencyView.set({
            //left: doorWidth - doorWidth/2 + 22,
            //top: localHeight - localHeight/2 , // 250 
            left: doorWidth + 110,
            top: localHeight + 110, // 250
            width: doorWidth*2 + 130,
            height: localHeight*2 + 220 
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