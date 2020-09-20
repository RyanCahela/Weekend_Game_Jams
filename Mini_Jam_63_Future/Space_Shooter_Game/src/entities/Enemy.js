import Sprite from "../lib/Sprite";
import { randomInt } from "../utils/math";

const Enemy = (params) => {
  const { spawnPosition, speed = 500 } = params;
  const sprite = Sprite({
    textureUrl: "./resources/Enemy.png",
    position: spawnPosition,
    anchor: { x: -16, y: -16 },
  });
  let currentIsDead = false;

  const update = (deltaTime, currentTime) => {
    const { position } = sprite.getState();

    const newX = position.x - speed * deltaTime;

    sprite.setState({
      position: {
        x: newX,
      },
    });
  };

  const setState = (params) => {
    const { isDead } = params;
    if (isDead) {
      currentIsDead = isDead;
    }
  };

  const getState = () => {
    const { position, texture } = sprite.getState();
    return {
      texture,
      update,
      position,
      isDead: currentIsDead,
    };
  };

  return Object.freeze({
    getState,
    setState,
  });
};

export default Enemy;
