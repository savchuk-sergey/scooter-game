import i18n, { TOptions } from "i18next";

export function t(key: string | string[], options?: TOptions): string {
    return i18n.t(key, options);
}
