const bar = document.getElementById('bar');
const myclose = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
	nav.classList.add('active');
  })
}

if (myclose) {
  myclose.addEventListener('click', () => {
	nav.classList.remove('active');
  })
}