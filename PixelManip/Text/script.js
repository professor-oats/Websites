window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d', {
	willReadFrequently: true
});
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
	constructor(effect, x, y, color) {
	  this.effect = effect;
	  this.x = Math.random() * this.effect.canvasWidth;  /* Position x from where pixels will start moving */
	  this.y = 0;  /* Position y from where pixels will start moving */
	  this.color = color;
	  this.originX = x;
	  this.originY = y;
	  this.size = this.effect.gap;
	  this.dx = 0;  /* Distance x from mousepointer and pixel */
	  this.dy = 0;  /* Distance y from mousepointer and pixel */
      this.vx = 0;
	  this.vy = 0;
	  this.force = 0;
	  this.angle = 0;
	  this.distance = 0;  /* 'Real' distance from mouse to pixel */
	  this.friction = Math.random() * 0.6 + 0.15;
	  this.ease = Math.random() * 0.1 + 0.005;
	}
	
	draw() {
	  this.effect.context.fillStyle = this.color;
	  this.effect.context.fillRect(this.x, this.y, this.size, this.size);
	}

    update() {
	  this.dx = this.effect.mouse.x - this.x;
	  this.dy = this.effect.mouse.y - this.y;
	  this.distance = this.dx * this.dx + this.dy * this.dy;
	  this.force = -this.effect.mouse.radius / this.distance;

	  if(this.distance < this.effect.mouse.radius) {
		this.angle = Math.atan2(this.dy, this.dx);
		this.vx += this.force * Math.cos(this.angle);
	    this.vy += this.force * Math.sin(this.angle);
	  }

	  this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
	  this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
	}
  }

  class Effect {
	constructor(context, canvasWidth, canvasHeight) {
	  this.context = context;
	  this.canvasWidth = canvasWidth;
	  this.canvasHeight = canvasHeight;
	  this.textX = this.canvasWidth/2;
	  this.textY = this.canvasHeight/2;
	  this.fontSize = 120;
	  this.verticalOffset = 0;	 /* For changing y-position of text */
	  this.lineHeight = this.fontSize * 0.9;
	  this.maxTextWidth = this.canvasWidth * 0.8;
      this.textInput = document.getElementById('textInput');
	  this.textInput.addEventListener('keyup', (e) => {	 /* Using arrow function to inherit this object */
		
		if(e.key !==' ') {
		  this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		  this.wrapText(e.target.value);

		}
	  });
	  /* Particle Effect */
	  this.particles = [];
	  this.gap = 3;
	  this.mouse = {
		radius: 20000,  /* This radius has to be big so we can opt out of using square root later */
		x: 0,
		y: 0
	  }

	  window.addEventListener('mousemove', (e) => {
		this.mouse.x = e.x;
		this.mouse.y = e.y;
	  });

	}
	wrapText(text) {
	  const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
	  gradient.addColorStop(0.3, 'red');
	  gradient.addColorStop(0.5, 'orange');
	  gradient.addColorStop(0.7, 'yellow');

	  this.context.fillStyle = gradient;
	  this.context.textAlign = "center";
	  this.context.textBaseline = "middle"
	  this.context.lineWidth = 3;
	  this.context.strokeStyle = "white";
	  this.context.letterspacing = "5px";
	  this.context.font = this.fontSize + "px Bangers";


	  /* this.context.fillText(text, this.textX, this.textY);
	  this.context.strokeText(text, this.textX, this.textY); */


	  /* Break multiline text */
	  let linesArray = [];
	  let words = text.split(' ');
	  let lineCounter = 0;
	  let line = '';
	  
	  for (let i = 0; i < words.length; i++) {
		let testLine = line + words[i] + ' ';
	    
		if(this.context.measureText(testLine).width > this.maxTextWidth) {
		  line = words[i] + ' ';
		  lineCounter++;
		}

		else {
		  line = testLine;
		}

		linesArray[lineCounter] = line;

	  }

	  let textHeight = this.lineHeight * lineCounter;
	  this.textY = this.canvasHeight/2 - textHeight/2 + this.verticalOffset;
	  
	  linesArray.forEach((el, index) => {
	    this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));
		this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));

	  });

	  this.convertToParticles();

	}

	convertToParticles() {
	  this.particles = [];
	  const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;

	  //this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);  /* Clearing old context (typed text) in position when converting to particles to have no overlap */

	  for (let y = 0; y < this.canvasHeight; y+=this.gap) {  /* using gap to only scan less than every pixel for data */
		for (let x = 0; x < this.canvasWidth; x+=this.gap) {
		  const index = (y * this.canvasWidth + x) * 4;  /* Get index for pixel by strafing the y and adding the x value and multiplying it with 4 since we have r, g, b, and a values in each pixel position */
		  const alpha = pixels[index + 3];

		  if (alpha) {
			const red = pixels[index];
			const green = pixels[index + 1];
		    const blue = pixels[index + 2];
			const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
		    this.particles.push(new Particle(this, x, y, color));  /* If alpha > 0 - a.k.a other color than black or white - push particle to store in the particle array */
		  }
	    }

	  }

	}
	render() {
	  this.particles.forEach(particle => {
		particle.update();
		particle.draw();
	  });
	}

	resize(width, height) {	/* Updating the text and canvas when resizing window */
	  this.canvasWidth = width;
	  this.canvasHeight = height;
	  this.textX = this.canvasWidth/2;
	  this.textY = this.canvasHeight/2;
	  this.maxTextWidth = this.canvasWidth * 0.8;
    }

  }

  const effect = new Effect(ctx, canvas.width, canvas.height);

  effect.wrapText('Type something above');
  //effect.render();

  function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	effect.render();
	requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', function() {	/* Do resizing calculations on canvas with the new window.innerWidth and window.inneHeight when resizing window */
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	effect.resize(canvas.width, canvas.height);
	//effect.wrapText(effect.textInput.value);
	effect.context.fillStyle = this.color;
	effect.context.fillRect(this.x, this.y, this.size, this.size);
  });

  /*  

  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

  ctx.strokeStyle = "green";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.stroke();

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0.3, 'red');
  gradient.addColorStop(0.5, 'fuchsia');
  gradient.addColorStop(0.7, 'purple');

  ctx.fillStyle = gradient;
  ctx.strokeStyle = "white";
  ctx.font = "80px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const maxTextWidth = canvas.width * 0.8;
  const lineHeight = 80;

  function wrapText(text) {
	let linesArray = [];
	let lineCounter = 0;
	let line = '';
    let words = text.split(' ');

	for(let i = 0; i < words.length; i++) {

	  let testLine = line + words[i] + ' ';  /* Add new word to the same line */

/*
	  if (ctx.measureText(testLine).width > maxTextWidth) {  /* When testLine gets wider than maxTextWidth we start words with lineCounter a.k.a newline */
/*		line = words[i] + ' ';
		lineCounter++;
	  }

	  else {
		line = testLine;
	  }

	  linesArray[lineCounter] = line;

	  //ctx.fillText(testLine, canvas.width/2, canvas.height/2 + i * 80);  /* 80 is fontsize here in pixels */
/*	}

    let textHeight = lineHeight * lineCounter;
    let textY = canvas.height/2 - textHeight/2;

	linesArray.forEach((el, index) => {
	  ctx.fillText(el, canvas.width/2, textY + (index * lineHeight));  /* 80 is fontsize here in pixels */
/*	});

  }

  //wrapText('This is how you can do multiline centered text');
/*  textInput.addEventListener('keyup', function(e) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);  /* Have to clear to avoid overlap since the scanned data from e.target.value contains all letters pushed in sequence */
/*	wrapText(e.target.value);
  });

 */

});