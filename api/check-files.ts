import { readdirSync } from "fs";
import { join } from "path";
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse): void {
    const localesPath = join(__dirname, "../../locales");

    try {
        // Читаем содержимое директории locales
        const files: string[] = readdirSync(localesPath);

        // Успешный ответ с массивом файлов
        res.status(200).json({
            success: true,
            files,
        });
    } catch (error) {
        // Логируем ошибку и отправляем сообщение об ошибке
        console.error("Error reading locales directory:", error);

        res.status(500).json({
            success: false,
            error: (error as Error).message,
        });
    }
}
