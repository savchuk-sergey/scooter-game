import axios, { AxiosResponse } from "axios";

interface User {
    id: number | null;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    telegram_id: number;
}

// Базовый URL вашего API
const API_BASE_URL = "http://localhost:8080"; // Замените на ваш фактический URL

/**
 * Получает данные пользователя по ID.
 * @param userId - Идентификатор пользователя.
 * @returns Обещание с объектом пользователя.
 */
async function getUser(userId: number): Promise<User> {
    try {
        const response: AxiosResponse<User> = await axios.get<User>(
            `${API_BASE_URL}/users/${userId}`
        );
        return response.data;
    } catch (error) {
        // Обработка ошибок
        console.error("Ошибка при получении данных пользователя:", error);
        throw error;
    }
}

/**
 * Обновляет данные пользователя.
 * @param userId - Идентификатор пользователя.
 * @param userData - Объект с обновленными данными пользователя.
 * @returns Обещание с обновленным объектом пользователя.
 */
async function putUser(userData: User): Promise<User> {
    try {
        const response: AxiosResponse<User> = await axios.put<User>(
            `${API_BASE_URL}/users`,
            userData
        );
        return response.data;
    } catch (error) {
        // Обработка ошибок
        console.error("Ошибка при обновлении данных пользователя:", error);
        throw error;
    }
}

export { getUser, putUser };
