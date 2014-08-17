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
		return { x : x / this.pixel.width  * this.virtual.width  + this.virtual.x1,
				 y : y / this.pixel.height * this.virtual.height + this.virtual.y1 };
	};

	scope.CoordinateMapper = CoordinateMapper;
})(window);

(function(scope){
	var Viewport = function(size, location){
		this.width = size.width;
		this.height = size.height;
		this.ratio = size.height / size.width;

		if(location){
			this.setLocation(location);
		}
	};

	Viewport.prototype.getScaledSize = function(){
		return { width:  this.width  * this.scale, 
			     height: this.height * this.scale };
	};

	Viewport.prototype.setLocation = function(location) {
		this.x1 = location.x - this.width  / 2;
		this.y1 = location.y - this.height / 2;
		this.x2 = location.x + this.width  / 2;
		this.y2 = location.y + this.height / 2;
		this.location = location;
	};

	Viewport.prototype.setScale = function(scale) {
		this.scale = scale;
	};

	scope.Viewport = Viewport;
})(window);