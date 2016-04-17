var YDYW_Button = SVG_Imitator.extend({
	init: function (canvas) { // Initialize
		//Attributes
		this.cx = null;
		this.cy = null;
		this.button = null;
		this.left = null;
		this.top = null;
		this.width = 30;
		this.height = 20;
		this.radius = 30;
		this.shape = "rect"; // button type can be circle or rect
		this.type = "label"; // button type can be icon or label
		this.text = "label";
		//this.fill = 'none';
		this.icon = null;
		this.imgSrc = null;
		this.zoomFactor = null;
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
		// Draw
		console.log ("being drawn!", this);

		var label = new fabric.Text(this.text,{
			fontSize: 20,
			originX: 'center',
			originY: 'center'
		});
		label.setColor('black');

		var fillColor = 'none';
		var shapeObject = null;


		if (this.type === "icon") {


			var group;
			this.icon = 'js/assets/svg/camera.svg';

			if(this.icon != null){

				fabric.loadSVGFromURL(this.icon,function(objects,options){

					shapeObject = new fabric.Circle({
						fill: 'transparent',
						stroke: 'white',
						radius: that.radius,
						originX: 'center',
						originY: 'center'
					});



					var img = fabric.util.groupSVGElements(objects, options);
					//var img = objects;
					img.set({
						height: objects.height,
						width: objects.width,
						selectable: true,
						hasBorders: true,
						top: shapeObject.top,
						left : shapeObject.left,
						originX: 'center',
						originY: 'top'
						/*stroke : 'black',
						strokeWidth : 10,
						clipTo: function (ctx) {
							ctx.arc(0, 0, that.radius, 0, Math.PI * 2, true);
						}*/
					}).scale(that.radius/options.height);


					label.set({
						top: shapeObject.top + that.radius * 2 ,
						left: shapeObject.left, //(label.width/2),
						originX: 'center',
						originY: 'center'
					});


					that.button = new fabric.Group([img,shapeObject,label], {
						left: that.cx * that.zoomFactor,
						top: that.cy * that.zoomFactor,
						hasControls: false,
						selectable: true,
						hasBorders: true,
						lockMovementX: true,
						lockMovementY: true
					});


					that.canvas.add(that.button);
					//that.canvas.add(img);


			});

			}

		} else if (this.type === "label") {

			var rectWidth = label.width + 10;
			var rectHeight = 30 + 5;

			shapeObject = new fabric.Rect({
				originX: 'center',
				originY: 'center',
				stroke: 'black',
				fill: fillColor,
				width: rectWidth,
				height: rectHeight,
				rx: 10,
				ry: 10
			});

			label.originX = 'center';
			label.originY = 'center';


			//this.addToCanvas();

			this.button = new fabric.Group([shapeObject,label], {
				left: this.cx,
				top: this.cy,
				hasControls: false,
				hasBorders: true,
				lockMovementX: true,
				lockMovementY: true });


			this.canvas.add(this.button);


			this.button.on('mouseover', function(e) {
				shapeObject.setFill('grey');
				canvas.renderAll();
				//console.log ("hover event!", this);

			});

			this.button.on('mouseout', function(e) {
				shapeObject.setFill('none');


				canvas.renderAll();
				//console.log ("hover event!", this);

			});



		}
		canvas.renderAll();
	},

	pressButton: function(cb) {

		this.button.on('mouse:down', cb);

	},

	textCallback: function(str){
		this.set({text: str});
	},

	addToCanvas: function(){

		console.log("This is reaching");
		this.button = new fabric.Group([this.shapeObject,this.label], {
			left: this.cx,
			top: this.cy,
			hasControls: false,
			hasBorders: true,
			lockMovementX: true,
			lockMovementY: true });


		this.canvas.add(this.button);


		this.button.on('mouseover', function(e) {
			shapeObject.setFill('grey');
			canvas.renderAll();
			//console.log ("hover event!", this);

		});

		this.button.on('mouseout', function(e) {
			shapeObject.setFill('none');


			canvas.renderAll();
			//console.log ("hover event!", this);

		});
	}


});