(function($, scope){
	var canvas = $('canvas').get(0);
	var drawer = new WebGLDrawer2D(canvas);
	var coordinateMapper = new CoordinateMapper();
	var mandelbrot = new Mandelbrot(drawer, coordinateMapper);
	scope.Mandelbrot = mandelbrot;

})(jQuery, window);

var start = +new Date();
var viewport = new Viewport({ width: 3.5, height: 3.5 * 0.68}, { x: 0, y: 0});
Mandelbrot.draw(viewport);
var duration = +new Date() - start;
console.log(duration);