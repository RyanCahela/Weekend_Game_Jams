const Text = (params) => {
  const {
    //defaults
    text = "this is placeholder text",
    styles = { fill: "#f1f0ee", font: "20pt serif", align: "center" },
    position = { x: 0, y: 0 },
  } = params;

  const setState = (params) => {
    const {
      text,
      styles: newStyles,
      position: newPostion = { x: 0, y: 0 },
    } = params;
    if (text) text = newText;
    if (!Object.entries(newStyles).length === 0) {
      const { fill = "", align = "", font = "" } = newStyles;
      if (fill) styles.fill = fill;
      if (align) styles.align = align;
      if (font) styles.font = font;
    }
    if (position.x !== undefined) position.x = newPostion.x;
    if (position.y !== undefined) position.y = newPostion.y;
  };

  const getState = () => {
    return {
      text,
      styles,
      position,
    };
  };

  return Object.freeze({
    setState,
    getState,
  });
};

export default Text;
