(function($, scope){
	var Controls = function(element){
		this.element = element;
		this.setupHandlers();
		this._events = {};
	};

	Controls.prototype.setupHandlers = function() {
		$(this.element).on('mousewheel', onZoom.bind(this));
		$(this.element).on('mousedown mouseup mousemove', onDrag.bind(this));
		//$(this.element).on('mousedown', onClick.bind(this));
		$(document).on('keyup', onMove.bind(this));
		$(this.element).on('click', onClick.bind(this));
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
		this.trigger('zoom', 
			{ x: event.clientX, y: event.clientY }, 
			event.originalEvent.wheelDelta);
	};

	var onClick = function(event){
		this.trigger('click', { x: event.clientX, y: event.clientY });
	};

	var onMove = function(event){
		var x = 0,
			y = 0;
		if(event.keyCode == 37){ //left
			x = -1;
		}else if(event.keyCode == 39){ //right
			x = 1;
		}else if(event.keyCode == 38){ //up
			y = 1;
		}else if(event.keyCode == 40){
			y = -1;
		}else{
			return;
		}

		this.trigger('move', { x: x, y: y});
	};

	var isDragging = false;
	var startPos = { x: 0, y: 0 };
	var onDrag = function(event){
		if(isDragging && event.type == "mousemove"){
			this.trigger('drag', startPos, { x: event.clientX, y: event.clientY });
		}else if(event.type == "mousedown"){
			//console.log("starting drag");			
			isDragging = true;
			startPos = { x: event.clientX, y: event.clientY };
		}else if(event.type == "mouseup"){
			//console.log("stopping drag");
			isDragging = false;
			startPos = { x: 0, y: 0 };
		}
	};
	scope.Controls = Controls;
})(jQuery, window);