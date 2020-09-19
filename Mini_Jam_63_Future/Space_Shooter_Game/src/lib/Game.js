import Container from "./Container";
import CanvasRenderer from "./CanvasRenderer";

const Game = (params) => {
  const { width, height, parentElementIdentifier } = params;
  const scene = Container();
  const renderer = CanvasRenderer({ width, height });
  const { view } = renderer.getState();
  document.querySelector(parentElementIdentifier).appendChild(view);

  let deltaTime = 0;
  let timeOfLastFrame = 0;

  const run = (callback = () => {}) => {
    requestAnimationFrame(loop);

    function loop(ms) {
      requestAnimationFrame(loop);
      const currentTime = ms / 1000; //convert miliseconds to seconds
      deltaTime = currentTime - timeOfLastFrame;
      timeOfLastFrame = currentTime;

      const { update } = scene.getState();
      const { render } = renderer.getState();
      update(deltaTime, currentTime);
      callback(deltaTime, currentTime);
      render(scene);
    }
  };

  const add = (nodeToAdd) => {
    scene.setState({
      nodeToAdd,
    });
  };

  return Object.freeze({
    run,
    add,
  });
};

export default Game;
