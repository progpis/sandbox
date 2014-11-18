window.life.Fauna = function(controller) {
	var fauna = this;

	var _breeds;

	fauna.init = function(breeds) {
		var i, breed;
		_breeds = [];
		for (i = 0; i < breeds.length; i++) {
			breed = new life.Breed(controller);
			breed.init(breeds[i]);
			_breeds.push(breed);
		}
	};

	fauna.getBreeds = function() {
		return _breeds;
	}

};