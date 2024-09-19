import WebApp from "@twa-dev/sdk";

export default function getTelegramUserData(): string {
    if (!WebApp || !WebApp.initData) {
        throw new Error("Telegram WebApp недоступен.");
    }

    return WebApp.initData;
}
