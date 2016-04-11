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

    window.canvas = this.__canvas = new fabric.Canvas('c');


    // set background to blue to make it easier to see it
    canvas.backgroundColor = "#DDDDDD"; // light grey

    // Draw the Basic In/Outside doors,
    DrawDoors();

    // Draw the Camera view and associated controls
    DrawCameraView();

    // Doorknob stuff
    var doorKnobIn = new YDYW_DoorKnob();
    doorKnobIn.init(canvas);
    doorKnobIn.set({
        cy: localHeight / 2.0,
        cx: localWidth * 0.75,
        radius: 20.0
    });


    // draw everything at the appropriate scale for this canvas
    zoomAll(canvas.height / localHeight);


////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Function Definitions /////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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


    function DrawDoors() {
        // need 36 wide instead of 40 as now
        var insideDoor = new fabric.Rect({
            left: 22,
            top: 0,
            fill: 'grey',
            stroke: 'black',
            width: 555,
            height: localHeight,
            angle: 0
        });

        // the doors will not be selectable or movable
        insideDoor.hasControls = insideDoor.hasBorders = insideDoor.selectable = false;
        insideDoor.lockMovementX = insideDoor.lockMovementY = true;


        var outsideDoor = new fabric.Rect({
            left: 642,
            top: 0,
            fill: 'grey',
            stroke: 'black',
            width: 555,
            height: localHeight,
            angle: 0
        });

        outsideDoor.hasControls = outsideDoor.hasBorders = false;
        outsideDoor.lockMovementX = outsideDoor.lockMovementY = true;

        outsideDoor.on('selected', function(options) {
            doorKnobIn.toggleLockedStatusAndShow();
        });

        // add all of the elements to the canvas

        canvas.add(insideDoor);
        canvas.add(outsideDoor);
    }

    function DrawCameraView() {
        var cameraView = new YDYW_Camera();
            cameraView.init(canvas)
            cameraView.set({
                width: 444,
                height: localHeight * 0.25,
                top: 20.0,
                left: 300,
                top: 250
            });
            // cameraView.viewport.on('selected', function(options) {
            //     cameraView.toggleFullScreenViewport();
            // });
    }

})();