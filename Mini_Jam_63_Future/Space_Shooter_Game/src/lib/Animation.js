const Animation = (params) => {
  const { frames, rate } = params;
  let currentFrameIndex = 0;
  let currentFrame = frames[currentFrameIndex];
  let currentAnimationTime = 0;

  const update = (deltaTime, currentTime) => {
    if (deltaTime < rate) currentAnimationTime += deltaTime;

    if (currentAnimationTime > rate) {
      currentFrameIndex++;
      currentFrame = frames[currentFrameIndex % frames.length];
      currentAnimationTime -= rate;
    }
  };

  const getState = () => {
    return {
      update,
      frame: currentFrame,
    };
  };

  return {
    getState,
  };
};

export default Animation;
