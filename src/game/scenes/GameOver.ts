import { GameObjects, Scene } from "phaser";

import { EventBus } from "../EventBus";
import { theme } from "../../theme";
import store from "../../store/store";
import { startGame } from "../startGame";
import { t } from "../../locales/translation";
import { putGame } from "../../api/gameDataApi";

export class GameOver extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor() {
        super("GameOver");
    }

    preload() {
        putGame(store.getState().game);
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const state = store.getState();
        const {
            last_score: lastScore,
            energy,
            max_energy: maxEnergy,
        } = state.game;

        this.title = this.add
            .text(centerX, centerY - 100, t("game_over"), {
                fontFamily: "FontOver",
                fontSize: 38,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.title = this.add
            .text(
                centerX,
                centerY - 50,
                t("last_score", {
                    score: lastScore,
                }),
                {
                    fontFamily: "FontOver",
                    fontSize: 16,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 8,
                    align: "center",
                }
            )
            .setOrigin(0.5)
            .setDepth(100);

        this.title = this.add
            .text(centerX, centerY - 20, t("energy", { energy, maxEnergy }), {
                fontFamily: "FontOver",
                fontSize: 16,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        const button = this.add
            .text(centerX, centerY + 80, t("start_game"), {
                fontFamily: "FontOver",
                fontSize: 38,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
                backgroundColor: theme.palette.primary.darker,
                padding: { x: 20, y: 20 },
            })
            .setInteractive()
            .setOrigin(0.5)
            .setDepth(100);

        button.on("pointerdown", () => {
            button.setStyle({ backgroundColor: theme.palette.primary.dark });
        });

        button.on("pointerout", () => {
            button.setStyle({ backgroundColor: theme.palette.primary.darker });
        });

        button.on("pointerup", () => {
            startGame(this);
        });

        EventBus.emit("current-scene-ready", this);
    }
}

