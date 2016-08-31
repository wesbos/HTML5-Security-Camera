var App = {

	URL : window.location.origin,

	init : function( selector ) {

		navigator.getUserMedia = (navigator.getUserMedia) ? navigator.getUserMedia : navigator.webkitGetUserMedia;

		// Setup Video
		var self = this,
			video = document.createElement( 'video' ),
			// Create Canvas
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			// Grab container
			container = document.querySelector(selector),
			imageDump = document.querySelector('.imageDump'),
			currentPixels,
			lastPixels;



			navigator.getUserMedia({ video : true},function(stream){
				console.log('wat');
				// normalize the source stream
				var src = (window.webkitURL) ? window.webkitURL.createObjectURL(stream) : stream;
				// Prep Video
				video.src = src;
				video.setAttribute('autoplay', true);
				container.appendChild(video);
				// Prep canvas
				canvas.width = 350;
				canvas.height = 350;

				container.appendChild(canvas);
				// start the canvas writing
				setInterval(function(){
					ctx.drawImage(video,0,0,canvas.width,canvas.height);
					lastPixels = currentPixels;
					currentPixels = ctx.getImageData(0,0,canvas.width,canvas.height);

					var same = App.utils.equal(lastPixels,currentPixels,150),
						color = (same) ? "green" : "red",
						imageData = canvas.toDataURL("image/jpg");

					// send image over socket


					if(!same) {
						self.socket.emit('sendImage', { image : imageData });
						console.log('sending image..');
				    var img = new Image();
							img.src = canvas.toDataURL("image/jpg");
							imageDump.appendChild(img);
					}
					document.body.style.backgroundColor = color;

				}, 1000);

			},
			function(err) {
        alert('y\'all need getUserMedia to run ths demo!');
				console.log("ERROR SON! ",err);
			});

	},
	utils : {
		diff : function(array1, array2) {
			return array1.filter(function(i) {
				return (array2.indexOf(i) > -1);
			});
		},
		equal : function(a, b, tolerance) {

		var
			aData     = a && a.data || [],
			bData     = b.data,
			length    = aData.length,
			i;

		tolerance = tolerance || 0;

		for (i = length; i--;) if (aData[i] !== bData[i] && Math.abs(aData[i] - bData[i]) > tolerance) return false;

		return true;
		}
	},
	connect : function() {
		this.socket = io.connect(App.URL);
		var dump = $('.imageDump');
	},
	sendImage : function( image ) {
    console.log('sending...');
    this.socket.emit('sendImage',{
			image : image
		});
	},
	view : function() {
		var dump = $('.imageDump');
		this.socket.on('getImage',function(data) {
			console.log(data);
			var image = new Image();
				image.src = data.image;
				dump.prepend(image);
			// console.log('getImage Triggered');
		});

	}

};

$(function() {
	// App.connect();
	// App.init('#container');
});
