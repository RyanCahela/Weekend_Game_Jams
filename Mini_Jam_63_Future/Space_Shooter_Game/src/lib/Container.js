const Container = (params = {}) => {
  const { isHidden } = params;
  const position = { x: 0, y: 0 };
  let nodes = [];
  let currentIsHidden = isHidden;

  const setState = (newState) => {
    const {
      nodeToAdd,
      nodeToRemove,
      callbackToMap,
      clear = false,
      isHidden = false,
    } = newState;

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

    if (clear) {
      nodes = [];
    }

    if (isHidden !== undefined) {
      currentIsHidden = isHidden;
    }
  };

  const getState = () => {
    return {
      nodes,
      position,
      update,
      isHidden: currentIsHidden,
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
