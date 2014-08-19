(function($, scope){
	var Mandelbrot = function(drawer, coordinateMapper){
		this.drawer = drawer;
		this.coordinateMapper = coordinateMapper;
		this.init();
	};

	Mandelbrot.prototype.init = function() {
		this.viewport = new Viewport({ width: 3.5, height: 3.5 * 0.68}, { x: 0, y: 0});
	};

	Mandelbrot.prototype.setLocation = function(location) {
		this.viewport.setLocation(location);
		this.draw();
	};

	Mandelbrot.prototype.setViewport = function(viewport) {
		this.viewport = viewport;
	};

	var defaultOptions = {
		maxIterations: 500,
		limit: 4
	};

	Mandelbrot.prototype.draw = function() {
		this.drawer.draw(this.viewport);
	};

	Mandelbrot.prototype.calculateColor = function(location, limit, maxIterations) {
		var i = 0,
			a = 0,
			b = 0,
			x = location.x,
			y = location.y;

		while( a*a + b*b < limit && i++ < maxIterations){
			var c = a*a - b*b + x;
			b = 2*a*b + y;
			a = c;
		}
		var color = i / maxIterations * 255;
		return [color, color, color];
	};

	scope.Mandelbrot = Mandelbrot;
})(jQuery, window);