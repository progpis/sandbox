window.life.Ticker = function(controller) {
	var ticker = this;

	var _interval;
	var _tick;
	var _timer;

	//

	ticker.init = function(interval) {
		_tick = 0;
		_interval = interval || 1000;
	};

	ticker.start = function() {
		_timer = setInterval(function() {
			_tick++;
			controller.event({ obj: ticker, type: 'tick', tick: _tick });
		}, _interval);
	};

	ticker.stop = function() {
		clearInterval(_timer);
		_timer = undefined;
	};

	ticker.setInterval = function(interval) {
		_interval = interval;
	};

};