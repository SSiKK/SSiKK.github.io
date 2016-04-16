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
    
    var messageIn;
 
    window.canvas = this.__canvas = new fabric.Canvas('c');

    var zoomFactor = canvas.height / localHeight;
    // set background to blue to make it easier to see it
    canvas.backgroundColor = "#DDDDDD"; // light grey

    // Draw the Basic In/Outside doors,
    DrawDoors();

    // Draw the Message Box
    DrawMessageBox();

    // Draw the Camera view and associated controls
    DrawCameraView();

    //Weather layout
    DrawWeatherLayout();

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
    soundMgr.addSound();
    soundMgr.setCurrent("doorBell");

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
            soundMgr.play();
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
                width: 444,
                height: localHeight * 0.25,
                left: 300,
                top: 300 // 250
            });
            // cameraView.viewport.on('selected', function(options) {
            //     cameraView.toggleFullScreenViewport();
            // });
    }

    // Instantiate the message class to set the 4 parameters from SVG_Imitator
    function DrawMessageBox(){
        subC = document.createElement('canvas')
        subC.id = 'subC';
        subC.width = "300";
        subC.height = "200";
        subC.style.border = "2px solid black"
        document.body.appendChild(subC);

        messageIn = new YDYW_Message();
        messageIn.init(canvas);
        messageIn.set({
            top:250,
            left:300,
            width: 300.0,
            height: 200.0
        });
    }

    function DrawWeatherLayout(){
        var weatherView = new YDYW_Weather();
        weatherView.init(canvas);
        weatherView.set({
            top: 500,
            left: 300,
            height: 300.0,
            width: 500.0
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