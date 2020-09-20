const Container = () => {
  const position = { x: 0, y: 0 };
  let nodes = [];

  const setState = (newState) => {
    const { nodeToAdd, nodeToRemove, callbackToMap } = newState;

    if (nodeToAdd) {
      nodes.push(nodeToAdd);
    }

    if (nodeToRemove) {
      nodes = nodes.filter((node) => node != nodeToRemove);
      return nodeToRemove;
    }

    if (callbackToMap) {
      nodes.map(callbackToMap);
    }
  };

  const getState = () => {
    return {
      nodes,
      position,
      update,
    };
  };

  const update = (deltaTime, currentTime) => {
    nodes = nodes.filter((node) => {
      const { update, isDead } = node.getState();
      if (update) {
        update(deltaTime, currentTime);
      }

      if (isDead === undefined) return true;
      return isDead ? false : true;
    });
  };

  return Object.freeze({
    setState,
    getState,
  });
};

export default Container;
