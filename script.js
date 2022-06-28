const mapRange = (inputLower, inputUpper, outputLower, outputUpper, value) => {
  const INPUT_RANGE = inputUpper - inputLower;
  const OUTPUT_RANGE = outputUpper - outputLower;
  return outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE);
}

const clamp = (min, max, value) => value < min ? min : value > max ? max : value;

const generateHandler = (element, proximity, bounds, cb) => ({x, y}) => {
  const elementBounds = element.getBoundingClientRect();

  const centerX = elementBounds.left + elementBounds.width / 2;
  const centerY = elementBounds.top + elementBounds.height / 2;

  const boundX = mapRange(centerX - proximity, centerX + proximity, -bounds, bounds, x);
  const boundY = mapRange(centerY - proximity, centerY + proximity, -bounds, bounds, y);
  
  cb(boundX, boundY);
}


const update = (x, y) => {
  const clampedX = clamp(-100, 100, x);
  const clampedY = clamp(-100, 100, y);

  container.style.setProperty('--ratio-x', Math.floor(clampedX) / 100);
  container.style.setProperty('--ratio-y', Math.floor(clampedY / 100));
}

const container = document.querySelector('.container');
document.addEventListener('pointermove', generateHandler(container, 100, 100,  update));