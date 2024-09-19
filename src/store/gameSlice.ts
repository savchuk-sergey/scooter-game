import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
    user_id: number | null;
    last_score: number;
    best_score: number;
    energy: number;
    max_energy: number;
    health: number;
    game_type: string;
}

const initialState: GameState = {
    user_id: null,
    best_score: 0,
    last_score: 0,
    energy: 6,
    max_energy: 6,
    health: 3,
    game_type: "default",
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setGameData(state, action: PayloadAction<GameState>) {
            state.user_id = action.payload.user_id;
            state.last_score = action.payload.last_score;
            state.best_score = action.payload.best_score;
            state.energy = action.payload.energy;
            state.max_energy = action.payload.max_energy;
            state.health = action.payload.health;
        },
        incrementScore(state, action: PayloadAction<number>) {
            state.last_score += action.payload;
        },
        decrementScore(state, action: PayloadAction<number>) {
            state.last_score -= action.payload;
        },
        decrementEnergy(state) {
            state.energy--;
        },
        setLastScore(state, action: PayloadAction<number>) {
            state.last_score = action.payload;
        },
        incrementEnergy(state) {
            state.energy++;
        },
        decrementHealth(state) {
            state.health--;
        },
        incrementHealth(state) {
            state.health++;
        },
        resetGame(state) {
            state.health = initialState.health;
            state.last_score = initialState.last_score;
        },
        setUser(state, action: PayloadAction<number>) {
            console.log("setUser: " + action.payload);
            state.user_id = action.payload;
        },
    },
});

export const {
    incrementScore,
    decrementScore,
    decrementEnergy,
    decrementHealth,
    resetGame,
    setGameData,
    setUser,
    setLastScore,
} = gameSlice.actions;
export default gameSlice.reducer;
