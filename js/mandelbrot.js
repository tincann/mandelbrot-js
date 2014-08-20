(function($, scope){

	var config = {
		zoomSpeed: 1.1
	};

	var Mandelbrot = function(drawer, controls){
		this.drawer = drawer;
		this.controls = controls;
		this.init();
		this.initControls();
	};

	Mandelbrot.prototype.init = function() {
		var ratio = this.drawer.canvas.height / this.drawer.canvas.width;
		this.viewport = new Viewport({ width: 3.5, height: 3.5 * ratio }, { x: -0.5, y: 0});
	};

	Mandelbrot.prototype.initControls = function() {
		this.controls.on('onZoom', this.zoom.bind(this));
		this.controls.on('onDrag', this.drag.bind(this));
	};

	Mandelbrot.prototype.zoom = function(location, direction) {
		var oldWidth = this.viewport.width;

		//zoom in
		if(direction > 0){
			this.setViewportSize({ width: oldWidth / config.zoomSpeed });
		}
		//zoom out
		else{ 
			this.setViewportSize({ width: oldWidth * config.zoomSpeed });
		}
		this.draw();
	};

	Mandelbrot.prototype.drag = function(location){
		this.setViewportLocation(this.toVirtualCoordinates(location));
		this.draw();
	};

	Mandelbrot.prototype.setViewportLocation = function(location) {
		this.viewport.setLocation(location);
	};

	Mandelbrot.prototype.setViewportSize = function(size) {
		this.viewport.setSize(size, true);
	};

	Mandelbrot.prototype.draw = function() {
		console.log(this.viewport.xLeft, this.viewport.yLeft);
		this.drawer.draw(this.viewport);
	};

	Mandelbrot.prototype.toVirtualCoordinates = function(location) {
		return { x : location.x / this.drawer.canvas.width  * this.viewport.width  + this.viewport.xLeft,
				 y : location.y / this.drawer.canvas.height * this.viewport.height + this.viewport.yLeft };
	};

	scope.Mandelbrot = Mandelbrot;
})(jQuery, window);