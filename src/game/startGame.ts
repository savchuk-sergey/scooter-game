import { Scene } from "phaser";
import store from "../store/store";
import { resetGame } from "../store/gameSlice";

export function startGame(scene: Scene) {
    store.dispatch(resetGame());
    scene.scene.start("Game");
}
