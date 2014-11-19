window.life.Fauna = function(controller) {
	var fauna = this;

	var _world;
	var _breeds;

	fauna.init = function(world, breeds) {
		var i, fields, level, field, links, breed;
		_world = world;

		fields = world.getFields();

		_breeds = [];
		for (i = 0; i < breeds.length; i++) {
			field = getStartingField(fields);
			breed = new life.Breed(controller);
			breed.init(field, breeds[i]);
			_breeds.push(breed);
		}
	};

	fauna.getBreeds = function() {
		return _breeds;
	};

	//

	function getStartingField(fields) {
		var level, i;
		level = life.rand(0, fields.length - 1);
		i = life.rand(0, fields[level].length - 1);
		return fields[level][i];
	}

};