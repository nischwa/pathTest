
const canvas: HTMLCanvasElement = document.querySelector('#js-canvas');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

const img = new Image();
img.crossOrigin = 'anonymous';
img.src = './public/testPath.jpg';

let time = performance.now();

img.addEventListener('load', () => {
  console.log('Image for Path loaded...');
  ctx.drawImage(img, 0, 0);
  analyseImage();
})


const coordinates: {x: number, y: number}[] = [];
const colorOffset = 150;

const analyseImage = () => {
  const imgWidth = img.width;
  const imgHeight = img.height;
  console.log(`Width: ${imgWidth}; Height: ${imgHeight}`);
  for (let y = 0; y < imgHeight; y++) {
    for (let x = 0; x < imgWidth; x++) {
      const pixel = ctx.getImageData(x, y, 1, 1);
      if (pixel.data[0] < colorOffset && pixel.data[1] < colorOffset && pixel.data[2] < colorOffset) {
        coordinates.push({x,y});
      }
    }
  }

  console.log('Done!', performance.now() - time);
  console.log(coordinates);
  drawCoordinates();
}

const drawCoordinates = () => {
  ctx.fillStyle = 'green';
  const pxSize = 2
  coordinates.forEach(cord => {
    ctx.fillRect(cord.x + 250, cord.y, pxSize,pxSize);
  })
  console.log('Done Drawing!', performance.now() - time);
}
