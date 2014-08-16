(function(scope){
	var Mandelbrot = function(canvasDrawer, coordinateMapper){
		this.canvasDrawer = canvasDrawer;
		this.coordinateMapper = coordinateMapper;
		this.init();
	};

	Mandelbrot.prototype.init = function() {
		this.viewport = new Viewport({ width: 2, height: 2}, { x: 0, y: 0});

		this.coordinateMapper.setVirtualViewport(this.viewport);
		this.coordinateMapper.setPixelViewport(this.canvasDrawer.viewport);
	};

	Mandelbrot.prototype.draw = function() {
		for(var y = 0, yLen = this.canvasDrawer.viewport.height; y < yLen; y++){
			for(var x = 0, xLen = this.canvasDrawer.viewport.width; x < xLen; x++){
				var vCoord = this.coordinateMapper.toVirtualCoordinate(x, y);
				var color = this.calculateColor(vCoord);
				this.canvasDrawer.draw(x, y, color);
			}
		}
	};
	
	Mandelbrot.prototype.calculateColor = function(location) {
		var i = 0,
			max = 1000,
			a = 0,
			b = 0,
			x = location.x,
			y = location.y;

		while( a*a + b*b < 4 && i < max){
			var c = a*a - b*b + x;
			b = 2*a*b + y;
			a = c;
			i++;
		}
		var color = i / max * 255;
		return [color, color, color];
	};

	scope.Mandelbrot = Mandelbrot;
})(window);