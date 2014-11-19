window.life.Creature = function(controller) {
	var creature = this;

	var _breed;
	var _field;
	var _dna;
	var _ai;

	creature.init = function(breed, field, dna_conf, ai_conf) {
		_breed = breed;
		_field = field;

		_dna = new life.Dna(controller);
		_dna.init(dna_conf);

		_ai = new life.Ai(controller);
		_ai.init(ai_conf);
	};

	creature.getField = function() {
		return _field;
	}

};