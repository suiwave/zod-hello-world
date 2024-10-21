import { z } from "zod";

const myMailSchema = z.string().length(5, { message: "Must be exactly 5 characters long" }).email({ message: "Invalid email address" })
const resultMail = myMailSchema.safeParse("12");

// エラーがthrowされる。なんで？
// console.log(resultMail.error);

// エラー情報配列が取得できる
console.log(resultMail.error?.issues);

// issuesと同じ配列。何が違うんだ
// https://www.npmjs.com/package/zod#:~:text=25)%3B-,.superRefine,-The%20.refine%20method
// issueはaddIssueメソッドで追加できそう。主にissueを見るべきか
// throwされるerrorを整形する zod-validation-error もissueを参照してる
console.log(resultMail.error?.errors);

const mySchema = z.string().superRefine((val, ctx) => {
    if (val.length > 3) {
        ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 3,
            type: "array",
            inclusive: true,
            message: "Too many items 😡",
        });
    }

    if (val.length !== new Set(val).size) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `No duplicates allowed.`,
        });
    }
});
const result = mySchema.safeParse("123456");

// addIssueしたものはissuesにしか反映されない？とかも関係なかった。もういっかここらへんで
console.log(result.error?.issues);
console.log(result.error?.errors);
