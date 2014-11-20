window.life.Field = function(controller) {
	var field = this;

	var _x;
	var _y;
	var _links;
	var _directions;
	var _food;

	//

	field.init = function(x, y) {
		_x = x;
		_y = y;
		_links = [];
		_directions = {};
		_food = getInitialFood();
	};

	field.tick = function(tick) {

	};

	field.getX = function() {
		return _x;
	};

	field.getY = function() {
		return _y;
	};

	field.addLink = function(link, direction) {
		_links.push(link);
		_directions[direction] = link;
	};

	field.getLinks = function() {
		return _links;
	};

	field.getFood = function() {
		return _food;
	};

	field.setFood = function(amount) {
		_food = amount;
	};

	//

	function getInitialFood() {
		return life.rand(0, 100)
	}

};