const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0;

let rotateDegree = 0;

window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;  /* How much x mouse has moved from center */
  yValue = e.clientY - window.innerHeight / 2;  /* How much y mouse has moved from center */

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  parallax_el.forEach(el => {

	let speedx = el.dataset.speedx;  /* dataset.speedx possible here because we named the attribute
													data-speedx */

	let speedy = el.dataset.speedy;
	let speedz = el.dataset.speedz;
	let rotateSpeed = el.dataset.rotation;

    let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue = (e.clientX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;  /* e.clientX - element .left value, parsing float to get rid of the px */

    /* We may want to skip the rotateY */

	el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue *speedy}px)) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${rotateDegree * rotateSpeed}deg)`;
  });

});

/* GSAP Animation */

/*
let timeline = gsap.timeline();

parallax_el.forEach(el => {
  timeline.from(
	el, 
	{
      top: `${el.offsetHeight / 2 + el.dataset.distance}px`,
	  duration: 1,
	},
	"1"
	);

});
*/