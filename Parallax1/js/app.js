const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0;

window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;  /* How much x mouse has moved from center */
  yValue = e.clientY - window.innerHeight / 2;  /* How much y mouse has moved from center */

  console.log(xValue, yValue);

  parallax_el.forEach(el => {

	let speedx = el.dataset.speedx;  /* dataset.speedx possible here because we named the attribute
													data-speedx */

	let speedy = el.dataset.speedy;

	el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue *speedy}px))`;
  });

});