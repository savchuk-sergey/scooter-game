import { useEffect, useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { Provider } from "react-redux";
import store from "./store/store";
import eruda from "eruda";
import parseTelegramInitData from "./telegram/parser";
import getTelegramUserData from "./telegram/telegramData";
import WebApp from "@twa-dev/sdk";
import { putUser } from "./api/userApi";
import { setUserData } from "./store/userSlice";
import { getGame, putGame } from "./api/gameDataApi";
import { setGameData, setUser } from "./store/gameSlice";

function App() {
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current) return;

        effectRan.current = true;

        eruda.init();
        WebApp.ready();
        try {
            const user = mapUserTelegramToUserApi(
                parseTelegramInitData(getTelegramUserData()).user
            );
            // store.dispatch(setUser(user.id));
            putUser(user).then((userData) => {
                if (!userData.id) {
                    throw new Error("Telegram user id is null");
                }
                getGame(userData.id)
                    .then((gameData) => {
                        store.dispatch(setGameData(gameData[0]));
                    })
                    .catch((err) => {
                        console.error(err);
                        putGame(store.getState().game);
                    })
                    .finally(() => {
                        if (!userData.id) {
                            throw new Error("Telegram user id is null");
                        }
                        store.dispatch(setUser(userData.id));
                    });
            });

            store.dispatch(setUserData(user));
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <Provider store={store}>
            <div id="app">
                <PhaserGame ref={phaserRef} />
            </div>
        </Provider>
    );
}

interface UserTelegram {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    allows_write_to_pm: boolean;
}

interface UserApi {
    id: number | null; // ID в UserApi будет пустым или null
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    telegram_id: number; // Поле telegram_id получает значение из id UserTelegram
}

function mapUserTelegramToUserApi(userTelegram: UserTelegram): UserApi {
    return {
        id: null, // Поле id оставляем пустым
        first_name: userTelegram.first_name,
        last_name: userTelegram.last_name,
        username: userTelegram.username,
        language_code: userTelegram.language_code,
        telegram_id: userTelegram.id, // Переносим id из UserTelegram в telegram_id
    };
}

export default App;

