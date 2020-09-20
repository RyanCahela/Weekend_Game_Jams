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

let bulletContainer = null;
let enemyContainer = null;
const controls = KeyboardControls();
let spaceship = null;
let score = Text({
  text: "Score: 0",
  styles: {
    fill: "#ff4d4d",
    font: "20pt monospace",
    align: "center",
  },
  position: {
    x: WIDTH / 2,
    y: 30,
  },
  isHidden: true,
});
let enemySpawner = null;
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
  isHidden: false,
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
  isHidden: true,
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
  isHidden: true,
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

let scoreAmount = 0;
let gameState = "START_SCREEN";
let inputDelayTime = 3; //seconds
let delayTimeElapsed = 0;
myGame.run((deltaTime, currentTime) => {
  if (gameState === "START_SCREEN") {
    const { action } = controls.getState();
    if (action) {
      changeState("MAIN_GAME");
    }
  }

  if (gameState === "GAME_OVER_SCREEN") {
    if (deltaTime < inputDelayTime) delayTimeElapsed += deltaTime;
    const { action } = controls.getState();
    if (action && delayTimeElapsed > inputDelayTime) {
      changeState("START_SCREEN");
      delayTimeElapsed = 0;
    }
  }

  if (gameState === "MAIN_GAME") {
    checkForCollisions(deltaTime, currentTime);
  }
});

function init(deltaTime, currentTime) {
  myGame.clearSceneGraph();
  scoreAmount = 0;
  bulletContainer = Container({
    isHidden: true,
  });

  enemyContainer = Container();

  spaceship = Spaceship({
    spawnPosition: { x: 150, y: HEIGHT / 2 },
    controls,
    bulletContainer,
    movementConstraints: { x: WIDTH, y: HEIGHT },
    isHidden: true,
  });

  enemySpawner = EnemySpawner({
    movementConstraints: {
      x: WIDTH,
      y: HEIGHT,
    },
    enemyContainer,
    isHidden: true,
  });

  myGame.add(background);
  myGame.add(enemySpawner);
  myGame.add(spaceship);
  myGame.add(bulletContainer);
  myGame.add(title);
  myGame.add(startGameMessage);
  myGame.add(gameOverContinueText);
  myGame.add(gameOverText);
  myGame.add(score);
}

function changeState(newState) {
  if (newState === "START_SCREEN") {
    gameOverContinueText.setState({
      isHidden: true,
    });

    gameOverText.setState({
      isHidden: true,
    });

    score.setState({
      text: "Score: 0",
    });

    init();
    gameState = newState;
  }

  if (newState === "MAIN_GAME") {
    gameState = newState;
    title.setState({
      isHidden: true,
    });

    startGameMessage.setState({
      isHidden: true,
    });

    spaceship.setState({
      isHidden: false,
    });

    bulletContainer.setState({
      isHidden: false,
      clear: true,
    });

    enemySpawner.setState({
      isHidden: false,
      clear: true,
    });

    score.setState({
      isHidden: false,
    });

    console.log(score.getState());
  }

  if (newState === "GAME_OVER_SCREEN") {
    gameOverText.setState({
      isHidden: false,
    });

    gameOverContinueText.setState({
      isHidden: false,
    });

    gameState = newState;
  }
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

      changeState("GAME_OVER_SCREEN");
    }
  });
}
init();
