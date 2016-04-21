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

    // Door elements
    var lock;
    var doorBell;
    var menuButton;


    var handRect;
    var authReqMsg;
    var mobileRect;
    var logNumber;

    var defaultValuesForFabricObjects = {
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: false,
        selectable: false,
        lockMovementX: true,
        lockMovementY: true
    };

    window.canvas = this.__canvas = new fabric.Canvas('c');

    var zoomFactor = canvas.height / localHeight;


    // set background to blue to make it easier to see it
    canvas.backgroundColor = "#DDDDDD"; // light grey

    // Draw the Basic In/Outside doors,
    var insideDoor, outsideDoor;
    var doors = DrawDoors();
    insideDoor = doors.inside;
    outsideDoor = doors.outside;

    // Draw the Message Box

    //Draw message on the outside door
    // DrawMessageBoxOutside();

    var messagesInside = initMessages(canvas);
    var messageOut = initMessageBoxOutside(canvas)
    // messageOut.show();

    var languageMgr = new YDYW_languageManager();
    languageMgr.init();


    // Draw the Camera view and associated controls
    var cameraView = initCamera(canvas);

    // Draw the Camera view and associated controls
    var mirrorView = initMirror(canvas);
    // window.mirror = mirrorView;

    //Maps Layout
    var mapView = initMap(canvas);


    //Weather layout
    var weatherView, WeatherContainer;
    DrawWeatherLayout();


    //Weather layout
    DrawWeatherLayout();

    // Draw emergencyView
    var emergencyView = initEmergency(canvas);
    //DrawThreeTapMode

    var soundMgr = new YDYW_soundManager();
    soundMgr.init();
    AddSounds();

     // Initialize the ImageManager
    var imageManager = initImageLoader();

    var userManager = new YDYW_userManager();
    userManager.init({imageLoader:imageManager});
    //Adding a few users to show
    AddUsers();

   

    DevControlFunctionality();
    placeElementsOnDoor();
    cameraView.onShowCallback(HideHandAndPhone);

    var doorLogManager = new YDYW_DoorLog();
    doorLogManager.init(canvas, imageManager);
    var doorLogButton = new YDYW_Button();
    doorLogButton.init(canvas);
    var doorLogManagerEntryPointMenu = true;

    //SetupDoorLogSystem();

    var soundCheckBox = new YDYW_CheckBox();
    soundCheckBox.init(canvas);
    var languageCheckBox = new YDYW_CheckBox();
    languageCheckBox.init(canvas);

    var wallpaperView = new YDYW_wallpaperManager();
    wallpaperView.init(canvas);



    // initialize the image wallpaper patterns.

    var wallpaperDatabase = [
        {
            //id: 1,
            key: "grey",
            fill: "grey"
        },
        {
            //id: 2,
            key: "red",
            fill: "red"

        },
        {
           //id: 3,
            key: "orange",
            fill: "orange"

        },
        {
            key: "Teal",
            fill: "Teal"

        },
        {
            key: "Wheat",
            fill: "Wheat"

        },
        {
            key: "grey",
            fill: "grey"

        },
        {
            key: "grey",
            fill: "grey"

        },
        {
            key: "grey",
            fill: "grey"

        },
        {
            key: "grey",
            fill: "grey"

        }, {
            key: "grey",
            fill: "grey"

        }

    ];
    var Menu = new YDYW_Container();
    Menu.init(canvas);


    // Draw Welcome
    var welcomeView = initWelcome(canvas);


    SetupMenu();
    languageMgr.setLanguage("English");


    // draw everything at the appropriate scale for this canvas

    zoomAll(zoomFactor);


////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Function Definitions /////////////////////////////
////////////////////////////////////////////////////////////////////////////////

    function DrawDoors() {
        // need 36 wide instead of 40 as now
        insideDoor = new fabric.Rect({
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
                emergencyView.show();
                // Hide EVERY THING
                cameraView.hide();
                mirrorView.hide();
                mapView.hide();
                weatherView.hide();
                Menu.hide();
                welcomeView.hide();
                countTaps=0;
            }
            canvas.deactivateAll();
            canvas.renderAll();
        });

        outsideDoor = new fabric.Rect({
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
            // lock.toggleLockedStatusAndShow();
        });


        // add all of the elements to the canvas

        canvas.add(insideDoor);
        canvas.add(outsideDoor);
        return {inside: insideDoor, outside: outsideDoor };
    }


    // Instantiate the message class to set the 4 parameters from SVG_Imitator
    function initMessages(canvas){

        var messageIn = new YDYW_Message();
        messageIn.init(canvas);
        messageIn.set({
            width: doorWidth,
            height: doorHeight,
            left: insideDoorLeft, // * 1.25, //300,
            top: doorTop // 25
        });
        return messageIn;
    }

  function initMessageBoxOutside(canvas){

        var messOut = new YDYW_SendIn_Message();
        messOut.init(canvas);
        messOut.set({
            width: doorWidth,
            height: doorHeight,
            left: insideDoorLeft, // * 1.25, //300,
            top: doorTop // 25
        });
        return messOut;
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
            height: 150.0,
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


    function getTime (offset) {
        if(!offset) {
            offset = 0;
        }
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds() + offset;
        m = checkTime(m);
        s = checkTime(s);
        return h + ":" + m + ":" + s;
    }
    function DrawMaps(){
        //console.log("draw bitch!");
        var mapView = new YDYW_Maps();
        mapView.init(canvas);
        mapView.set({
            left: localWidth*0.25,
            top: localHeight*0.5, // 250
            width: localWidth*0.30,
            height: localHeight*0.25
        });
    }

    // function DrawEmergency (){
    //     var emergencyView = new YDYW_Emergency();
    //     emergencyView.init(canvas);
    //     emergencyView.set({
    //         //left: doorWidth - doorWidth/2 + 22,
    //         //top: localHeight - localHeight/2 , // 250
    //         left: doorWidth + 110,
    //         top: localHeight + 110, // 250
    //         width: doorWidth*2 + 130,
    //         height: localHeight*2 + 220
    //     });
    // }



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

        var leaveMsgMsg1 = new fabric.Text("We are not in right now!",defaultValuesForFabricObjects);
        leaveMsgMsg1.set({
            fontSize: 12 * zoomFactor,
            width: doorWidth/2.5,
            height: doorHeight/18.0,
            fill: "rgba(0,0,0,1.0)",
            top: doorTop + doorHeight/2.0 - doorHeight/6.0,
            left: outsideDoorLeft + doorWidth/2.0,
            visible: false,
            selectable:true,
            id: "authReqMsg"
        });
        canvas.add(leaveMsgMsg1);

        var leaveMsgMsg2 = new fabric.Text("Touch anywhere \nto leave a message",defaultValuesForFabricObjects);
        leaveMsgMsg2.set({
            fontSize: 10 * zoomFactor,
            width: doorWidth/2.5,
            height: doorHeight/18.0,
            fill: "rgba(0,0,0,1.0)",
            top: doorTop + doorHeight/2.0 - doorHeight/12.0,
            left: outsideDoorLeft + doorWidth/2.0,
            visible: false,
            selectable:true,
            textAlign: 'center',
            id: "authReqMsg"
        });
        leaveMsgMsg2.on("selected", function() {
            messageOut.show();
        });
        leaveMsgMsg1.on("selected", function() {
            messageOut.show();
        });
        canvas.add(leaveMsgMsg2);

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
                var val = 1 + Date.now() % 4;

                doorLogManager.addEntries([{url:"js/assets/img/profiles/people" + val + ".jpg", time:getTime()}]);
                doorLogManager.heightIncrement = 30;
                HideHandAndPhone();
                window.setTimeout(function(){
                    leaveMsgMsg1.set({visible:true});
                    leaveMsgMsg2.set({visible:true});
                }, 5000);
                window.setTimeout(function(){
                    leaveMsgMsg1.set({visible:false});
                    leaveMsgMsg2.set({visible:false});
                }, 15000);
                doorLogButton.show();
                var newMsgs;
                if (logNumber.text.length > 0) {
                    newMsgs = (parseInt(logNumber.text, 10) + 1) + "";
                } else {
                    newMsgs = "1";
                }
                
                logNumber.set({text:newMsgs,visible:true})
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
                    doorLogManager.hide();
                    wallpaperView.hide();
                    mapView.hide();
                    menuButton.selected = false;
                }else{
                   // welcome.show();
                    WeatherContainer.show();
                    weatherView.show();
                    Menu.show();
                    soundCheckBox.hide();
                    languageCheckBox.hide();
                    doorLogManager.hide();
                    wallpaperView.hide();
                    mapView.hide();
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

        wallpaperView.attachToDoors(insideDoor, outsideDoor);

        wallpaperView.set({
            top: menuPosAndSize.top,
            left: menuPosAndSize.left,
            height : menuPosAndSize.height,
            width : menuPosAndSize.width,
            zoomFactor: zoomFactor,
            wallpaperList : wallpaperDatabase,
            languageManager : languageMgr,
            RowIconNumber : [5,5]
        });

        wallpaperView.hide();


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



        doorLogManager.onSelect(function() {
            doorLogManager.hide();
            if (doorLogManagerEntryPointMenu === true) {
                Menu.show();
            }
            
        });
        doorLogManager.set({
            top: menuPosAndSize.top,
            left: menuPosAndSize.left,
            height : menuPosAndSize.height,
            width : menuPosAndSize.width,
            fontSize: zoomFactor,
            caption: "log"
        });
        doorLogManager.hide();
        languageMgr.addSetTextCallback(doorLogManager.setTextCallback.bind(doorLogManager));

        doorLogButton = new YDYW_Button();
        doorLogButton.init(canvas);
        doorLogButton.set({
            left: menuPosAndSize.left - 100,
            top: menuPosAndSize.top + menuPosAndSize.height/2.0,
            type: "icon", // label/icon/tab
            //text: "Menu", // displays the text inside the button
            zoomFactor: zoomFactor,
            textSize: 50, // textSize
            radius: 50, // define a radius if you are going to make an icon. you dont need to do this for the label
            icon: 'js/assets/svg/doorlog.svg', //icon asset path
            //text: 'log',
            visible: false,
            cb: function(){
                doorLogManagerEntryPointMenu = false;
                doorLogManager.set({zoomFactor:zoomFactor});
                doorLogManager.show();
                doorLogButton.hide();
                logNumber.set({text:"0", visible:false});
            }
        });
        //languageMgr.addSetTextCallback(doorLogButton.setTextCallback.bind(doorLogButton));

        logNumber = new fabric.Text("0",defaultValuesForFabricObjects);
        logNumber.set({
            fontSize: 9 * zoomFactor,
            width: doorWidth/2.5,
            height: doorHeight/18.0,
            fill: "rgba(0,0,0,1.0)",
            left: menuPosAndSize.left - 80,
            top: menuPosAndSize.top + menuPosAndSize.height/2.0 - 26,
            visible: false,
            selectable:true,
            id: "logNumber",
            originX: "left"
        });
        canvas.add(logNumber);
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
                        icon: 'js/assets/svg/camera.svg',
                        text: "camera",
                        cb: function() {
                            cameraView.show();
                            Menu.hide()
                        }
                    },
                    {
                        icon: 'js/assets/svg/key.svg',
                        text: "keys"
                    },
                    {
                        icon: 'js/assets/svg/housesecure.svg',
                        icon2: 'js/assets/svg/houseunsecure.svg',
                        text: "homeAlarm"
                    },
                    {
                        icon: 'js/assets/svg/users.svg',
                        text: "users"
                    },

                    {
                        icon: 'js/assets/svg/mirror.svg',
                        text: "mirror",
                        cb: function() {
                            mirrorView.show();
                            Menu.hide();
                        }
                    },
                    {
                        icon: 'js/assets/svg/notes.svg',
                        text: "notes",
                        cb: function() {
                            messagesInside.show();
                            Menu.hide();
                        }
                    },
                    {
                        icon: 'js/assets/svg/help.svg',
                        text: "tutorial",
                        cb: function() {
                            welcomeView.show();
                            Menu.hide();
                        }
                    },
                    {
                        icon: 'js/assets/svg/childsafe.svg',
                        icon2: 'js/assets/svg/childunsafe.svg',
                        text: "childSafety"
                    },
                    {
                        type: "icon", // label/icon/tab
                        cb:function() {
                            doorLogManagerEntryPointMenu = true;
                            doorLogManager.set({zoomFactor:zoomFactor});
                            doorLogManager.show();
                            Menu.hide();
                        },
                        icon: 'js/assets/svg/doorlog.svg',
                        text: "log"
                    },
                    {
                        icon: 'js/assets/svg/maps.svg',
                        text: "maps",
                        cb: function() {
                            mapView.show();
                            Menu.hide();
                        }
                    },

                    {
                        icon: 'js/assets/svg/alert.svg',
                        text: "emergency",
                        cb: function() {
                            emergencyView.show();
                            Menu.hide();
                        }
                    },
                    {
                        type: "icon",
                        icon: 'js/assets/svg/paint.svg',
                        text: "theme",
                        cb:function(){
                            wallpaperView.show();
                            Menu.hide();
                        }
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
        imageManager.addPattern({url:"js/assets/img/icons/hand.png", id:"hand"});
        imageManager.addPattern({url:"js/assets/img/icons/mobile.png", id:"mobile"});
        handRect = new fabric.Rect(defaultValuesForFabricObjects);
        handRect.set({
            width: doorWidth/5.0,
            height: doorHeight/9.0,
            stroke: "rgba(20,20,20,1.0)",
            top: doorTop + doorHeight/2.0,
            left: outsideDoorLeft + 150,
            visible: false,
            selectable:true,
            id: "handScannerImg"
        });
        canvas.add(handRect);

        mobileRect = new fabric.Rect(defaultValuesForFabricObjects);
        mobileRect.set({
            width: doorWidth/5.0,
            height: doorHeight/9.0,
            stroke: "rgba(20,20,20,1.0)",
            top: doorTop + doorHeight/2.0,
            left: outsideDoorLeft + doorWidth/5.0 + 170,
            visible: false,
            selectable:true,
            id: "handScannerImg"
        });
        canvas.add(mobileRect);
        authReqMsg = new fabric.Text("To unlock, place hand or tap phone",defaultValuesForFabricObjects);
        authReqMsg.set({
            fontSize: 9 * zoomFactor,
            width: doorWidth/2.5,
            height: doorHeight/18.0,
            fill: "rgba(0,0,0,1.0)",
            top: doorTop + doorHeight/2.0 + doorHeight/12.0,
            left: outsideDoorLeft - doorWidth/8.0 + 150,
            visible: false,
            selectable:true,
            id: "authReqMsg",
            originX: "left"
        });
        canvas.add(authReqMsg);

        var approachIn = document.getElementById("doorApproachInside");
        approachIn.addEventListener("click", function(){

        });
        var approachOutFlag = false;
        var approachOut = document.getElementById("doorApproachOutside");
        approachOut.addEventListener("click", function(){
            ShowHandAndPhone();
            cameraView.show();
            approachOutFlag = true;
        });

        //cameraView.show();
        var authSuccess = document.getElementById("authenticationSuccess");
        authSuccess.addEventListener("click", function(){
            if (approachOutFlag === true) {
                HideHandAndPhone();
                lock.toggleLockedStatusAndShow();
                cameraView.hide();
            }
            approachOutFlag = false;
        });

        var moveAwayOut = document.getElementById("moveAwayOut");
        moveAwayOut.addEventListener("click", function(){
            if (approachOutFlag === true) {
                //console.log("Somebody at the door!");
                HideHandAndPhone();
                cameraView.hide();
            }
            approachOutFlag = false;
        });
    }

    function ShowHandAndPhone() {
        handRect.set({fill:imageManager.getPattern("hand", handRect.width, handRect.height, 5), visible:true});
        mobileRect.set({fill:imageManager.getPattern("mobile", mobileRect.width, mobileRect.height, 5), visible:true});
        authReqMsg.set({visible:true});
    }

    function HideHandAndPhone() {
        handRect.set({visible:false});
        mobileRect.set({visible:false});
        authReqMsg.set({visible:false});
    }
    function AddUsers() {
        //passCode: 1234, handPrint:'js/assets/img/icons/hand.png'
        userManager.addUser({name:"Kyle", img:'js/assets/img/icons/p3.jpg'});
        userManager.addUser({name:"Shiwangi", img:'js/assets/img/icons/people2.jpg'});
        userManager.addUser({name:"Saumya", img:'js/assets/img/icons/people1.jpg'});
        userManager.addUser({name:"Krishna", img:'js/assets/img/icons/people4.jpg'});
    }

    function SetupDoorLogSystem(){
        
        doorLogManager.addEntries([{url:"js/assets/img/profiles/people1.jpg", time:getTime()},
            {url:"js/assets/img/profiles/people4.jpg", time:getTime(1)}]);

    }


    function initMirror(canvas) {
        var mirror = new YDYW_Mirror();
            mirror.init(canvas)
            mirror.set({
                width: localWidth * .30,
                height: localHeight * 0.25,
                left: localWidth * 0.25,
                top: localHeight * .3 // 250
            })
        return mirror
    }


    function initCamera(canvas){
        var camera = new YDYW_Camera();
            camera.init(canvas)
            camera.set({
                width: localWidth * .30,
                height: localHeight * 0.25,
                left: localWidth * 0.25,
                top: localHeight * .3  // 250
            })
        return camera
    }

    function initMap(canvas){
        var map = new YDYW_Maps();
        map.init(canvas);
        map.set({
            left: localWidth*0.25,
            top: localHeight*0.5, // 250
            width: localWidth*0.30,
            height: localHeight*0.25
        });
        return map
    }

    function initImageLoader() {
        var imgLoader = new YDYW_imageLoader();
        imgLoader.init();
        imgLoader.addImage({url:"js/assets/img/profiles/KB.jpg", id:"krishna"});
        imgLoader.addPattern({url:"js/assets/img/profiles/people1.jpg", id:"kid"});
        return imgLoader;
    }

    function initEmergency (canvas){
        var emergency = new YDYW_Emergency();
        emergency.init(canvas);
        emergency.set({
            top: doorTop,
            left: insideDoorLeft,
            width: doorWidth,
            height: doorHeight,
            languageMgr: languageMgr
        });
        return emergency;
    }

    function initWelcome(canvas) {
        var welcome = new YDYW_Welcome();
        welcome.init(canvas);
        welcome.set({
            top: doorTop,
            left: insideDoorLeft,
            width: doorWidth,
            height: doorHeight,
            languageMgr: languageMgr,
            //mirror: mirrorView
        })
        return welcome
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