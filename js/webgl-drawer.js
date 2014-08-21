(function($, scope){
	var defaultOptions = {
		vShaderId: 'vShader',
		fShaderId: 'fShader'
	};
	var WebGLDrawer2D = function(canvas, options){
		options = $.extend(defaultOptions, options);
		this.canvas = canvas;
		this.init(canvas);
		this.compileShaders(options.vShaderId, options.fShaderId);

		//fps counter
		setInterval(function(){
			console.log(this.frameCount);
			this.frameCount = 0;
		}.bind(this), 1000);

		this.fps = 50;
		this.frameTime = 1 / this.fps * 1000;
		this.frameCount = 0;
	};

	WebGLDrawer2D.prototype.init = function(canvas) {
		this.gl = null;
		try{
			this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		}	
		catch(e){}

		if(!this.gl){
			alert('Your browser doesn\'t support WebGL');
			return;
		}
		this.gl.viewport(0,0, canvas.width, canvas.height);

		this.buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
	    this.gl.bufferData(
		    this.gl.ARRAY_BUFFER, 
		    new Float32Array([
		      -1.0, -1.0, 
		       1.0, -1.0, 
		      -1.0,  1.0, 
		      -1.0,  1.0, 
		       1.0, -1.0, 
		       1.0,  1.0]), 
		    this.gl.STATIC_DRAW
	    );		
	};

	WebGLDrawer2D.prototype.draw = function(viewport){
		if(false && withinFrameLimit(this.lastDrawTime, this.frameTime)){
			return;
		}

		this.gl.clearColor(1.0, 0.0, 0.0, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		var loc = this.gl.getAttribLocation(this.program, "a_position");
		this.gl.enableVertexAttribArray(loc);
		this.gl.vertexAttribPointer(loc, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.uniform2f(
			this.gl.getUniformLocation(this.program, "P_DIMENSION"), 
			this.canvas.width, this.canvas.height);
		
		this.gl.uniform4f(
			this.gl.getUniformLocation(this.program, "V_DIMENSION"),
				viewport.width, //width
				viewport.xLeft, //x offset
				viewport.height,
				viewport.yLeft
			);


		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
		
		this.lastDrawTime = +new Date();
		this.frameCount++;
	};

	var withinFrameLimit = function(lastDrawTime, frameTime){
		return +new Date() - lastDrawTime < frameTime;
	};

	WebGLDrawer2D.prototype.compileShaders = function(vShaderId, fShaderId) {
		var vShader = this.gl.createShader(this.gl.VERTEX_SHADER);
		var fShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

		this.gl.shaderSource(vShader, this.getShaderSource(vShaderId));
		this.gl.compileShader(vShader);		
		this.gl.shaderSource(fShader, this.getShaderSource(fShaderId));
		this.gl.compileShader(fShader);

		this.program = this.gl.createProgram();
		this.gl.attachShader(this.program, vShader);
		this.gl.attachShader(this.program, fShader);
		this.gl.linkProgram(this.program);
		this.gl.useProgram(this.program);
	};

	WebGLDrawer2D.prototype.getShaderSource = function(id){
		return document.getElementById(id).text;
	}

	scope.WebGLDrawer2D = WebGLDrawer2D;
})(jQuery, window);