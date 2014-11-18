window.life.Controller = function() {
	var controller = this;

	var _ticker;
	var _canvas;
	var _world;
	var _field_renderer;

	//

	controller.init = function() {

		_ticker = new life.Ticker(controller);
		_canvas = new life.Canvas(controller);
		_world = new life.World(controller);
		_field_renderer = new life.FieldRenderer(controller);

		_ticker.init(1000);
		_canvas.init('canvas');
		_world.init(4);
		_field_renderer.init(_canvas, _world);

		controller.event({ obj: controller, type: 'tick', tick: 0});
	};

	controller.tick = function(tick) {
		_canvas.drawGuidelines();
		_field_renderer.renderFields();
	};

	controller.event = function(event) {
		switch(event.type) {
			case 'tick' :
				controller.tick(event.tick);
				break;
		}
	};

};