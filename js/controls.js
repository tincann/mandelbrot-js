(function($, scope){
	var Controls = function(element){
		this.element = element;
		this.setupHandlers();
		this._events = {};
	};

	Controls.prototype.setupHandlers = function() {
		$(this.element).on('mousewheel', onZoom.bind(this));
		$(this.element).on('mousedown mouseup mousemove', onDrag.bind(this));
	};

	Controls.prototype.on = function(event, callback) {
		this._events[event] = callback;
	};

	Controls.prototype.trigger = function(event) {
		if(this._events[event]){
			this._events[event].apply(null, [].slice.call(arguments, 1));
		}
	};

	var onZoom = function(event){
		this.trigger('onZoom', 
			{ x: event.clientX, y: event.clientY }, 
			event.originalEvent.wheelDelta);
	};

	var isDragging = false;
	var onDrag = function(event){
		if(event.type == "mousemove" && isDragging){
			this.trigger('onDrag', { x: event.clientX, y: event.clientY });
		}else if(event.type == "mousedown"){
			console.log("starting drag");			
			isDragging = true;
		}else if(event.type == "mouseup"){
			console.log("stopping drag");
			isDragging = false;
		}
	};
	scope.Controls = Controls;
})(jQuery, window);