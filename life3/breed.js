window.life.Breed = function(controller) {
	var breed = this;

	var _creatures;

	breed.init = function(options) {
		var pop, i, creature;
		pop = options.pop || 2;
		dna_conf = options.dna || {};
		for (i = 0; i < pop; i++) {
			creature = new life.Creature(controller);
			creature.init(breed, dna_conf);
		}
	};
};