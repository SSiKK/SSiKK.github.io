var container = Class.extend({


	construct: function () {

	},
	init: function (data) {
		this.left = data.left;
		this.top = data.top;
		this.width = data.width;
		this.height = data.height;
		this.canvas = data.canvas;
		this.board = new fabric.Rect({
			id: "controlBoard",
			left: this.left,
			top: this.top,
			fill: this.fill,
			stroke: this.stroke,
			rx : 10,
			ry : 10,
			width: this.width,
			height: this.height,
			angle: 0
		});
		this.board.hasControls = this.board.hasBorders = false;
		this.board.lockMovementX = this.board.lockMovementY = true;
		this.canvas.add(this.board);
	},
	add: function (data){
		this.controlAndOffsetList.push(data);
	},
	reposition: function(data) {
		this.left = data.left;
		this.top = data.top;
		this.board.set({
			left: this.left, 
			top: this.top
		});
		for (var i=0; i<this.controlAndOffsetList.length; i++){
			var temp = this.controlAndOffsetList[i];
			temp.control.reposition({
				left: temp.offsetLeft + this.left, 
				top: temp.offsetTop + this.top
			});
		}
		canvas.deactivateAll().renderAll();
	}

});