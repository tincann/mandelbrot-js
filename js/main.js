(function($, scope){
	var canvas = $('canvas');
	canvas.attr('width', canvas.width());
	canvas.attr('height', canvas.height());

	var drawer = new WebGLDrawer2D(canvas.get(0));

	var controls = new Controls(canvas);
	
	var mandelbrot = new Mandelbrot(drawer, controls);
	scope.Mandelbrot = mandelbrot;

})(jQuery, window);

var start = +new Date();
Mandelbrot.draw();
var duration = +new Date() - start;
console.log(duration);