import Sprite from "../lib/Sprite";

const Bullet = (params) => {
  const { position, movementConstraints } = params;
  const sprite = Sprite({
    textureUrl: "./resources/Bullet.png",
    position,
  });
  const speed = 400;
  let isDead = false;

  const update = (deltaTime) => {
    const { position: currentPosition } = sprite.getState();

    let newX = currentPosition.x + speed * deltaTime;

    // if (newX > movementConstraints.x) {
    //   console.log("dead bullet");
    //   isDead = true;
    // }
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
      texture,
      position,
      isDead,
      update,
    };
  };

  return Object.freeze({
    getState,
  });
};

export default Bullet;
