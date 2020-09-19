function randomFloat(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(randomFloat(min, max));
}

function randomOneIn(odds) {
  return randomInt(odds) === 0;
}

function distance(positionObj1, positionObj2) {
  const deltaX = positionObj1.x - positionObj2.x;
  const deltaY = positionObj1.y - positionObj2.y;
  //a^2 + b^2 = c^2
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

function round(val) {
  return Math.round(val);
}

export { randomFloat, randomInt, randomOneIn, distance, clamp, round };
