import TileSprite from "../lib/TileSprite";
import Bullet from "../entities/Bullet";
import AnimationManager from "../lib/AnimationManager";

const Spaceship = (params) => {
  const {
    controls,
    spawnPosition,
    movementConstraints,
    bulletContainer,
    isHidden,
  } = params;
  const tileSprite = TileSprite({
    textureUrl: "./resources/SpaceshipSpriteSheet.png",
    position: spawnPosition,
    anchor: { x: -16, y: -16 },
    tileWidth: 32,
    tileHeight: 32,
    frame: { x: 0, y: 0 },
  });
  const animationManager = AnimationManager();
  animationManager.setState({
    animaitonToAdd: {
      name: "fly",
      frames: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ],
      rate: 0.3,
    },
  });
  animationManager.setState({
    animationToPlay: "fly",
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
    const { position: currentPosition } = tileSprite.getState();
    const { update: animationManagerUpdate } = animationManager.getState();
    animationManagerUpdate(deltaTime, currentTime);

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

    tileSprite.setState({
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
    const {
      position,
      texture,
      frame,
      tileWidth,
      tileHeight,
    } = tileSprite.getState();
    return {
      position,
      texture,
      update,
      frame,
      tileWidth,
      tileHeight,
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
