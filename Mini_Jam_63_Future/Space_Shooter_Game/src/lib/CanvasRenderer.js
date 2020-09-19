import { round } from "../utils/math";

const CanvasRenderer = (params) => {
  const { width, height } = params;
  if (!width || !height) {
    console.error(
      `You must pass {width: 'your-game-width', height: 'your-game-height'} 
      into CanvasRenderer Constructor`
    );
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const view = canvas;
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";

  const render = (container, clear = true) => {
    if (clear) ctx.clearRect(0, 0, width, height);
    renderRecursive(container);

    function renderRecursive(container) {
      const { nodes: parentContainerNodes } = container.getState();
      parentContainerNodes.forEach((node) => {
        ctx.save();
        const {
          text = "",
          texture,
          tileWidth = 0,
          tileHeight = 0,
          frame = { x: 0, y: 0 },
          nodes = [],
          styles = {},
          position = { x: 0, y: 0 },
          scale = { x: 1, y: 1 },
          rotation = 0,
          pivot = { x: 0, y: 0 },
          anchor = { x: 0, y: 0 },
        } = node.getState();

        if (position) {
          const { x, y } = position;
          ctx.translate(round(x), round(y));
        }

        if (anchor) {
          const { x, y } = anchor;
          ctx.translate(x, y);
        }

        if (scale) {
          const { x, y } = scale;
          ctx.scale(x, y);
        }

        if (rotation) {
          const { x, y } = pivot;
          ctx.translate(x, y);
          ctx.rotate(rotation);
          ctx.translate(-x, -y);
        }

        //draw leaf nodes
        if (text) {
          const { fill = "", align = "", font = "" } = styles;
          if (fill) ctx.fillStyle = fill;
          if (align) ctx.textAlign = align;
          if (font) ctx.font = font;
          ctx.fillText(text, 0, 0);
        }

        if (tileWidth && tileHeight && frame && texture) {
          const { image } = texture.getState();
          ctx.drawImage(
            image,
            frame.x * tileWidth,
            frame.y * tileHeight,
            tileWidth,
            tileHeight,
            0,
            0,
            tileWidth,
            tileHeight
          );
        } else if (texture) {
          const { image } = texture.getState();
          ctx.drawImage(image, 0, 0);
        }

        if (nodes.length != 0) {
          console.log(nodes);
          renderRecursive(node);
        }

        ctx.restore();
      });
    }
  };

  const getState = () => {
    return {
      view,
      render,
    };
  };

  return Object.freeze({
    getState,
  });
};

export default CanvasRenderer;
