const Text = (params) => {
  const {
    //defaults
    styles = { fill: "#f1f0ee", font: "20pt serif", align: "center" },
    position = { x: 0, y: 0 },
    isHidden = false,
  } = params;

  let { text: currentText = "this is placeholder text" } = params;
  let currentIsHidden = isHidden;

  const setState = (params) => {
    const {
      text,
      styles: newStyles = {},
      position: newPostion = { x: 0, y: 0 },
      isHidden,
    } = params;
    if (text) currentText = text;
    if (!Object.entries(newStyles).length === 0) {
      const { fill = "", align = "", font = "" } = newStyles;
      if (fill) styles.fill = fill;
      if (align) styles.align = align;
      if (font) styles.font = font;
    }
    if (position.x !== undefined) position.x = newPostion.x;
    if (position.y !== undefined) position.y = newPostion.y;
    if (isHidden !== undefined) currentIsHidden = isHidden;
  };

  const getState = () => {
    return {
      text: currentText,
      styles,
      position,
      isHidden: currentIsHidden,
    };
  };

  return Object.freeze({
    setState,
    getState,
  });
};

export default Text;
