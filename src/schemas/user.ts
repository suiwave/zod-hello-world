import { z } from "zod";

export const user = z.object({
    name: z.string().min(1, "ユーザー名は必須です"),
    email: z.string().email("メールアドレス形式で入力してください"),
    password: z.string()
        .min(8, "パスワードは8文字以上である必要があります")
        .max(100, "パスワードは100文字以下である必要があります")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
            "パスワードには小文字、大文字、数字が少なくとも1つずつ含まれている必要があります"
        ),
    confirmPassword: z.string(),
    birthday: z.object({
        year: z.number(),
        month: z.number().min(1).max(12),
        day: z.number().min(1).max(31)
    }).refine(
        (data) => {
            // 存在しない日付の場合、存在する日付に変換されて返却される
            // new Date(1990, 0, 32) === new Date(1990, 1, 1)
            const date = new Date(data.year, data.month - 1, data.day);
            return (
                date.getFullYear() === data.year &&
                date.getMonth() === data.month - 1 &&
                date.getDate() === data.day
            );
        },
        {
            message: "存在しない日付です"
        }
    ),
    // job: z.string().catch(""),
    // hobby: z.string().catch(""),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "入力されたパスワードと確認用パスワードが一致していません",
        path: ["confirmPassword"],
    });;

export type User = z.infer<typeof user>;