var YDYW_Button = SVG_Imitator.extend({
	init: function (canvas) { // Initialize
		//Attributes
		this.cx = null;
		this.cy = null;
		this.button = null;
		this.left = null;
		this.top = null;
		this.width = this.width || 30;
		this.height = this.height || 20;
		this.radius = this.radius || 40;
		this.shape = "rect"; // button type can be circle or rect
		this.type = "label"; // button type can be icon or label
		this.text = "label";
		this.textColor = 'none';
		this.textSize = 30;
		this.icon = null;
		this.imgSrc = null;
		this.fill = 'white';
		this.zoomFactor = null;
		// Canvas on which the object is created.
		this.canvas = null;
		this.selected = null;

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
			fontSize: this.textSize,
			originX: 'center',
			originY: 'center'
		});
		label.setColor('black');

		var fillColor = this.fill;
		var shapeObject = null;


		if (this.type === "icon") {



			if(this.icon === null) this.icon = '../js/assets/svg/camera.svg';

			if(this.icon != null){

				fabric.loadSVGFromURL(that.icon,function(objects,options){


					shapeObject = new fabric.Circle({
						fill: 'transparent',
						selectable: false,
						stroke: 'black',
						radius: that.radius,
						originX: 'center',
						originY: 'center'
					});


					var img = fabric.util.groupSVGElements(objects, options);
					//	var img = objects;
					img.set({
						height: options.height,
						width: options.width,
						selectable: false,
						hasBorders: false,
						originX: 'center',
						originY: 'center'
					}).scale(that.radius/options.height);


					//var radius = Math.sqrt(img.height * img.height + img.width * img.width) / 2;

					label.set({
						top: shapeObject.top + that.radius * 2 ,
						left: shapeObject.left, //(label.width/2),
						originX: 'center',
						originY: 'center'
					});

					//canvas.add(img);

					//img.clipTo = function(context){
					//	shapeObject.render(context);
					//};
					//canvas.renderAll();

					that.button = new fabric.Group([img,shapeObject,label], {
						left: that.left * that.zoomFactor,
						top: that.top * that.zoomFactor,
						originX: 'center',
						originY: 'center',
						hasControls: false,
						selectable: true,
						hasBorders: true,
						lockMovementX: true,
						lockMovementY: true
					});

					//console.log("This is the icon button",img);
					that.button.on('mouseover', function(e) {

						shapeObject.setStroke('white');
						label.setColor('white');
						canvas.renderAll();
						//console.log ("hover event!", this);

					});

					that.button.on('mouseout', function(e) {

						shapeObject.setStroke('black');
						label.setColor('black');
						canvas.renderAll();

						//console.log ("hover event!", this);

					});
					that.canvas.add(that.button);
					//that.canvas.add(img);


				});

			}

		}
		else if (this.type === "label") {


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

			//this.addToCanvas();

			this.button = new fabric.Group([shapeObject,label], {
				left: this.left,
				top: this.top,
				hasControls: false,
				hasBorders: true,
				lockMovementX: true,
				lockMovementY: true });


			this.canvas.add(this.button);
			console.log(this.button);

			this.button.on('mouseover', function(e) {
				shapeObject.setFill('grey');
				shapeObject.setStroke('white');
				label.setColor('white');
				canvas.renderAll();
				//console.log ("hover event!", this);

			});

			this.button.on('mouseout', function(e) {
				shapeObject.setFill(fillColor);
				shapeObject.setStroke('black');
				label.setColor('black');
				canvas.renderAll();

				//console.log ("hover event!", this);

			});

		}

		else if(this.type = "tab"){

			var rectWidth = label.width + 10;
			var rectHeight = 30 + 5;

			shapeObject = new fabric.Rect({
				originX: 'center',
				originY: 'center',
				stroke: 'black',
				fill: 'none',
				width: rectWidth,
				height: rectHeight
			});

			label.originX = 'center';
			label.originY = 'center';


			//this.addToCanvas();

			this.button = new fabric.Group([shapeObject,label], {
				left: this.left,
				top: this.top,
				hasControls: false,
				hasBorders: true,
				selectable: true,
				lockMovementX: true,
				lockMovementY: true });


			this.canvas.add(this.button);


			this.button.on('mousedown', function(e) {
				console.log("the object is selected");
				if(this.selected != true){

					this.selected = true;
					shapeObject.setFill('grey');
					shapeObject.setStroke('white');

					canvas.renderAll();
				}
				else if(this.selected === true){
					this.selected = false;
					shapeObject.setFill(fillColor);
					shapeObject.setStroke('black');
				}

				//console.log ("hover event!", this);

			});

			this.button.on('mouseout', function(e) {
				shapeObject.setFill('none');



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



});