var YDYW_Weather = SVG_Imitator.extend({
    init: function(canvas) { // Initialize
        //Attributes
        this.left = null;
        this.top = null;
        this.width = null;
        this.height = null;

        this.temperature = null;
        this.timeOfDay = null;
        this.dayOfWeek = null;
        this.killInterval = null;

        this.monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        this.daysAbbr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        this.url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
        // Canvas on which the object is created.
        this.canvas = null;

        //Feature specific status flags
        this.on = false;
        if (canvas !== undefined && canvas !== null) {
            this.attachToCanvas(canvas);
        }
    },
    attachToCanvas: function(canvas) {
        this.canvas = canvas;
    },

    draw: function() {
        // Draw
        console.log("Weather Display Box!", this);
        var that = this;

        this.timeOfDay = new fabric.Text(this.currentTime(), {
            originY: 'center',
            originX: 'center',
            left: this.left,
            top: this.top - 450,
            fontFamily: 'Helvetica',
            fontSize: 40
        })

        this.killInterval = setInterval(function() {
        	that.timeOfDay.setText(that.currentTime());
            that.canvas.deactivateAll();
            that.canvas.renderAll();

        }, 1000)

        this.dayOfWeek = new fabric.Text(that.currentDate(), {
            originY: 'center',
            originX: 'center',
            left: this.left + 200,
            top: this.top - 395,
            fontFamily: 'Helvetica',
            fontSize: 30
        })

        this.displayWeather()
        	.then(function(response){
        		console.log("our weather response is", response);
        		var resJSON = JSON.parse(response);
        		var temp = resJSON.query.results.channel.item.condition.temp + " F";
        		console.log("temp is", temp);
		        that.temperature = new fabric.Text(temp, {
		            originY: 'center',
		            originX: 'center',
		            left: that.left - 200,
		            top: that.top - 400,
		            fontFamily: 'Helvetica',
		            fontSize: 30
		        })
				that.canvas.add(that.temperature)
        	})

		this.canvas.add(this.timeOfDay)
		this.canvas.add(this.dayOfWeek)

    },

    displayWeather: function() {
    	var that = this;
    	return new Promise(function(resolve, reject) {
        	var xmlhttp = new XMLHttpRequest();
        		xmlhttp.open("GET", that.url, true);
    			xmlhttp.onload = function() {
    				console.log(xmlhttp.readyState, xmlhttp.status);
    				if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    					resolve(xmlhttp.response);
    				else
    					reject(Error(xmlhttp.statusText));
    			};
    			xmlhttp.onerror = function() {
    				reject(Error("Network Error"));
    			}

        		xmlhttp.send();
    	})
    },

    currentTime: function() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes()
        var seconds = currentTime.getSeconds()
        if (seconds < 10) { seconds = "0" + seconds; }
        if (minutes < 10) { minutes = "0" + minutes; }
        var suffix = "AM";
        if (hours >= 12) {
            suffix = "PM";
            hours = hours - 12;
        }
        if (hours == 0) { hours = 12; }
        return hours + ":" + minutes + ":" + seconds + " " + suffix;
    },

    currentDate: function() {
        var currentDate = new Date();
        var day = this.daysAbbr[currentDate.getDay()];
        var date = currentDate.getDate()
        var month = this.monthAbbr[currentDate.getMonth()];
        return day + "\n" + month + " " + date;
    }



});
