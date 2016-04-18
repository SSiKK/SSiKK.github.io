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

    //Special helper class to preload images that will be used later in the app
    var imageManager ;
    LoadImages();

    // Door elements
    var messageIn;
    var lock;
    var doorBell;
    var menuButton;


    window.canvas = this.__canvas = new fabric.Canvas('c');

    var zoomFactor = canvas.height / localHeight;


    // set background to blue to make it easier to see it
    canvas.backgroundColor = "#DDDDDD"; // light grey

    // Draw the Basic In/Outside doors,
    DrawDoors();
    //
    placeElementsOnDoor();
    // Draw the Message Box
    //DrawMessageBox();

    // Draw the Camera view and associated controls
    //DrawCameraView();

    //Weather layout
    var weatherView, WeatherContainer;
    DrawWeatherLayout();


    //Maps Layout
    //DrawMaps();

    //Draw Emergency mode
    //DrawEmergency();

    //DrawThreeTapMode

    var soundMgr = new YDYW_soundManager();
    soundMgr.init();
    AddSounds();

    //var userManager = new YDYW_userManager();
    //userManager.init();
    //Adding a few users to show
    //AddUsers();

    var doorLogManager = new YDYW_DoorLog();
    doorLogManager.init(canvas, imageManager);
    var doorLogButton = new YDYW_Button();
    doorLogButton.init(canvas);
    
    SetupDoorLogSystem();
    

    var languageMgr = new YDYW_languageManager();
    languageMgr.init();

    var soundCheckBox = new YDYW_CheckBox();
    soundCheckBox.init(canvas);
    var languageCheckBox = new YDYW_CheckBox();
    languageCheckBox.init(canvas);

    var Menu = new YDYW_Container();
    Menu.init(canvas);

    //var welcome = new YDYW_Welcome();
    //welcome.init(canvas);
    //welcome.set({
    //    top: doorTop,
    //    left: insideDoorLeft,
    //    width: doorWidth,
    //    height: doorHeight,
    //    languageMgr: languageMgr
    //});

    //var welcome = new YDYW_Button();
    //welcome.init(canvas);
    //welcome.set({
    //    top: doorTop  + doorHeight/2.0 - 50,
    //    left: outsideDoorLeft + 40,
    //    type: "tab",
    //    text : "outside door",
    //    visible: false,
    //    fill: '#c8878e',
    //    zoomFactor: zoomFactor
    //});

    SetupMenu();
    languageMgr.setLanguage("English");
    DevControlFunctionality();
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
            var img = imageManager.getImage("krishna");
            img.set({
                left: (outsideDoorLeft + doorWidth/2.0 - 30) * zoomFactor,
                top: (doorTop + doorHeight/2.0 - 30) *zoomFactor,
                width: 60 * zoomFactor,
                height: 60 * zoomFactor,
            });
            canvas.add(img);
            var ptrn = imageManager.getPattern("donald");
            outsideDoor.set({fill: ptrn});
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
        weatherView = new YDYW_Weather();
        weatherView.init(canvas);
        weatherView.set({
            top: 520,
            left: 320,
            height: 300.0,
            width: doorWidth,
            visible: false
        });
        WeatherContainer = new YDYW_Container();
        WeatherContainer.init(canvas);
        WeatherContainer.set({
            top: doorTop + 10 ,
            left: insideDoorLeft + 10,
            height: 190.0,
            width: doorWidth - 20,
            fill: "transparent",
            stroke: "black",
            visible: false,
            zoomFactor: zoomFactor

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
            },
            cb: function() {
                lock.toggleLockedStatusAndShow();

            }
        });
        lock.toggleLockedStatusAndShow();
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

        menuButton = new YDYW_Button();
        menuButton.init(canvas);
        menuButton.set({
            left: insideDoorLeft + doorWidth - 40,
            top: doorTop  + doorHeight/2.0 + 70,
            type: "icon", // label/icon/tab
            //text: "Menu", // displays the text inside the button
            zoomFactor: zoomFactor,
            textSize: 50, // textSize
            radius: 50, // define a radius if you are going to make an icon. you dont need to do this for the label
            icon: "js/assets/svg/circle.svg", //icon asset path
            cb: function(){
                if(menuButton.selected === true){
                    //welcome.hide();
                    WeatherContainer.hide();
                    weatherView.hide();
                    Menu.hide();
                    soundCheckBox.hide();
                    languageCheckBox.hide();
                    menuButton.selected = false;
                }else{
                   // welcome.show();
                    WeatherContainer.show();
                    weatherView.show();
                    Menu.show();
                    menuButton.selected = true;
                }

            }
        });


    }

    function SetupMenu () {
        var menuPosAndSize = {
            top: (doorTop + doorHeight/2.0) - 100,
            left: insideDoorLeft + doorWidth/2.0 - 150,
            height : 200,
            width : 300
        };
        soundCheckBox.addEntries(soundMgr.getIDs());
        soundCheckBox.onSelect(function(id) {
            soundMgr.setCurrent(id);
            soundMgr.play();
            soundCheckBox.hide();
            Menu.show();
        });
        soundCheckBox.set({
            top: menuPosAndSize.top,
            left: menuPosAndSize.left,
            height : menuPosAndSize.height,
            width : menuPosAndSize.width,
            zoomFactor: zoomFactor,
            caption: "chimes"
        });
        soundCheckBox.hide();




        languageCheckBox.addEntries(languageMgr.getLanguages());
        languageCheckBox.onSelect(function(id) {
            languageMgr.setLanguage(id);
            languageCheckBox.hide();
            Menu.show();
        });
        languageCheckBox.set({
            top: menuPosAndSize.top,
            left: menuPosAndSize.left,
            height : menuPosAndSize.height,
            width : menuPosAndSize.width,
            zoomFactor: zoomFactor,
            caption: "language"
        });
        languageCheckBox.hide();
        //Do this to whatever element needs to change its text when a new language is selected.
        languageMgr.addSetTextCallback(soundCheckBox.setTextCallback.bind(soundCheckBox));
        languageMgr.addSetTextCallback(languageCheckBox.setTextCallback.bind(languageCheckBox));

        Menu.set({
            top: menuPosAndSize.top,
            left: menuPosAndSize.left,
            height : menuPosAndSize.height,
            width : menuPosAndSize.width,
            stroke : "white",
            fill : "white",
            visible: false,
            RowHeadings : ["testing"],
            RowIconNumber : [5,4,5],
            buttonDataList: [
                    {
                        type: "icon", // label/icon/tab
                        text: "language", // displays the text inside the button
                        icon: "js/assets/img/icons/language.svg", //icon asset path
                        cb:function() {
                            languageCheckBox.show();
                            Menu.hide();
                        }
                    },
                    {
                        type: "icon", // label/icon/tab
                        text: "chimes", // displays the text inside the button
                        icon: "js/assets/img/icons/music.svg", //icon asset path
                        cb:function() {
                            soundCheckBox.show();
                            Menu.hide();
                        }
                    },
                    {
                        icon: 'js/assets/svg/childsafe.svg',
                        icon2: 'js/assets/svg/childunsafe.svg',
                        text: "Child Safety"
                    },
                    {
                        icon: 'js/assets/svg/key.svg',
                        text: "Keys"
                    },
                    {
                        icon: 'js/assets/svg/housesecure.svg',
                        icon2: 'js/assets/svg/houseunsecure.svg',
                        text: "  Home Alarm"
                    },
                    //[
                    //    {
                    //        text: 'inside door'
                    //    },
                    //    {
                    //        text: 'outside door'
                    //    }
                    //],
                    {
                        icon: 'js/assets/svg/users.svg',
                        text: "Users"
                    },
                    {
                        icon: 'js/assets/svg/camera.svg',
                        text: "Camera"
                    },
                    {
                        icon: 'js/assets/svg/mirror.svg',
                        text: "Mirror"
                    },
                    {
                        icon: 'js/assets/svg/notes.svg',
                        text: "Notes"
                    },
                    {
                        icon: 'js/assets/svg/maps.svg',
                        text: "Maps"
                    },
                    {
                        icon: 'js/assets/svg/doorlog.svg',
                        text: "Door Log"
                    },
                    {
                        icon: 'js/assets/svg/help.svg',
                        text: "Tutorial"
                    },
                    {
                        icon: 'js/assets/svg/alert.svg',
                        text: "Emergency"
                    },
                    {
                        icon: 'js/assets/svg/paint.svg',
                        text: "Theme"
                    }],
            zoomFactor: zoomFactor
        });

        languageMgr.addSetTextCallback(Menu.setTextCallback.bind(Menu));
    }

    function LoadImages () {
        imageManager = new YDYW_imageLoader();
        imageManager.init();
        imageManager.addImage({url:"js/assets/img/profiles/KB.jpg", id:"krishna"});
        imageManager.addPattern({url:"js/assets/img/profiles/people1.jpg", id:"kid"});
    }

    function DevControlFunctionality () {
        var approachIn = document.getElementById("doorApproachInside");
        approachIn.addEventListener("click", function(){});
        var approachOut = document.getElementById("doorApproachOutside");
        approachOut.addEventListener("click", function(){});
    }

    function AddUsers() {
        //passCode: 1234, handPrint:'js/assets/img/icons/hand.png'
        userManager.addUser({name:"Kyle", img:'js/assets/img/icons/p3.jpg'});
        userManager.addUser({name:"Shiwangi", img:'js/assets/img/icons/people2.jpg'});
        userManager.addUser({name:"Saumya", img:'js/assets/img/icons/people1.jpg'});
        userManager.addUser({name:"Krishna", img:'js/assets/img/icons/people4.jpg'});
    }

    function SetupDoorLogSystem(){
        /*doorLogButton = new YDYW_Button();
        doorLogButton.init(canvas);
        doorLogButton.set({
            left: insideDoorLeft + 80,
            top: doorTop  + doorHeight/2.0 - 70,
            type: "icon", // label/icon/tab
            //text: "Menu", // displays the text inside the button
            zoomFactor: zoomFactor,
            textSize: 50, // textSize
            radius: 50, // define a radius if you are going to make an icon. you dont need to do this for the label
            icon: "js/assets/svg/circle.svg", //icon asset path
            cb: function(){
                if(menuButton.selected === true){
                    Menu.hide();
                    soundCheckBox.hide();
                    languageCheckBox.hide();
                    menuButton.selected = false;
                }else{
                    Menu.show();
                    menuButton.selected = true;
                }

            }
        });*/
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