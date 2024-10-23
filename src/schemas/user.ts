import { z } from "zod";

export const user = z.object({
    name: z.string().min(1, "ユーザー名は必須です"),
    email: z.string().email("メールアドレス形式で入力してください"),
    // password: z.string()
    //     .min(8, "パスワードは8文字以上である必要があります")
    //     .max(100, "パスワードは100文字以下である必要があります")
    //     .regex(
    //         /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]+$/,
    //         "パスワードには小文字と大文字が少なくとも1つずつ含まれている必要があります"
    //     ),
    // confirmPassword: z.string(),
    // birthday: z.string().date(),
    // job: z.string().catch(""),
    // hobby: z.string().catch(""),
})
// .refine((data) => data.password === data.confirmPassword, {
//     message: "入力されたパスワードと確認用パスワードが一致していません",
//     path: ["confirmPassword"],
// });;

export type User = z.infer<typeof user>;