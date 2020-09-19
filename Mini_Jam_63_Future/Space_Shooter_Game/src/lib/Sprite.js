import Texture from "./Texture";

const Sprite = (params) => {
  const { textureUrl, position = { x: 0, y: 0 } } = params;
  const currentPosition = position;
  let texture = Texture({ url: textureUrl });

  const getState = () => {
    return {
      texture,
      position: currentPosition,
    };
  };

  const setState = (params) => {
    const { textureUrl, position } = params;
    if (textureUrl) texture = Texture({ url: textureUrl });
    if (position.x !== undefined) currentPosition.x = position.x;
    if (position.y !== undefined) currentPosition.y = position.y;
  };

  return Object.freeze({
    getState,
    setState,
  });
};

export default Sprite;
