const KeyboardControls = () => {
  const keys = {};
  const keyCodes = {
    leftArrow: 37,
    upArrow: 38,
    rightArrow: 39,
    downArrow: 40,
    aKey: 65,
    dKey: 68,
    wKey: 87,
    sKey: 83,
    spacebar: 32,
  };

  document.addEventListener("keydown", handleKeyDown, false);
  document.addEventListener("keyup", handleKeyUp, false);

  function handleKeyUp(e) {
    keys[e.which] = false;
  }

  function handleKeyDown(e) {
    const { leftArrow, rightArrow, upArrow, downArrow } = keyCodes;
    if ([leftArrow, rightArrow, upArrow, downArrow].includes(e.which)) {
      //prevent arrow keys from scrolling the page
      e.preventDefault();
    }

    keys[e.which] = true;
  }

  function getState() {
    const {
      leftArrow,
      rightArrow,
      upArrow,
      downArrow,
      aKey,
      dKey,
      wKey,
      sKey,
      spacebar,
    } = keyCodes;
    let inputVector = { x: 0, y: 0 };
    let action = false;

    if (keys[leftArrow] || keys[aKey]) {
      inputVector.x = -1;
    }

    if (keys[upArrow] || keys[wKey]) {
      inputVector.y = -1;
    }

    if (keys[rightArrow] || keys[dKey]) {
      inputVector.x = 1;
    }

    if (keys[downArrow] || keys[sKey]) {
      inputVector.y = 1;
    }

    if (keys[spacebar]) {
      action = true;
    }

    return {
      inputVector,
      action,
    };
  }

  return Object.freeze({
    getState,
  });
};

export default KeyboardControls;
