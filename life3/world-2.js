window.life.World = function(controller) {
	var world = this;

	var _n;
	var _canvas;
	var _fields;

	//

	world.init = function(n, canvas) {
		_n = n;
		_canvas = canvas;
		createFields();
	};

	world.fieldExists = function(i, j) {
		return undefined !== _fields[i] && undefined !== _fields[i][j];
	};

	//

	function createFields() {
		var i, j, field, canvas_width, canvas_height, r, q, x, y, p;

		canvas_width = _canvas.getWidth();
		canvas_height = _canvas.getHeight();

		q = (canvas_height-1) / (2*_n+1);
		r = Math.sqrt(4/3 * q*q);
		p = Math.ceil(_n * (r/q)) - 1;

		_fields = [];

		for (i = 0; i < p; i++) {
			_fields.push([]);
			for (j=0; j < _n; j++) {
				field = new life.Field(controller);
				field.init(life.rand(0,10000));
				x = r+r*i*1.5;
				y = q+2*q*j + q * (i % 2);
				_canvas.drawHex(x, y, r, q);
				_canvas.drawText(x, y, i+','+j, '#000');
				_fields[i][j] = field;
			}
		}

		for (i = 0; i < _fields.length; i++) {
			for (j = 0; j < _fields[i].length; j++) {
				if (world.fieldExists(i+1, j))   linkFields(_fields[i][j], _fields[i+1][j]);
				if (world.fieldExists(i+1, j+1)) linkFields(_fields[i][j], _fields[i+1][j+1]);
				if (world.fieldExists(i,   j+1)) linkFields(_fields[i][j], _fields[i][j+1]);
			}
		}

	}

	function linkFields(field1, field2) {
		if (!field1 || !field2) return;
		field1.addLink(field2);
		field2.addLink(field1);
	}

};