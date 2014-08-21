(function($, scope){

	var config = {
		zoomSpeed: 1.1,
		moveSpeed: 50
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
		this.controls.on('zoom', this.zoom.bind(this));
		this.controls.on('drag', this.drag.bind(this));
		this.controls.on('move', this.move.bind(this));
		this.controls.on('click', this.click.bind(this));
	};

	Mandelbrot.prototype.zoom = function(location, direction) {
		var oldWidth = this.viewport.width;
		
		//center to mouse location
		this.setViewportLocation(this.toVirtualCoordinates(location));

		//zoom in
		if(direction > 0){
			this.setViewportSize({ width: oldWidth / config.zoomSpeed });
		}
		//zoom out
		else{ 
			this.setViewportSize({ width: oldWidth * config.zoomSpeed });
		}

		//translate back to old position (creates panzoom effect)
		this.setViewportLocation(
			this.toVirtualCoordinates(
				{
					x: this.drawer.canvas.width - location.x, 
					y: this.drawer.canvas.height - location.y
				}
			)
		);
		this.draw();		
	};

	Mandelbrot.prototype.click = function(loc) {
		console.log("screen pos:", loc);
		var vloc = this.toVirtualCoordinates(loc);
		console.log("virt   pos:", vloc);
	};

	Mandelbrot.prototype.drag = function(startpos, location){
		
		/*var invertedX = -this.drawer.canvas.width / 2 + location.x;
		var invertedY = -this.drawer.canvas.height / 2 + location.y;
		var a = { x: invertedX - startpos.x, y: invertedY - startpos.y };
		
		
		this.setViewportLocation(this.toVirtualCoordinates(
			));
		this.draw();*/
	};

	Mandelbrot.prototype.move = function(direction) {
		x = this.viewport.location.x + direction.x * config.moveSpeed / this.drawer.canvas.width  * this.viewport.width;
		y = this.viewport.location.y + direction.y * config.moveSpeed / this.drawer.canvas.height * this.viewport.height;

		this.setViewportLocation({ x: x, y: y });
		this.draw();
	};

	Mandelbrot.prototype.setViewportLocation = function(location) {
		this.viewport.setLocation(location);
	};

	Mandelbrot.prototype.setViewportSize = function(size) {
		this.viewport.setSize(size, true);
	};

	Mandelbrot.prototype.draw = function() {
		this.drawer.draw(this.viewport);
	};

	Mandelbrot.prototype.toVirtualCoordinates = function(location) {
		return { x : location.x / this.drawer.canvas.width  * this.viewport.width  + this.viewport.xLeft,
				 y : (1 - location.y / this.drawer.canvas.height) * this.viewport.height + this.viewport.yLeft };
	};

	scope.Mandelbrot = Mandelbrot;
})(jQuery, window);