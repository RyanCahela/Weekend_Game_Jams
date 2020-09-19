import Sprite from "../lib/Sprite";
import Container from "../lib/Container";

const Spaceship = (params) => {
  const { controls, spawnPosition, movementConstraints } = params;
  const sprite = Sprite({
    textureUrl: "./resources/Spaceship.png",
    position: spawnPosition,
    anchor: { x: -16, y: -16 },
  });
  const tileSize = 32;
  const speed = 200;
  let timeOfLastBullet = 0;
  let fireRate = 0.3;
  let isFireing = false;

  const update = (deltaTime, currentTime) => {
    const { inputVector, action } = controls.getState();
    const { position: currentPosition } = sprite.getState();

    let newX = currentPosition.x + inputVector.x * speed * deltaTime;
    let newY = currentPosition.y + inputVector.y * speed * deltaTime;

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > movementConstraints.x - tileSize) {
      newX = movementConstraints.x - tileSize;
    }
    if (newY > movementConstraints.y - tileSize) {
      newY = movementConstraints.y - tileSize;
    }

    if (action && currentTime - timeOfLastBullet > fireRate) {
      isFireing = true;
      timeOfLastBullet = currentTime;
    } else {
      isFireing = false;
    }

    sprite.setState({
      position: {
        x: newX,
        y: newY,
      },
    });
  };

  const getState = () => {
    const { position, texture } = sprite.getState();
    return {
      position,
      texture,
      update,
      isFireing,
    };
  };

  return Object.freeze({
    getState,
  });
};

export default Spaceship;
