window.life.Renderer = function(controller) {
	var renderer = this;

	var _canvas;
	var _world;
	var _fauna;
	var _r;
	var _q;
	var _fields;

	renderer.init = function(canvas, world, fauna) {
		_canvas = canvas;
		_world = world;
		_fauna = fauna;
		_r = _canvas.getHeight() / (_world.getRadius() * 2 + 1) / 1.75;
		_q = Math.sqrt(_r * _r - (_r * _r / 4));
		createFieldPositions();
	};
	
	renderer.renderFields = function() {
		var fields, i, j, id;
		fields = _world.getFields();
		for (i = 0; i < fields.length; i++) {
			for (j = 0; j < fields[i].length; j++) {
				id = fields[i][j].getId();
				renderer.renderField(_fields[id].x, _fields[id].y, fields[i][j]);
			}
		}

//		center = _canvas.getCenter();
//		x = center.x;
//		y = center.y;
//
//		walk = getWalk();
//		fields = _world.getFields();
//		renderer.renderField(x, y, fields[0][0]);
//
//		for (level = 1; level < fields.length; level++) {
//			walk_direction = 0;
//			walk_step = 0;
//			for (j = 0; j < fields[level].length; j++) {
//				x += walk[walk_direction].x;
//				y += walk[walk_direction].y;
//				renderer.renderField(x, y, fields[level][j]);
//				walk_step++;
//				if (walk_step == level || j == 0) {
//					walk_step = 0;
//					walk_direction++;
//				}
//			}
//			x += walk[6].x;
//			y += walk[6].y;
//		}
	};

	renderer.renderField = function(x, y, field) {
		var color;
		color = getBackgroundColor(field.getFood(), 0x33, 0xCC);
		_canvas.drawHex(x, y, _r, _q, '#060', color);
//		_canvas.drawText(x - 15, y + 3, field.getId() + ', ' + field.getFood(), '#000', '10px Helvetica');
	};

	renderer.renderCreatures = function() {
		var breeds, i, creatures, j;
		breeds = _fauna.getBreeds();
		for (i = 0; i < breeds.length; i++) {
			creatures = breeds[i].getCreatures();
			for (j = 0; j < creatures.length; j++) {
				renderer.renderCreature(creatures[j]);
			}
		}
	};

	renderer.renderCreature = function(creature) {
		var field, id, x, y;
		field = creature.getField();
		id = field.getId();
		x = _fields[id].x;
		y = _fields[id].y;
		_canvas.drawCircle(x, y, 5, '#fff', '#f66');
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

	function createFieldPositions() {
		var center, x, y, walk, fields, level, j, walk_direction, walk_step, id;
		_fields = [];

		center = _canvas.getCenter();
		x = center.x;
		y = center.y;

		walk = getWalk();
		fields = _world.getFields();

		_fields[0] = { x: x, y: y };

		for (level = 1; level < fields.length; level++) {
			walk_direction = 0;
			walk_step = 0;
			for (j = 0; j < fields[level].length; j++) {
				id = fields[level][j].getId();
				x += walk[walk_direction].x;
				y += walk[walk_direction].y;
				_fields[id] = { x: x, y: y };
				walk_step++;
				if (walk_step == level || j == 0) {
					walk_step = 0;
					walk_direction++;
				}
			}
			x += walk[6].x;
			y += walk[6].y;
		}
	}

	function getBackgroundColor(value, col_min, col_max) {
		var color    = Math.floor((col_max - col_min) * value / 100 + col_min);
		return '#00'+ (color.toString(16)) +'00';
	}

};