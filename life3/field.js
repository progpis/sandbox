window.life.Field = function(controller) {
	var field = this;

	var _id;
	var _links;
	var _food;

	//

	field.init = function(id) {
		_id = id;
		_links = [];
		_food = getInitialFood();
	};

	field.tick = function(tick) {

	};

	field.getId = function() {
		return _id;
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
	};

	//

	function getInitialFood() {
		return life.rand(0, 100)
	}

};