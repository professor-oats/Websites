window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const image1 = document.getElementById('image1');

  class Particle {
	constructor(effect, x, y, color) {
	  this.effect = effect;
	  this.x = 0;  /* Give current x a random position within effect width */
	  this.y = 0;
	  this.originX = Math.floor(x);
	  this.originY = Math.floor(y);
	  this.color = color;
	  this.size = 4; /* this.effect.gap; */
	  this.vx = 0;  /* Math.random() * 2 - 1; */
	  this.vy = 0;   /* Math.random() * 2 - 1; */
	  this.ease = 0.2;
	  this.dx = 0;
	  this.dy = 0;
	  this.distance = 0;
	  this.force = 0;
	  this.friction = 0.95;
	  this.angle = 0;
    }

	draw(context) {
	  context.fillStyle = this.color;
	  context.fillRect(this.x, this.y, this.size, this.size);
	}

	update() {

	  this.dx = this.effect.mouse.x - this.x;
	  this.dy = this.effect.mouse.y - this.y;

	  /* Distance from pixel to the mouse will be given through pythagoras theorem */
	  /* We will avoid using sqrt since it takes more computation, a big value of mouse radius
		has it so we can omit sqrt */
	  this.distance = this.dx * this.dx + this.dy * this.dy;
	  this.force = -this.effect.mouse.radius / this.distance;

	  if (this.distance < this.effect.mouse.radius) {
		this.angle = Math.atan2(this.dy, this.dx);
	    this.vx += this.force * Math.cos(this.angle);
		this.vy += this.vy += this.force * Math.sin(this.angle);
	  }

	  this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;  /* 0.1 is to slow the position change from the constant run of update */
	  this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
	}

	warp() {
	  this.x = Math.random() * this.effect.width;
	  this.y = Math.random() * this.effect.height;
	  this.ease = 0.05;
	}

  }

  class Effect {
	constructor(width, height) {
	  this.width = width;
	  this.height = height;
	  this.particlesArray = [];
	  this.image = document.getElementById('image1');
	  this.centerX = this.width * 0.5;
	  this.centerY = this.height * 0.5;

	  /* Making offset of half the image height and width to give proper position for centering */
	  this.x = this.centerX - 500 * 0.5;
	  this.y = this.centerY - 333 * 0.5;
	  this.gap = 4;
	  this.mouse = {
		radius: 3000,
		x: undefined,
		y: undefined
	  }
	  window.addEventListener('mousemove', (event) => {
		this.mouse.x = event.x;
		this.mouse.y = event.y;
		
	  });

	}

	/* Initiate particles */
	init(context) {
	  /*
	  for (let i = 0; i < 100; i++) {
	    this.particlesArray.push(new Particle(this));
	  }
	  */
	    context.drawImage(this.image, this.x, this.y, 500, 333);
		const pixels = context.getImageData(0, 0, this.width, this.height).data;  /* Reads in the data as pixels */
		for (let y = 0; y < this.height; y += this.gap) {
			for (let x = 0; x < this.width; x += this.gap) {
			  /* Get dataarrayindex of current pixel, times for since each pixel is stored with rbga */
			  const index = (y * this.width + x) * 4;
			  const red = pixels[index];
			  const green = pixels[index + 1];
			  const blue = pixels[index + 2];
			  const alpha = pixels[index + 3];
			  
			  const color = 'rgb(' + red + ',' + green + ',' + blue + ')';

			  /* Finding pixelposition with alpha value and push pixel (non-white) */
			  if (alpha > 0) {
				this.particlesArray.push(new Particle(this, x, y, color));
			  }
			}
		}
	  

	}

	draw(context) {
	  this.particlesArray.forEach(particle => particle.draw(context));
	}

	update() {
	  this.particlesArray.forEach(particle => particle.update());
	}

	warp() {
	  this.particlesArray.forEach(particle => particle.warp());
	}

  }

  /* Find and trigger the constructor of class Particle and assign it to particle1 object */
  /* const particle1 = new Particle();
  particle1.draw(); */

  const effect = new Effect(canvas.width, canvas.height);
  effect.init(ctx);

  function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	effect.draw(ctx);
	effect.update();
	requestAnimationFrame(animate);
  }

  animate();

  // warp button

  const warpButton = document.getElementById('warpButton');
  warpButton.addEventListener('click', function() {
	effect.warp();
  });


});
