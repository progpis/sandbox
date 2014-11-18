window.life.Field = function(controller) {
	var field = this;

	var _id;
	var _level;
	var _links;
	var _food;

	//

	field.init = function(id, level) {
		_id = id;
		_links = [];
		_level = level || 0;
		_food = life.rand(0, 100);
	};

	field.tick = function(tick) {

	};

	field.getId = function() {
		return _id;
	};

	field.getLevel = function() {
		return _level;
	};

	field.addLink = function(link) {
		_links.push(link);
	};

	field.getLinks = function() {
		return _links;
	};

	field.getFood = function() {
		return _food;
	};

	field.setFood = function(amount) {
		_food = amount;
	}

};