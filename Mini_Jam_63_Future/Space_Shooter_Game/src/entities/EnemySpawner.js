import Container from "../lib/Container";
import Enemy from "./Enemy";
import { randomInt } from "../utils/math";

const EnemySpawner = (params) => {
  const { movementConstraints, enemyContainer, isHidden } = params;
  const enemySize = 32;
  let spawnRate = 1; //seconds
  let timeOfLastSpawn = 0;
  let currentIsHidden = isHidden;

  const update = (deltaTime, currentTime) => {
    const { update } = enemyContainer.getState();
    update(deltaTime, currentTime);
    if (spawnRate < currentTime - timeOfLastSpawn) {
      timeOfLastSpawn = currentTime;
      enemyContainer.setState({
        nodeToAdd: Enemy({
          spawnPosition: {
            x: movementConstraints.x - enemySize,
            y: randomInt(0, movementConstraints.y - enemySize),
          },
          speed: randomInt(20, 200),
        }),
      });
    }

    enemyContainer.setState({
      callbackToMap: (node) => {
        const { position } = node.getState();

        if (position.x < 0) {
          console.log("dead enemy");
          node.setState({
            isDead: true,
          });
        }
      },
    });
  };

  const setState = (params) => {
    const { isHidden = false, clear = false } = params;
    currentIsHidden = isHidden;
    if (clear) {
      enemyContainer.setState({
        clear: true,
      });
    }
  };

  const getState = () => {
    const { nodes } = enemyContainer.getState();
    return {
      update,
      nodes,
      isHidden: currentIsHidden,
    };
  };

  return Object.freeze({
    getState,
    setState,
  });
};

export default EnemySpawner;
