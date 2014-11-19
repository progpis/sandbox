window.life.Breed = function(controller) {
	var breed = this;

	var _creatures;

	breed.init = function(root_field, options) {
		var pop, i, dna_conf, ai_conf, creature, field;
		_creatures = [];
		pop = options.pop || 2;
		dna_conf = options.dna || {};
		ai_conf = options.ai || {};
		for (i = 0; i < pop; i++) {
			field = getStartingField(root_field);
			creature = new life.Creature(controller);
			creature.init(breed, field, dna_conf, ai_conf);
			_creatures.push(creature);
		}
	};

	breed.getCreatures = function() {
		return _creatures;
	};

	//

	function getStartingField(field) {
		var links, r;
		links = field.getLinks();
		r = life.rand(-1, links.length - 1);
		return r === -1 ? field : links[r];
	}

};