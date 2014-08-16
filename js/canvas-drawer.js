(function($, scope){

	var CanvasDrawer = function(canvas){
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.viewport = new Viewport(
			{ width: this.canvas.width, height: this.canvas.height });
	};

	CanvasDrawer.prototype.draw = function(x, y, color) {
		var imageData = this.context.createImageData(1, 1);
		color = color || [];
		imageData.data[0] = color[0] || 0;
		imageData.data[1] = color[1] || 0;
		imageData.data[2] = color[2] || 0;
		imageData.data[3] = color[3] || 255;
		this.context.putImageData(imageData, x, y);
	};

	scope.CanvasDrawer = CanvasDrawer;
})(jQuery, window);