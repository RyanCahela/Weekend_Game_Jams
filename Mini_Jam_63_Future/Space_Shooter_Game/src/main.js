import Game from "./lib/Game";
import Text from "./lib/Text";
import Sprite from "./lib/Sprite";
import KeyboardControls from "./lib/KeyboardControls";
import Spaceship from "./entities/Spaceship";
import Bullet from "./entities/Bullet";
import Enemy from "./entities/Enemy";
import Container from "./lib/Container";
import EnemySpawner from "./entities/EnemySpawner";
import { distance } from "./utils/math";
import Background from "./entities/Background";

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
const score = Text({
  text: "Score: 0",
  styles: {
    fill: "#ff4d4d",
    font: "20pt monospace",
    align: "center",
  },
  position: {
    x: WIDTH / 2,
    y: 20,
  },
});
const background = Background({
  textureUrl: "./resources/Background.png",
  position: { x: 0, y: 0 },
});
const spaceship = Spaceship({
  spawnPosition: { x: 150, y: HEIGHT / 2 },
  controls: KeyboardControls(),
  bulletContainer,
  movementConstraints: { x: WIDTH, y: HEIGHT },
});

let scoreAmount = 0;
let gameState = "MAIN_GAME_LOOP";

myGame.add(background);
myGame.add(enemySpawner);
myGame.add(bulletContainer);
myGame.add(spaceship);
myGame.add(score);
myGame.run((deltaTime, currentTime) => {
  switch (gameState) {
    case "MAIN_GAME_LOOP":
      runMainGame(deltaTime, currentTime);
      break;
    case "START_GAME_SCREEN":
      runStartGameScreen(deltaTime, currentTime);
      break;
    case "GAME_OVER_SCREEN":
      runGameOverScreen(deltaTime, currentTime);
      break;
    default:
      throw Error(
        `gameState isn't what you expected. gameState = ${gameState}`
      );
  }
});

function runMainGame(deltaTime, currentTime) {
  const { nodes: bullets } = bulletContainer.getState();
  const { nodes: enemies } = enemySpawner.getState();

  enemies.map((enemy) => {
    bullets.map((bullet) => {
      const { position: bulletPosition } = bullet.getState();
      const { position: enemyPosition } = enemy.getState();
      if (distance(bulletPosition, enemyPosition) < 24) {
        bullet.setState({
          isDead: true,
        });

        enemy.setState({
          isDead: true,
        });

        scoreAmount += Math.round(currentTime);
        score.setState({
          text: `Score: ${scoreAmount}`,
        });
      }
    });

    const { position: enemyPosition } = enemy.getState();
    const {
      position: spaceshipPosition,
      isDead: isDeadSpaceship,
    } = spaceship.getState();

    //detect game over
    if (isDeadSpaceship) return;
    if (distance(enemyPosition, spaceshipPosition) < 32) {
      enemy.setState({
        isDead: true,
      });

      spaceship.setState({
        isDead: true,
      });
    }
  });
}
