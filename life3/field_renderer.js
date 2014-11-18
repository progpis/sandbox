window.life.FieldRenderer = function(controller) {
	var field_renderer = this;

	var _canvas;
	var _world;
	var _r;
	var _q;

	field_renderer.init = function(canvas, world) {
		_canvas = canvas;
		_world = world;
		_r = _canvas.getWidth() / (_world.getRadius() * 2 + 1) / 2;
		_q = Math.sqrt(_r * _r - (_r * _r / 4));
	};
	
	field_renderer.renderFields = function() {
		var center, x, y, walk, fields, level, j, walk_direction, walk_step;

		center = _canvas.getCenter();
		x = center.x;
		y = center.y;

		walk = getWalk();
		fields = _world.getFields();
		field_renderer.renderField(x, y, fields[0][0]);

		for (level = 1; level < fields.length; level++) {
			walk_direction = 0;
			walk_step = 0;
			for (j = 0; j < fields[level].length; j++) {
				x += walk[walk_direction].x;
				y += walk[walk_direction].y;
				field_renderer.renderField(x, y, fields[level][j]);
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
	
	field_renderer.renderField = function(x, y, field) {
		_canvas.drawHex(x, y, _r, _q, '#666', getBackgroundColor(field));
		_canvas.drawText(x - 15, y + 3, field.getId() + ', ' + field.getFood(), '#000', '10px Helvetica');
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

	function getBackgroundColor(field) {
		var col_min  = 0;
		var col_max  = 0x99;
		var food_max = 0x33;
		var food_cur = field.getFood();
		var color    = Math.floor((col_max-col_min) * food_cur / food_max + col_min);
		return '#00'+ (color.toString(16)) +'00';
	}

};