window.life.Creature = function(controller) {
	var creature = this;

	var _breed;
	var _dna;

	creature.init = function(breed, dna_conf) {
		_breed = breed;
		_dna = new life.Dna(controller);
		_dna.init(dna_conf);
	};
};