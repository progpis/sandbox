window.life.Renderer = function(controller) {
	var renderer = this;

	var _canvas;
	var _world;
	var _r;
	var _q;

	renderer.init = function(canvas, world) {
		_canvas = canvas;
		_world = world;
		_r = _canvas.getHeight() / (_world.getRadius() * 2 + 1) / 1.75;

		_q = Math.sqrt(_r * _r - (_r * _r / 4));
	};
	
	renderer.renderFields = function() {
		var center, x, y, walk, fields, level, j, walk_direction, walk_step;

		center = _canvas.getCenter();
		x = center.x;
		y = center.y;

		walk = getWalk();
		fields = _world.getFields();
		renderer.renderField(x, y, fields[0][0]);

		for (level = 1; level < fields.length; level++) {
			walk_direction = 0;
			walk_step = 0;
			for (j = 0; j < fields[level].length; j++) {
				x += walk[walk_direction].x;
				y += walk[walk_direction].y;
				renderer.renderField(x, y, fields[level][j]);
				walk_step++;
				if (walk_step == level || j == 0) {
					walk_step = 0;
					walk_direction++;
				}
			}
			x += walk[6].x;
			y += walk[6].y;
		}
	};
	
	renderer.renderField = function(x, y, field) {
		var color;
		color = getBackgroundColor(field.getFood(), 0x33, 0xCC);
		_canvas.drawHex(x, y, _r, _q, '#060', color);
//		_canvas.drawText(x - 15, y + 3, field.getId() + ', ' + field.getFood(), '#000', '10px Helvetica');
	};
	
	//

	function getWalk() {
		return [
			{ x:                   0, y: -2*_q }, // up
			{ x:  1.5*_r, y:    _q }, // right-down
			{ x:                   0, y:  2*_q }, // down
			{ x: -1.5*_r, y:    _q }, // left-down
			{ x: -1.5*_r, y:   -_q }, // left-up
			{ x:                   0, y: -2*_q }, // up
			{ x:  1.5*_r, y:   -_q }  // right-up
		];
	}

	function getBackgroundColor(value, col_min, col_max) {
		var color    = Math.floor((col_max - col_min) * value / 100 + col_min);
		return '#00'+ (color.toString(16)) +'00';
	}

};