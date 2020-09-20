import Sprite from "./Sprite";

const TileSprite = (params) => {
  const { textureUrl, tileWidth, tileHeight, position, frame } = params;
  const sprite = Sprite({
    textureUrl,
    position,
  });
  let currentFrame = frame;

  const getState = () => {
    const { texture, position } = sprite.getState();
    return {
      texture,
      position,
      tileWidth,
      tileHeight,
      frame: currentFrame,
    };
  };

  const setState = (params) => {
    const { frame, position } = params;

    if (frame !== undefined) currentFrame = frame;
    if (position !== undefined)
      sprite.setState({
        position,
      });
  };

  return Object.freeze({
    getState,
    setState,
  });
};

export default TileSprite;
