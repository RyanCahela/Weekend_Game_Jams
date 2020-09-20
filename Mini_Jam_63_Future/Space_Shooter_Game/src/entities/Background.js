import Sprite from "../lib/Sprite";

const Background = (params) => {
  const { position } = params;
  const sprite = Sprite({
    textureUrl: "./resources/Background.png",
    position,
  });
  const backgroundWidth = 640;
  const scrollSpeed = 10;

  const update = (deltaTime, currentTime) => {
    const { position } = sprite.getState();

    if (position.x <= -backgroundWidth) {
      sprite.setState({
        position: {
          x: 0,
          y: 0,
        },
      });
    } else {
      sprite.setState({
        position: {
          x: position.x - scrollSpeed * deltaTime,
        },
      });
    }
  };

  const getState = () => {
    const { texture } = sprite.getState();
    return {
      update,
      position,
      texture,
    };
  };

  return Object.freeze({
    getState,
  });
};

export default Background;
