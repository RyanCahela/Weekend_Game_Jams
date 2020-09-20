import Animation from "./Animation";

const AnimationManager = () => {
  const animations = {};
  let currentAnimation = null;

  const setState = (params) => {
    const { animationToAdd, animationToPlay } = params;

    if (animationToAdd !== undefined) {
      console.log(animationToAdd);
      const { name, frames, rate } = animationToAdd;
      animations[name] = Animation({
        frames,
        rate,
      });
    }

    if (animationToPlay) {
      currentAnimation = animations[animationToPlay];
    }
  };

  const update = (deltaTime, currentTime) => {
    console.log(currentAnimation);
    if (!currentAnimation) return;
    const { update: currentAnimationUpdate } = currentAnimation.getState();
    currentAnimationUpdate(deltaTime, currentTime);
  };

  const getState = () => {
    if (!currentAnimation) {
      return {
        update,
      };
    }

    const { frame } = currentAnimation.getState();
    return {
      frame,
      update,
    };
  };

  return Object.freeze({
    setState,
    getState,
  });
};

export default AnimationManager;
