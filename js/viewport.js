(function(scope){
	var Viewport = function(size, location){
		this.setSize(size);		
		this.setLocation(location);		
	};

	Viewport.prototype.setLocation = function(location) {
		this.xLeft = location.x - this.width  / 2; //bottomleft point x
		this.yLeft = location.y - this.height / 2; //bottomleft point y
		this.location = location;
	};

	Viewport.prototype.setSize = function(size, maintainAspectratio) {
		this.width = size.width;

		if(maintainAspectratio){
			this.height = this.width * this.ratio;
		}else{
			this.height = size.height;
			this.ratio = size.height / size.width;
		}

		//recalculate xLeft/yLeft
		if(this.location){
			this.setLocation(this.location);
		}
	};

	scope.Viewport = Viewport;
})(window);