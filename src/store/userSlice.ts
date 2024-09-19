import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: number | null;
    first_name: string | null;
    last_name: string | null;
    username: string | null;
    language_code: string | null;
    telegram_id: number | null;
}

const initialState: UserState = {
    id: null,
    first_name: null,
    last_name: null,
    username: null,
    language_code: null,
    telegram_id: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserState>) {
            state.id = action.payload.id;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.username = action.payload.username;
            state.language_code = action.payload.language_code;
            state.telegram_id = action.payload.telegram_id;
        },
        clearUser(state) {
            state.id = null;
            state.first_name = null;
            state.last_name = null;
            state.username = null;
            state.language_code = null;
            state.telegram_id = null;
        },
    },
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;
