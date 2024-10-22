import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    name: z.string().email({ message: 'mail ni shitene' }).min(10, { message: 'Required' }),
    age: z.number().min(10, { message: 'chissasugi' }),
});

type Inputs = z.infer<typeof schema>;

export default function ZodForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ // ジェネリクスを渡すと、register関数の引数がtypeを参照するようになりちょっと型安全
        resolver: zodResolver(schema),
    });
    const onSubmit: SubmitHandler<Inputs> = data => console.log(333, data);
    const onInvalid: SubmitErrorHandler<Inputs> = () => console.log(444, errors);

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