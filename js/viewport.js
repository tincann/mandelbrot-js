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
		this.xLeft = location.x - this.width  / 2;
		this.yLeft = location.y - this.height / 2;
		this.location = location;
	};

	Viewport.prototype.setScale = function(scale) {
		this.scale = scale;
	};

	scope.Viewport = Viewport;
})(window);