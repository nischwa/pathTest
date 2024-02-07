
const canvas: HTMLCanvasElement = document.querySelector('#js-canvas');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d', { willReadFrequently: true });

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
let coordinatesNormalized: {x: number, y: number}[] = [];
const colorOffset = 150;

const imgWidth = img.width;
const imgHeight = img.height;
let animationIndex = 0;

const analyseImage = () => {

  console.log(`Width: ${imgWidth}; Height: ${imgHeight}`);
  for (let y = 0; y < imgHeight; y++) {
    for (let x = 0; x < imgWidth; x++) {
      const pixel = ctx.getImageData(x, y, 1, 1);
      if (pixel.data[0] < colorOffset && pixel.data[1] < colorOffset && pixel.data[2] < colorOffset) {
        coordinates.push({x,y});
      }
    }
  }

  coordinatesNormalized = coordinates.map((co) => {
    const x = co.x / imgWidth * 100;
    const y = co.y / imgHeight * 100;
    return {x,y};
  })

  console.log('Done!', performance.now() - time);
  console.log(coordinatesNormalized);
  // drawCoordinates();
  animation();
}

const drawCoordinates = () => {
  ctx.fillStyle = 'green';
  const pxSize = 1
  coordinates.forEach(cord => {
    ctx.fillRect(cord.x + 250, cord.y , pxSize,pxSize);
  })
  console.log('Done Drawing!', performance.now() - time);
}

const animation = () => {
  const pxSize = 10
  ctx.clearRect(0,0, 480, 640);
  ctx.drawImage(img, 0, 0);
  ctx.fillStyle = 'green';
  ctx.fillRect(coordinates[animationIndex].x + 250, coordinates[animationIndex].y , pxSize,pxSize);
  animationIndex++;
  requestAnimationFrame(animation);
}
