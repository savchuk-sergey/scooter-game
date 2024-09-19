interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    allows_write_to_pm: boolean;
}

interface TelegramData {
    user: User;
    chat_instance: string;
    chat_type: string;
    auth_date: number;
    hash: string;
}

export default function parseTelegramInitData(
    dataString: string
): TelegramData {
    // Декодирование URL-кодировки
    const decodedString = decodeURIComponent(dataString);

    // Создание объекта URLSearchParams
    const params = new URLSearchParams(decodedString);

    // Извлечение данных пользователя в виде JSON-строки
    const userJson = params.get("user");

    if (!userJson) {
        throw new Error("User data not found in the input string.");
    }

    // Парсинг JSON-строки в объект
    const userObject: User = JSON.parse(userJson);

    // Извлечение других параметров
    const chatInstance = params.get("chat_instance");
    const chatType = params.get("chat_type");
    const authDate = params.get("auth_date");
    const hash = params.get("hash");

    if (!chatInstance || !chatType || !authDate || !hash) {
        throw new Error(
            "Some required parameters are missing in the input string."
        );
    }

    const parsedData: TelegramData = {
        user: userObject,
        chat_instance: chatInstance,
        chat_type: chatType,
        auth_date: parseInt(authDate, 10),
        hash: hash,
    };

    return parsedData;
}
