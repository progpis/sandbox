window.life.World = function(controller) {
	var world = this;

	var _fields;

	//

	world.init = function(n, canvas) {
		var i, j, field, canvas_width, canvas_height, r, q, x, y, p;

		canvas_width = canvas.getWidth();
		canvas_height = canvas.getHeight();

		q = (canvas_height-1) / (2*n+1);
		r = Math.sqrt(4/3 * q*q);
		p = Math.ceil(n * (r/q)) - 1;

		_fields = [];
		for (i = 0; i < p; i++) {
			_fields.push([]);
			for (j=0; j < n; j++) {

				field = new life.Field(controller);
				field.init(life.rand(0,10000));

				x = r+r*i*1.5;
				y = q+2*q*j + q * (i % 2);

				canvas.drawHex(x, y, r, q);
				//canvas.drawText(x, y, i+','+j, '#000');


				_fields[i][j] = field;
			}
		}
	};



};