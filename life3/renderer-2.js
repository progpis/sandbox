window.life.Renderer = function(controller) {
	var renderer = this;

	var _canvas;
	var _world;
	var _fauna;
	var _r;
	var _q;

	renderer.init = function(canvas, world, fauna) {
		_canvas = canvas;
		_world = world;
		_fauna = fauna;
		_r = _world.getR();
		_q = _world.getQ();
	};

	renderer.renderFields = function() {
		var fields, i, j;
		fields = _world.getFields();
		for (i = 0; i < fields.length; i++) {
			for (j = 0; j < fields[i].length; j++) {
				renderer.renderField(fields[i][j]);
			}
		}
	};

	renderer.renderField = function(field) {
		var color;
		color = getBackgroundColor(field.getFood(), 0x33, 0xCC);
		_canvas.drawHex(field.getX(), field.getY(), _r, _q, '#060', color);
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
		_canvas.drawCircle(field.getX(), field.getY(), 5, '#fff', '#f66');
	};

	//

	function getBackgroundColor(value, col_min, col_max) {
		var color    = Math.floor((col_max - col_min) * value / 100 + col_min);
		return '#00'+ (color.toString(16)) +'00';
	}

};