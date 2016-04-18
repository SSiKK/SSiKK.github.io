var YDYW_Button = SVG_Imitator.extend({
	init: function (canvas) { // Initialize
		//Attributes
		this.cx = null;
		this.cy = null;
		this.button = null;
		this.left = null;
		this.top = null;
		this.img = null;
		this.width = null;
		this.height = null;
		this.radius = 40;
		this.shape = "rect"; // button type can be circle or rect
		this.type = "label"; // button type can be icon or label
		this.text = "";
		this.textSize = 30;
		this.icon = null;
		this.icon2 = null;
		this.imgSrc = null;
		this.fill = null;
		this.zoomFactor = null;
		this.canvas = null;
		this.strokeWidth = 1;
		this.cb = function(){};
		this.visible = true;
		//Feature specific status flags
		this.on = false;
		this.selected = false;

		if (canvas!==undefined && canvas!== null) {
			this.attachToCanvas(canvas);
		}
	},
	attachToCanvas: function(canvas) {
		this.canvas = canvas;
		return this;
	},

	draw: function () {
		var that = this;
		// Draw
		// console.log ("being drawn!", this);

		var label = new fabric.Text(this.text,{
			fontFamily: "helvetica",
			fontSize: this.textSize,
			textAlign: "center",
			originX: 'center',
			originY: 'center'
		});
		this.label = label;
		label.setColor('black');

		var fillColor = this.fill;
		// console.log("The fill color is "+ fillColor);
		var shapeObject = null;
		var promises = [];

		if (this.type === "img"){

			if(this.icon === null) this.icon = '../js/assets/img/icons/orange_circle.svg';
			if(this.icon != null) {

				var iconpromise1 = new Promise(function(resolve, reject){
					fabric.Image.fromURL(that.icon,function(img) {
						resolve(
							img.set({
								height: options.height,
								width: options.width,
								selectable: false,
								hasBorders: false,
								originX: 'center',
								originY: 'center'
							}).scale(that.radius/options.height)
						);
					});
				});
				promises.push(iconpromise1);
				shapeObject = new fabric.Circle({
					fill: 'transparent',
					selectable: false,
					stroke: 'black',
					strokeWidth: that.strokeWidth,
					radius: that.radius,
					originX: 'center',
					originY: 'center'
				});

				label.set({
					top: shapeObject.top + that.radius * 2 ,
					left: shapeObject.left, //(label.width/2),
					originX: 'center',
					originY: 'center'
				});
				Promise.all(promises)
					.then(function(results) {
						console.log(results);
						var img1 = results[0];
						if(img1!=null) {
							that.button = new fabric.Group([img1, shapeObject, label], {
								left: that.left * that.zoomFactor,
								top: that.top * that.zoomFactor,
								originX: 'center',
								originY: 'center',
								hasControls: false,
								selectable: true,
								hasBorders: false,
								lockMovementX: true,
								lockMovementY: true,
								visible: that.visible
							});
						} else {
							that.button = new fabric.Group([ shapeObject, label], {
								left: that.left * that.zoomFactor,
								top: that.top * that.zoomFactor,
								originX: 'center',
								originY: 'center',
								hasControls: false,
								selectable: true,
								hasBorders: false,
								lockMovementX: true,
								lockMovementY: true,
								visible: that.visible
							});
						}

						that.canvas.add(that.button);
					});

			}
		}else if (this.type === "icon") {



			if(this.icon === null) this.icon = '../js/assets/svg/camera.svg';
			//if(this.icon2 === null) this.icon2 = '../js/assets/svg/camera.svg';

			if(this.icon != null){

				var iconpromise1 = new Promise(function(resolve, reject){
					fabric.loadSVGFromURL(that.icon,function(objects,options) {
						resolve(

						fabric.util.groupSVGElements(objects, options).set({
								height: options.height,
								width: options.width,
								selectable: false,
								hasBorders: false,
								originX: 'center',
								originY: 'center'
							}).scale(that.radius/options.height)

						);
					});

				});

				promises.push(iconpromise1);

				if(that.icon2 !=null){

					iconpromise2 = new Promise(function(resolve, reject){
						fabric.loadSVGFromURL(that.icon2,function(objects,options) {
							resolve(

								fabric.util.groupSVGElements(objects, options).set({
									height: options.height,
									width: options.width,
									selectable: false,
									hasBorders: false,
									originX: 'center',
									originY: 'center',
									visible: false
								}).scale(that.radius/options.height)

							);
						});

					});
					promises.push(iconpromise2);

				}

				shapeObject = new fabric.Circle({
							fill: 'transparent',
							selectable: false,
							stroke: 'black',
							strokeWidth: that.strokeWidth,
							radius: that.radius,
							originX: 'center',
							originY: 'center'
				});

				label.set({
							top: shapeObject.top + that.radius * 2 ,
							left: shapeObject.left, //(label.width/2),
							originX: 'center',
							originY: 'center'
				});

				Promise.all(promises)
					.then(function(results){
						console.log(results);
						var img1, img2;

						//if(that.icon2 === null){

							img1 = results[0];
							that.img = img1;

							if(that.icon2 === null) {
								that.button = new fabric.Group([img1, shapeObject, label], {
									left: that.left * that.zoomFactor,
									top: that.top * that.zoomFactor,
									originX: 'center',
									originY: 'center',
									hasControls: false,
									selectable: true,
									hasBorders: false,
									lockMovementX: true,
									lockMovementY: true,
									visible: that.visible
								});
							} else{
								img2 = results[1];
								that.button = new fabric.Group([img1,img2, shapeObject, label], {
									left: that.left * that.zoomFactor,
									top: that.top * that.zoomFactor,
									originX: 'center',
									originY: 'center',
									hasControls: false,
									selectable: true,
									hasBorders: false,
									lockMovementX: true,
									lockMovementY: true,
									visible: that.visible
								});
							}

							//console.log("This is the icon button",img);
							that.button.on('mousedown', function(e) {

								shapeObject.setStroke('white');
								label.setColor('white');
								if(that.icon2 === null)
									that.img.setColor('white');
								else{
									img2.setColor('white');
									that.img.setColor('white');
									if(that.selected === true) {
										that.img.set({visible: false});
										img2.set({visible: true});
										that.selected = false;
									} else {
										that.img.set({visible:true});
										img2.set({visible:false});
										that.selected = true;
									}
								}
								canvas.renderAll();
								that.cb();

							});

							that.button.on('mouseup', function(e) {

								shapeObject.setStroke('black');
								label.setColor('black');
								if(that.icon2 === null)
									that.img.setColor('black');
								else{
									img2.setColor('black');
									that.img.setColor('black');
								}
								canvas.renderAll();

								//console.log ("hover event!", this);

							});

							//that.button.on('mouse')

							//that.button.on()

							that.canvas.add(that.button);
							//that.canvas.add(img);
						//}

					});
			}

		}
		else if (this.type === "label") {


			var rectWidth = label.width + 10;
			var rectHeight = this.textSize + 5;

			shapeObject = new fabric.Rect({
				originX: 'center',
				originY: 'center',
				stroke: 'black',
				strokeWidth: this.strokeWidth,
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
				lockMovementY: true,
				visible: this.visible});


			this.canvas.add(this.button);

			this.button.on('mouseover', function(e) {

				//console.log(fillColor, colorLuminance(fillColor, 0.15));
				shapeObject.setFill(colorLuminance(fillColor, 0.15));
				canvas.renderAll();


			});

			this.button.on('mouseout', function(e) {

				shapeObject.setFill(fillColor);
				canvas.renderAll();



			});

		}
		else if(this.type = "tab"){

			var rectWidth = this.width || label.width + 10;
			var rectHeight = this.height || this.textSize + 5;

			//label.set({textAlign: 'center'});


			shapeObject = new fabric.Rect({
				originX: 'center',
				originY: 'center',
				stroke: 'black',
				strokeWidth: this.strokeWidth,
				fill: fillColor,
				width: rectWidth,
				height: rectHeight
				//visible: this.visible
			});

			label.originX = 'center';
			label.originY = 'center';

			this.button = new fabric.Group([shapeObject,label], {
				left: this.left,
				top: this.top,
				hasControls: false,
				hasBorders: true,
				selectable: true,
				lockMovementX: true,
				lockMovementY: true,
				visible: this.visible
			});


			this.canvas.add(this.button);


			this.button.on('mousedown', function(e) {
				console.log("the object is selected");
				if(this.selected != true){

					this.selected = true;
					//console.log(fillColor, colorLuminance(fillColor, 0.15));
					shapeObject.setFill(colorLuminance(fillColor, 0.15));


				}
				else if(this.selected === true){

					this.selected = false;
					shapeObject.setFill(fillColor);

				}

				canvas.renderAll();
				//console.log ("hover event!", this);

			});

		}

		canvas.renderAll();
	},

	pressButton: function(cb) {

		this.button.on('mousedown', cb);

	},

	setTextCallback: function(dict){
		this.label.set({text: dict[this.text] || this.text});
	},

	hide: function(){
		this.button.set({visible:false});
		this.showing = false;
	},
	show: function(){
		this.button.set({visible:true});
		this.showing = true;
	},
	toggle: function() {
		if (this.showing) {
			this.hide();
		} else {
			this.show();
		}
	}

});


//Hex value is used to define the color, -.10 ( make it ten percent darker), 0.20 (make it twenty percent lighter)
function colorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}
