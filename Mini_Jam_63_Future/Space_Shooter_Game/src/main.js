import Game from "./lib/Game";
import Text from "./lib/Text";
import Sprite from "./lib/Sprite";
import KeyboardControls from "./lib/KeyboardControls";
import Spaceship from "./entities/Spaceship";
import Bullet from "./entities/Bullet";
import Enemy from "./entities/Enemy";
import Container from "./lib/Container";
import EnemySpawner from "./entities/EnemySpawner";

const WIDTH = 640;
const HEIGHT = 300;
const bulletContainer = Container();
const enemyContainer = Container();
const enemySpawner = EnemySpawner({
  movementConstraints: {
    x: WIDTH,
    y: HEIGHT,
  },
  enemyContainer,
});
const myGame = Game({
  width: WIDTH,
  height: HEIGHT,
  parentElementIdentifier: "#board",
});

// const title = Text({
//   text: "StarBox 63",
//   styles: {
//     fill: "#69deff",
//     font: "30pt monospace",
//     align: "center",
//   },
//   position: {
//     x: WIDTH / 2,
//     y: 50,
//   },
// });

const background = Sprite({
  textureUrl: "./resources/Background.png",
  position: { x: 0, y: 0 },
});

const spaceship = Spaceship({
  spawnPosition: { x: 150, y: HEIGHT / 2 },
  controls: KeyboardControls(),
  bulletContainer,
  movementConstraints: { x: WIDTH, y: HEIGHT },
});

myGame.add(background);
myGame.add(enemySpawner);
myGame.add(bulletContainer);
myGame.add(spaceship);

myGame.run((deltaTime, currentTime) => {
  const { nodes: bullets } = bulletContainer.getState();
  const { nodes: enemies } = enemySpawner.getState();
});
