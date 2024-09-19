import { EventBus } from "../EventBus";
import { GameObjects, Physics, Scene } from "phaser";
import store, { RootState } from "../../store/store";
import {
    incrementScore,
    decrementScore,
    decrementHealth,
    setLastScore,
} from "../../store/gameSlice";
import { t } from "../../locales/translation";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    player: Physics.Arcade.Image;
    scoreText: GameObjects.Text;
    healthText: GameObjects.Text;
    score: number;
    zones: number[];
    health: number;
    damageDelay: number;
    isOverlapping: boolean;
    overlapTimer: Phaser.Time.TimerEvent | null;
    overlappingObjects: Map<any, any>;

    constructor() {
        super("Game");
        this.score = 0;
        this.zones = [];
        this.health = 0;
        this.damageDelay = 50;
        this.isOverlapping = false;
        this.overlapTimer = null;
        this.overlappingObjects = new Map();
    }

    preload() {
        // Загрузка ассетов
    }

    create() {
        // Добавление фона
        const { width, height } = this.scale;
        const zoneWidth = width / 6;

        const background = this.add.image(0, 0, "road");
        background.setOrigin(0, 0);
        background.setDisplaySize(width, height);

        // Создание зон
        for (let i = 0; i < 6; i++) {
            this.zones.push(i * zoneWidth + zoneWidth / 2);
        }

        // Создание персонажа
        this.player = this.physics.add.image(
            this.zones[2],
            height - 50,
            "player"
        );
        this.player.setCollideWorldBounds(true);
        this.player.setScale((zoneWidth - 10) / this.player.width); // масштабирование под размер зоны

        // Создание текстового объекта для счёта
        this.scoreText = this.add.text(
            16,
            16,
            t("score", { score: this.score }),
            {
                fontFamily: "FontOver",
                fontSize: "32px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            }
        );

        // Создание текстового объекта для счёта
        this.healthText = this.add.text(16, 48, t("health", { health: 0 }), {
            fontFamily: "FontOver",
            fontSize: "32px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8,
            align: "center",
        });

        // Обработка кликов по зонам
        this.input.on("pointerdown", this.handlePointerDown, this);

        // Таймер для создания объектов
        this.time.addEvent({
            delay: 400,
            callback: this.spawnObject,
            callbackScope: this,
            loop: true,
        });

        this.time.addEvent({
            delay: 500,
            callback: this.spawnObject,
            callbackScope: this,
            loop: true,
        });

        this.time.addEvent({
            delay: 600,
            callback: this.spawnObject,
            callbackScope: this,
            loop: true,
        });

        EventBus.emit("current-scene-ready", this);

        // Подписка на обновление состояния Redux
        store.subscribe(this.updateScoreText);
        store.subscribe(this.updateHealthText);
        this.updateScoreText();
        this.updateHealthText();
    }

    handlePointerDown(pointer: Phaser.Input.Pointer) {
        const { width } = this.scale;
        const zoneWidth = width / 6;
        const clickedZone = Math.floor(pointer.x / zoneWidth);
        this.player.setX(this.zones[clickedZone]);
    }

    spawnObject() {
        const { width, height } = this.scale;
        const zoneWidth = width / 6;
        const randomZone = Math.floor(Math.random() * 6);
        const object = this.physics.add.sprite(
            this.zones[randomZone], // + Math.floor(Math.random() * 20)
            height * 0.2,
            "object"
        );
        object.setVelocityY(300); // Устанавливаем скорость падения объекта
        object.setScale((zoneWidth - 10) / object.width); // масштабирование под размер зоны

        this.physics.add.overlap(
            this.player,
            object,
            () => {
                if (!this.overlappingObjects.has(object)) {
                    // Запускаем таймер задержки для текущего объекта
                    let overlapTimer = this.time.delayedCall(
                        this.damageDelay,
                        () => {
                            // Уменьшаем здоровье только если игрок все еще пересекается с объектом
                            if (this.physics.overlap(this.player, object)) {
                                this.decrementHealth();
                                object.destroy();

                                if (store.getState().game.health === 0) {
                                    this.scene.start("GameOver");
                                    return;
                                }
                            }
                            // Удаляем объект из Map после обработки
                            this.overlappingObjects.delete(object);
                        },
                        [],
                        this
                    );

                    // Добавляем объект и его таймер в Map
                    this.overlappingObjects.set(object, overlapTimer);
                }
            }
            // null,
            // this
        );

        // Проверка, если объект пропущен
        object.setCollideWorldBounds(true);
        object.body.onWorldBounds = true;
        this.physics.world.on("worldbounds", (body: Physics.Arcade.Body) => {
            if (body.gameObject === object && body.blocked.down) {
                object.destroy();
                this.score++;
                this.setLastScore(this.score);
                // this.incrementScore();
            }
        });
    }

    // update() {
    //     // Проверяем каждый пересекающийся объект
    //     this.overlappingObjects.forEach((timer, object) => {
    //         // Если игрок больше не пересекается с объектом
    //         if (!this.physics.overlap(this.player, object)) {
    //             // Останавливаем таймер и удаляем объект из Map
    //             timer.remove(false);
    //             this.overlappingObjects.delete(object);
    //         }
    //     });
    // }

    setLastScore(score: number) {
        store.dispatch(setLastScore(score));
    }

    decrementHealth() {
        store.dispatch(decrementHealth());
    }

    incrementScore() {
        store.dispatch(incrementScore(1));
    }

    decrementScore() {
        store.dispatch(decrementScore(1));
    }

    updateScoreText = () => {
        this.scoreText.setText(
            t("score", {
                score: this.score,
            })
        );
    };

    updateHealthText = () => {
        const state: RootState = store.getState();
        this.healthText.setText(t("health", { health: state.game.health }));
    };
}

