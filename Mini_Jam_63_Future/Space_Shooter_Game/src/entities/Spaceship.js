import Sprite from "../lib/Sprite";
import Container from "../lib/Container";
import Bullet from "../entities/Bullet";

const Spaceship = (params) => {
  const {
    controls,
    spawnPosition,
    movementConstraints,
    bulletContainer,
    isHidden,
  } = params;
  const sprite = Sprite({
    textureUrl: "./resources/Spaceship.png",
    position: spawnPosition,
    anchor: { x: -16, y: -16 },
  });
  const tileSize = 32;
  const speed = 200;
  const bulletFirePositionOffset = 12;
  let currentIsHidden = isHidden;
  let currentIsDead = false;
  let timeOfLastBullet = 0;
  let fireRate = 0.3;

  const update = (deltaTime, currentTime) => {
    const { inputVector, action } = controls.getState();
    const { position: currentPosition } = sprite.getState();

    //handle movement
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

    sprite.setState({
      position: {
        x: newX,
        y: newY,
      },
    });

    //fire bullets
    if (action && currentTime - timeOfLastBullet > fireRate) {
      timeOfLastBullet = currentTime;
      bulletContainer.setState({
        nodeToAdd: Bullet({
          position: {
            x: currentPosition.x + bulletFirePositionOffset,
            y: currentPosition.y + bulletFirePositionOffset,
          },
          movementConstraints,
        }),
      });
    } else {
    }
  };

  const getState = () => {
    const { position, texture } = sprite.getState();
    return {
      position,
      texture,
      update,
      isDead: currentIsDead,
      isHidden: currentIsHidden,
    };
  };

  const setState = (params) => {
    const { isDead, isHidden } = params;
    if (isDead) {
      currentIsDead = isDead;
    }

    if (isHidden != undefined) {
      currentIsHidden = isHidden;
    }
  };

  return Object.freeze({
    getState,
    setState,
  });
};

export default Spaceship;
