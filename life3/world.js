window.life.World = function(controller) {
	var world = this;

	var _radius;
	var _fields;
	var _field_id;

	//

	world.init = function(radius) {
		_radius = radius || 1;
		_field_id = 0;
		createFields();
		blurFood();
	};

	world.getRadius = function() {
		return _radius;
	};

	world.getFields = function(level) {
		return undefined === level ? _fields : _fields[level];
	};

	//

	function createFields() {
		var i;
		_fields  = [];
		for (i = 0; i <= _radius; i++) {
			_fields.push([]);
			createFieldsLevel(i);
		}
	}

	function createFieldsLevel(level) {
		switch(level) {
			case 0  : createRoot(); break;
			case 1  : createFirstLevel(); break;
			default : createNextLevel(level); break;
		}
	}

	function createRoot() {
		var field = new life.Field(controller);
		field.init(0);
		_fields[0].push(field);
	}

	function createFirstLevel() {
		var i, j, last_field, fields, field;
		last_field = null;
		fields = [];
		for (j = 0; j < 6; j++) {
			field = new life.Field(controller);
			field.init(getNextFieldId());
			linkFields(field, last_field);
			linkFields(field, _fields[0][0]);
			fields.push(field);
			_fields[1].push(field);
			last_field = field;
		}
		linkFields(fields[0], fields[5]);
	}

	function createNextLevel(level) {
		var parents, i, j, parent, last_field, fields, field, total_ones, ones, c, mode;

		parents = world.getFields(level - 1);
		last_field = null;
		fields = [];

		total_ones = level - 2;
		ones = 0;
		for (i = 0; i < parents.length; i++) {

			parent = parents[i];
			linkFields(parent, last_field);

			if (ones < 1) {
				c = 2;
				ones = total_ones;
			} else {
				c = 1;
				ones--;
			}

			for (j = 0; j < c; j++) {
				field = new life.Field(controller);
				field.init(getNextFieldId());
				linkFields(field, last_field);
				linkFields(field, parent);
				fields.push(field);
				_fields[level].push(field);
				last_field = field;
			}
		}

		linkFields(fields[0], last_field);
		linkFields(parents[0], last_field);
	}

	function linkFields(field1, field2) {
		if (!field1 || !field2) return;
		field1.addLink(field2);
		field2.addLink(field1);
	}

	function getNextFieldId() {
		return ++_field_id;
	}

	function blurFood(n) {
		n = n || Math.ceil(_radius/3);

		for (m = 0; m < n; m++) {
			var food, i, j, k, m, field, links, total_food, avg_food;
			food = [];
			for (i = 0; i < _fields.length; i++) {
				food[i] = [];
				for (j = 0; j < _fields[i].length; j++) {
					field = _fields[i][j];
					links = field.getLinks();
					total_food = 0;
					for (k = 0; k < links.length; k++) {
						total_food += links[k].getFood();
					}
					avg_food = Math.floor((total_food+field.getFood()) / (links.length + 1));
					food[i].push(avg_food);
				}
			}
			for (i = 0; i < _fields.length; i++) {
				for (j = 0; j < _fields[i].length; j++) {
					_fields[i][j].setFood(food[i][j]);
				}
			}
		}
	}

};