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

// https://www.npmjs.com/package/zod#default
// defaultはundefinedをパースしてくれる
// nullやinvalidな値はerrorになる
const stringWithDefault = z.string().default("tuna");

console.log(12, stringWithDefault.safeParse("123456"));
// 12 { success: true, data: '123456' }

console.log(1212, stringWithDefault.safeParse(undefined));
// 1212 { success: true, data: 'tuna' }

console.log(121212, stringWithDefault.safeParse(12345));
// 121212 { success: false, error: [Getter] }

console.log(12121212, stringWithDefault.safeParse(null));
// 12121212 { success: false, error: [Getter] }

console.log(1212121212, stringWithDefault.safeParse(NaN));
// 1212121212 { success: false, error: [Getter] }

// https://www.npmjs.com/package/zod#catch
// catchはundefined、nullやinvalidな値をパースしてくれる
const numberWithCatch = z.number().catch(42);
console.log(34, numberWithCatch.safeParse(12345));
// 34 { success: true, data: 12345 }

console.log(3434, numberWithCatch.safeParse(undefined));
// 3434 { success: true, data: 42 }

console.log(343434, numberWithCatch.safeParse("123456"));
// 343434 { success: true, data: 42 }

console.log(34343434, numberWithCatch.safeParse(null));
// 34343434 { success: true, data: 42 }

console.log(3434343434, numberWithCatch.safeParse(NaN));
// 3434343434 { success: true, data: 42 }
