(function(scope){
	var CoordinateMapper = function(){
		
	};

	CoordinateMapper.prototype.setVirtualViewport = function(viewport) {
		this.virtual = viewport;
	};

	CoordinateMapper.prototype.setPixelViewport = function(viewport) {
		this.pixel = viewport;
	};

	CoordinateMapper.prototype.toVirtualCoordinate = function(x, y) {
		return { x : x / this.pixel.width * this.virtual.width + this.virtual.x1,
				 y : y / this.pixel.height * this.virtual.height + this.virtual.y1 };
	};

	scope.CoordinateMapper = CoordinateMapper;
})(window);

(function(scope){
	var Viewport = function(size, location){
		this.width = size.width;
		this.height = size.height;

		if(location){
			this.x1 = location.x - size.width  / 2;
			this.y1 = location.y - size.height / 2;
			this.x2 = location.x + size.width  / 2;
			this.y2 = location.y + size.height / 2;
		}
	};

	scope.Viewport = Viewport;
})(window);