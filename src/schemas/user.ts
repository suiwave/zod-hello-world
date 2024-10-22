import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(1).catch("名無しさん"),
    email: z.string().email({ message: "" }),
    password: z.string().regex(/a/),
    confirmPassword: z.string().email(),
    birthday: z.string(),
    job: z.string(),
    hobby: z.string(),
});