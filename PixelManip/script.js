const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 1160;
canvas.height = 774;

const image1 = new Image(); // Using optional size for image
image1.src = "./1885772-full.jpg";

image1.addEventListener('load', function() {
  ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(scannedImage);

  /* Creating own dataarray from the dataarray of the scanned image data */
  const scannedData = scannedImage.data;

  /* When scanning Image you get the dataarray for the rgba value for each pixel of the image,
	this has it so i => red, i+1 => green, i+2 => blue, i+3 => alpha -
	use i+=4 to get to next pixel */

  /* Make grayscaled - putting coloraverage for each color component of the pixel */

  for (let i = 0; i < scannedData.length; i +=4) {
	const total = scannedData[i] + scannedData[i+1] + scannedData[i+2];
	const averageColorValue = total/3;
	scannedData[i] = averageColorValue;
	scannedData[i+1] = averageColorValue;
	scannedData[i + 2] = averageColorValue;
  }

  /* Update imagedata with new scan */
  scannedImage.data = scannedData;
  ctx.putImageData(scannedImage, 0, 0);

});