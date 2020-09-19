import Sprite from "../lib/Sprite";

const Enemy = (params) => {
  const { spawnPosition } = params;
  const sprite = Sprite({
    textureUrl: "./resources/Enemy.png",
    position: spawnPosition,
  });
  const speed = 200;

  const update = (deltaTime, currentTime) => {
    const { position } = sprite.getState();

    const newX = position.x - speed * deltaTime;

    sprite.setState({
      position: {
        x: newX,
      },
    });
  };

  const getState = () => {
    const { position, texture } = sprite.getState();
    return {
      texture,
      update,
      position,
    };
  };

  return Object.freeze({
    getState,
  });
};

export default Enemy;
