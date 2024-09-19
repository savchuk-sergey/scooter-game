import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { theme } from "../theme";

const calculateGameDimensions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return { width, height };
};

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: calculateGameDimensions().width,
    height: calculateGameDimensions().height,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    backgroundColor: theme.palette.primary.light,
    scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

const StartGame = (parent: string) => {
    const gameConfig = { ...config, parent };
    const game = new Phaser.Game(gameConfig);

    window.addEventListener("resize", () => {
        const { width, height } = calculateGameDimensions();
        game.scale.resize(width, height);
    });

    return game;
};

export default StartGame;

