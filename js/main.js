(function($, scope){
	var canvas = $('canvas').get(0);
	var drawer = new CanvasDrawer(canvas);
	var coordinateMapper = new CoordinateMapper();
	var mandelbrot = new Mandelbrot(drawer, coordinateMapper);
	scope.Mandelbrot = mandelbrot;

})(jQuery, window);