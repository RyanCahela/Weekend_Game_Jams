import Game from "./lib/Game";
import Text from "./lib/Text";
import KeyboardControls from "./lib/KeyboardControls";
import Spaceship from "./entities/Spaceship";
import Container from "./lib/Container";
import EnemySpawner from "./entities/EnemySpawner";
import { distance } from "./utils/math";
import Background from "./entities/Background";

const WIDTH = 640;
const HEIGHT = 300;

const bulletContainer = Container();
const enemyContainer = Container();
const controls = KeyboardControls();
const spaceship = Spaceship({
  spawnPosition: { x: 150, y: HEIGHT / 2 },
  controls,
  bulletContainer,
  movementConstraints: { x: WIDTH, y: HEIGHT },
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
const enemySpawner = EnemySpawner({
  movementConstraints: {
    x: WIDTH,
    y: HEIGHT,
  },
  enemyContainer,
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

const gameOverText = Text({
  text: "GAME OVER",
  styles: {
    fill: "#e55dac",
    font: "50pt monospace",
    align: "center",
  },
  position: {
    x: WIDTH / 2,
    y: HEIGHT / 2,
  },
});

const gameOverContinueText = Text({
  text: "Press spacebar to restart",
  styles: {
    fill: "#e55dac",
    font: "15pt monospace",
    align: "center",
  },
  position: {
    x: WIDTH / 2,
    y: 200,
  },
});

const background = Background({
  textureUrl: "./resources/Background.png",
  position: { x: 0, y: 0 },
});
const startGameMessage = Text({
  text: "Press spacebar to start",
  styles: {
    fill: "#33a5ff",
    font: "15pt monospace",
    align: "center",
  },
  position: {
    x: WIDTH / 2,
    y: 150,
  },
});
const myGame = Game({
  width: WIDTH,
  height: HEIGHT,
  parentElementIdentifier: "#board",
});

let isGameOver = false;
let scoreAmount = 0;
let gameState = "START_GAME_SCREEN";
myGame.run((deltaTime, currentTime) => {
  const { action } = controls.getState();

  if (gameState === "START_GAME_SCREEN" && action) {
    gameState = "MAIN_GAME_LOOP";
    runMainGame();
    return;
  }

  if (gameState === "GAME_OVER_SCREEN" && action) {
    gameState = "START_GAME_SCREEN";
    runStartGameScreen();
    return;
  }

  if (gameState === "MAIN_GAME_LOOP" && isGameOver) {
    gameState = "GAME_OVER_SCREEN";
    runGameOverScreen();
    return;
  }

  checkForCollisions(deltaTime, currentTime);
});

function runMainGame(deltaTime, currentTime) {
  myGame.remove(title);
  myGame.remove(startGameMessage);
  myGame.add(enemySpawner);
  myGame.add(spaceship);
  myGame.add(bulletContainer);
  myGame.add(score);
}

function checkForCollisions(deltaTime, currentTime) {
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

      isGameOver = true;
    }
  });
}

function runGameOverScreen() {
  myGame.add(gameOverText);
  myGame.add(gameOverContinueText);
}

function runStartGameScreen() {
  myGame.remove(gameOverText);
  myGame.remove(gameOverContinueText);
  myGame.remove(enemySpawner);
  myGame.remove(bulletContainer);
  myGame.remove(spaceship);
  myGame.remove(score);
  myGame.add(background);
  myGame.add(title);
  myGame.add(startGameMessage);
}

runStartGameScreen();
