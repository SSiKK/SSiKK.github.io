var YDYW_Maps = SVG_Imitator.extend({
	init: function (canvas) { // Initialize 
		//Attributes
		this.left = null;
		this.top = null;
		this.width = null;
		this.height = null;

		//var apikey = "AIzaSyDUKdlzQb66rveFae-G34RdxJ4Ld4jJYdQ"

		//create an array of images 

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
		// Draw map 

		var that = this;
		var leftRef = this.left + 377 ;
		var topRef = this.top + 800 ;

		var path = "js/assets/maps/";
		var ext = ".PNG"
		var genRandomNum = Math.floor(Math.random()*5);
		console.log("Map selected : " + genRandomNum );
		imgFile = path + genRandomNum  + ext; 

 		fabric.Image.fromURL( imgFile, function(img) {
 			that.mapBox = img.set({
	            left: leftRef,
	            top: topRef,
	            scaleX: 1,
	            scaleY: 1,
	            originX: 'center',
	            originY: 'center',
	            stroke : '#2e2e1f',
	            strokeWidth : 1.2,
	            selectable: false,
	            hasControls: false,
	            hasBorders: false,
	            lockMovementX: true,
	            lockMovementY: true
 			})
 			that.canvas.add(that.mapBox);

        });
		console.log ("MapBox being drawn!", this);
       
       fabric.Image.fromURL( "js/assets/maps/cancel.png", function(img) {
 			that.mapBoxCancel = img.set({
	            left: leftRef + 280,
	            top: topRef - 200,
	            scaleX: 0.3,
	            scaleY: 0.3,
	            originX: 'center',
	            originY: 'center',
	            selectable: true,
	            hasControls: false,
	            hasBorders: false,
	            lockMovementX: true,
	            lockMovementY: true
	            //visible: that.showsub
 			})
 			.on('selected', function() {
  				console.log('selected a the cancel button');
  				//that.mapBox.setVisible(false);
  				that.canvas.remove(that.mapBox); 
  				//that.mapBoxCancel.setVisible(false);
  				that.canvas.remove(that.mapBoxCancel); 

			});
 			that.canvas.add(that.mapBoxCancel);
 			that.canvas.deactivateAll();
            that.canvas.renderAll();

        });
       		// to cancel the map box
       		//that.mapBoxCancel
	},

	showMapFromMenu : function (){

	},

	showMapWithNotification : function(){

	}

	// initMap : function() {
	// 	//Promises with language icons.
	// 	console.log("Inside init");
	// 	var map;
	// 	var that = this;
 //        map = new google.maps.Map(that.mapBox.getActiveObject()), {
 //          center: {lat: -34.397, lng: 150.644},
 //          zoom: 8
 //        });


});
