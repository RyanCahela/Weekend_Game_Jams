import Sprite from "../lib/Sprite";

const Bullet = (params) => {
  const { position, movementConstraints } = params;
  const sprite = Sprite({
    textureUrl: "./resources/Bullet.png",
    position,
  });
  const speed = 400;
  let currentIsDead = false;

  const update = (deltaTime) => {
    const { position: currentPosition } = sprite.getState();

    let newX = currentPosition.x + speed * deltaTime;

    if (newX > movementConstraints.x) {
      console.log("dead bullet");
      currentIsDead = true;
    }
    console.log("newX", newX);

    sprite.setState({
      position: {
        x: newX,
      },
    });
  };

  const getState = () => {
    const { position, texture } = sprite.getState();
    return {
      position,
      texture,
      isDead: currentIsDead,
      update,
    };
  };

  const setState = (params) => {
    const { isDead } = params;
    if (isDead) {
      currentIsDead = isDead;
    }
  };

  return Object.freeze({
    getState,
    setState,
  });
};

export default Bullet;
