import Game from "./lib/Game";
import Text from "./lib/Text";
import Sprite from "./lib/Sprite";

const WIDTH = 640;
const HEIGHT = 300;
const myGame = Game({
  width: WIDTH,
  height: HEIGHT,
  parentElementIdentifier: "#board",
});

const title = Text({
  text: "StarBox 63",
  styles: {
    fill: "#69deff",
    font: "30pt monospace",
    align: "center",
  },
  position: {
    x: WIDTH / 2,
    y: 50,
  },
});

const background = Sprite({
  textureUrl: "./resources/Background.png",
  position: { x: 0, y: 0 },
});

myGame.add(background);
myGame.add(title);

myGame.run();
