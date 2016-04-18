var YDYW_Emergency = SVG_Imitator.extend({
	init: function (canvas) { // Initialize 
		//Attributes
		this.left = null;
		this.top = null;
		this.width = null;
		this.height = null;

		this.leftRef = this.left;
		this.topRef = this.top;

		// Canvas on which the object is created.
		this.canvas = null;

		//Feature specific status flags
		this.on = false;
		if (canvas!==undefined && canvas!== null) {
			this.attachToCanvas(canvas);
		}
	},
	attachToCanvas: function(canvas) {
		this.canvas = canvas;
	},
	
	draw: function () {

		var that = this;
		// Draw a Rect and have all the UI elements in it. 
		this.emergencyScreen = new fabric.Rect({
            angle: 0, 
            left: this.leftRef, 
            top: this.topRef,
            width: this.width,
            height: this.height,
            originX: 'center',
            originY: 'center',
            fill: '#ff9999',
            selectable: true,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true
        })

		// fabric.loadSVGFromURL('js/assets/svg/alert.svg', function(obj, opt) {
  //          	that.fireButton = fabric.util.groupSVGElements(obj, {
  //                   width: opt.width,
  //                   height: opt.height,
  //                   svgUid: opt.svgUid,
  //                   toBeParsed: opt.toBeParsed,
  //                   left: that.leftRef + 700, 
  //                   top: that.topRef + 800, 
  //                   originX: 'center',
  //                   originY: 'center',
  //                   scaleX: 0.3,
  //                   scaleY: 0.3,
  //                   fill: 'white',
  //                   hasControls: false,
  //                   hasBorders: false,
  //                   lockMovementX: true,
  //                   lockMovementY: true,
  //                   visible: true
  //               }))
		// 	that.canvas.add(that.fireButton);
  //       })


        this.canvas.add(this.emergencyScreen);
        this.canvas.deactivateAll();
        this.canvas.renderAll(); 

	},

	emergencyModeOn : function(){

	},

	callFireExt : function(){

	},

	callPolice : function(){

	}


});
