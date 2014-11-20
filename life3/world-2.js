window.life.World = function(controller) {
	var world = this;

	var _n;
	var _m;
	var _r;
	var _q;
	var _canvas;
	var _fields;

	//

	world.init = function(n, canvas) {
		_n = n;
		_canvas = canvas;
		createFields();
		connectFields();
		blurFood();
	};

	world.getFields = function() {
		return _fields;
	};

	world.fieldExists = function(i, j) {
		return undefined !== _fields[i] && undefined !== _fields[i][j];
	};

	world.getParams = function() {
		return {
			n: _n,
			m: _m,
			r: _r,
			q: _q
		};
	};

	world.getN = function() {
		return _n;
	};

	world.getM = function() {
		return _m;
	}

	world.getR = function() {
		return _r;
	};

	world.getQ = function() {
		return _q;
	};

	//

	function createFields() {
		var i, j, field, canvas_width, canvas_height, r, q, x, y, walk, w;

		canvas_width = _canvas.getWidth();
		canvas_height = _canvas.getHeight();

		_q = (canvas_height-1) / (2*_n+1);
		_r = Math.sqrt(4/3 * _q*_q);
		_m = Math.floor(canvas_width / (_r * 1.5)) - 1;
		console.log(_m);

		_fields = [];

		for (i = 0; i < _m; i++) {
			_fields.push([]);
			for (j=0; j < _n; j++) {
				field = new life.Field(controller);
				x = _r + _r * i * 1.5;
				y = _q + 2 * _q * j + _q * (i % 2);
				field.init(x, y);
				_fields[i][j] = field;
			}
		}

	}

	function connectFields() {
		var walk, i, j, k, x, y, d;
		walk = getLinkWalk();
		for (i = 0; i < _fields.length; i++) {
			for (j = 0; j < _fields[i].length; j++) {
				w = i % 2 === 0 ? walk.even : walk.odd;
				for (k = 0; k < w.length; k++) {
					x = w[k][0] + i;
					y = w[k][1] + j;
					d = w[k][2];
					if (world.fieldExists(x, y)) linkFields(_fields[i][j], _fields[x][y], d);
				}
			}
		}

//		for (i = 0; i < _fields.length; i++) {
//			for (j = 0; j < _fields[i].length; j++) {
//				links = _fields[i][j].getLinks();
//				for (k = 0; k < links.length; k++) {
//					_canvas.drawLine(
//						_fields[i][j].getX() + life.rand(-5, 5),
//						_fields[i][j].getY() + life.rand(-5, 5),
//						links[k].getX() + life.rand(-5, 5),
//						links[k].getY() + life.rand(-5, 5)
//					);
//				}
//			}
//		}
	}

	function getLinkWalk() {
		return {
			odd  : [ [ 1, 0, 2], [ 1, 1, 3], [ 0, 1, -1] ],
			even : [ [ 1,-1, 2], [ 1, 0, 3], [ 0, 1, -1] ]
		};
	}

	function linkFields(field1, field2, direction) {
		if (!field1 || !field2) return;
		field1.addLink(field2,  direction);
		field2.addLink(field1, -direction);
	}

	function blurFood(n) {
		n = n || Math.ceil(_n/3);

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