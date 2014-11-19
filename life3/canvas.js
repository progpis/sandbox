window.life.Canvas = function(controller) {
	var canvas = this;

	var _canvas;
	var _context;
	var _width;
	var _height;
	var _center;

	//

	canvas.init = function(canvas_id) {
		_canvas = document.getElementById(canvas_id);
		_context = _canvas.getContext("2d");
		_width = _canvas.width;
		_height = _canvas.height;
		_center = {
			x: Math.floor(_width/2),
			y: Math.floor(_height/2)
		};
	};

	//

	canvas.getWidth = function() {
		return _width;
	};

	canvas.getHeight = function() {
		return _height;
	};

	canvas.getCenter = function() {
		return _center;
	};

	canvas.clear = function() {
		_context.save();
		_context.setTransform(1, 0, 0, 1, 0, 0);
		_context.clearRect(0, 0, _width, _height);
		_context.restore();
	};

	canvas.drawGuidelines = function(n, color) {
		var i;
		n = n || 8;
		color = color || '#999';
		for (i=1; i<n; i++) {
			canvas.drawLine(_width/n*i, 0, _width/n*i, _height, color);
			canvas.drawLine(0, _height/n*i, _width, _height/n*i, color);
		}
	};

	canvas.drawHex = function(x, y, r, q, color, background) {
		_context.beginPath();
		_context.moveTo(Math.floor( x-r/2 )+0.5, Math.floor( y-q )+0.5);
		_context.lineTo(Math.floor( x+r/2 )+0.5, Math.floor( y-q )+0.5);
		_context.lineTo(Math.floor( x+r   )+0.5, Math.floor( y   )+0.5);
		_context.lineTo(Math.floor( x+r/2 )+0.5, Math.floor( y+q )+0.5);
		_context.lineTo(Math.floor( x-r/2 )+0.5, Math.floor( y+q )+0.5);
		_context.lineTo(Math.floor( x-r   )+0.5, Math.floor( y   )+0.5);
		_context.closePath();
		_context.strokeStyle = color || '#000';
		if (background) {
			_context.fillStyle = background;
			_context.fill();
		}
		_context.stroke();
	};

	canvas.drawCircle = function(x, y, r, color, background) {
		_context.beginPath();
		_context.arc(Math.floor(x), Math.floor(y), r, 0, 2*Math.PI);
		_context.strokeStyle = color || '#000';
		if (background) {
			_context.fillStyle = background;
			_context.fill();
		}
		_context.stroke();
	};

	canvas.drawLine = function(x1, y1, x2, y2, color) {
		_context.moveTo(Math.floor(x1)+0.5, Math.floor(y1)+0.5);
		_context.lineTo(Math.floor(x2)+0.5, Math.floor(y2)+0.5);
		_context.strokeStyle = color || '#000';
		_context.stroke();
	};

	canvas.drawText = function(x, y, s, color, font) {
		color = color || '#fff';
		_context.font = font || "10px Arial";
		_context.fillStyle = color;
		_context.fillText(s, x, y);
	};

};