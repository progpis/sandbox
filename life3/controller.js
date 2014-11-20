window.life.Controller = function() {
	var controller = this;

	var _world_radius;

	var _ticker;
	var _canvas;
	var _world;
	var _renderer;

	var _fauna;

	//

	controller.init = function(options) {
		options = options || {};
		_world_radius = options.world_radius || 10;

		_ticker = new life.Ticker(controller);
		_canvas = new life.Canvas(controller);
		_world = new life.World(controller);
//		_fauna = new life.Fauna(controller);
//
//		_renderer = new life.Renderer(controller);

//		_ticker.init(1000);
		_canvas.init('canvas');
		_world.init(_world_radius, _canvas);
//		_fauna.init(_world, options.breeds || []);

//		_renderer.init(_canvas, _world, _fauna);

//		_ticker.start();

		controller.event({ obj: controller, type: 'tick', tick: 0});
	};

	controller.tick = function(tick) {
//		_canvas.clear();
		//_canvas.drawGuidelines();
//		_renderer.renderFields();
//		_renderer.renderCreatures();
	};

	controller.event = function(event) {
		console.log(event.type);
		switch(event.type) {
			case 'tick' :
				controller.tick(event.tick);
				break;
		}
	};

};