import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    name: z.string().min(1, { message: 'Required' }).catch("723"),
    age: z.number().min(10, { message: 'chissasugi' }).catch(723),
}).required();

type Inputs = z.infer<typeof schema>;

/**
 * https://github.com/react-hook-form/resolvers#zod
 * から持ってきたzodとの統合ソース。ジェネリクスとonInvalidを追加している
 * catchされたらonInvalidされないか見てみる。 → onValidが呼ばれた
 * @returns JSX
 */
export default function ZodFormV2() {
    const {
        register,
        handleSubmit,
        getValues, // Formのオブジェクトを返却する関数
        formState: { errors },
    } = useForm<Inputs>({ // ジェネリクスを渡すと、register関数の引数がtypeを参照するようになりちょっと型安全。つけないとerrors.name?.messageがstringにならなかった。なぜ
        resolver: zodResolver(schema),
    });
    const onSubmit: SubmitHandler<Inputs> = data => console.log(555, data);
    const onInvalid: SubmitErrorHandler<Inputs> = data => console.log(666, data, errors, getValues()); // dataにはerrorsが代入される。入力された値は保持されているが、この関数内で直接アクセスできない。getValuesを使う必要がある

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <input {...register('name')} />
            {errors.name?.message && <p>{errors.name?.message}</p>}
            <input type="number" {...register('age', { valueAsNumber: true })} />
            {errors.age?.message && <p>{errors.age?.message}</p>}
            <input type="submit" />
        </form>
    );
};