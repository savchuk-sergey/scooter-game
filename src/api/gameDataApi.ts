import axios, { AxiosResponse } from "axios";

interface GameData {
    user_id: number | null;
    last_score: number;
    best_score: number;
    energy: number;
    max_energy: number;
    health: number;
    game_type: string;
    health: number;
}

// Базовый URL вашего API
const API_BASE_URL = "http://localhost:8080"; // Замените на ваш фактический URL

/**
 * Получает данные игры для пользователя по ID.
 * @param userId - Идентификатор пользователя.
 * @returns Обещание с объектом игры.
 */
async function getGame(userId: number): Promise<GameData[]> {
    try {
        const response: AxiosResponse<GameData[]> = await axios.get<GameData[]>(
            `${API_BASE_URL}/games/${userId}`
        );
        return response.data;
    } catch (error) {
        // Обработка ошибок
        console.error("Ошибка при получении данных игры:", error);
        throw error;
    }
}

/**
 * Обновляет данные игры для пользователя.
 * @param userId - Идентификатор пользователя.
 * @param gameData - Объект с обновленными данными игры.
 * @returns Обещание с обновленным объектом игры.
 */
async function putGame(gameData: GameData): Promise<GameData> {
    try {
        const response: AxiosResponse<GameData> = await axios.put<GameData>(
            `${API_BASE_URL}/games`,
            gameData
        );
        return response.data;
    } catch (error) {
        // Обработка ошибок
        console.error("Ошибка при обновлении данных игры:", error);
        throw error;
    }
}

export { getGame, putGame };
