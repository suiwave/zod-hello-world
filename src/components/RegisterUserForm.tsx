import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { User, user } from "../schemas"
import InputElement from './InputElement';

export default function RegisterUserForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>({ // ジェネリクスを渡すと、register関数の引数がtypeを参照するようになりちょっと型安全。つけないとerrors.name?.messageがstringにならなかった。なぜ
        resolver: zodResolver(user),
    });

    const onSubmit: SubmitHandler<User> = data => console.log(data);
    const onInvalid: SubmitErrorHandler<User> = () => console.log('errors', errors); // zodで定義したkeyが存在しない場合はinvalid

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <div className='grid grid-cols-1 gap-2'>
                    <InputElement registration={register('name')} label={'ユーザー名'} errorMessage={errors.name?.message} />
                    <InputElement registration={register('email')} label={'メールアドレス'} errorMessage={errors.email?.message} />
                    <InputElement type='password' registration={register('password')} label={'パスワード'} errorMessage={errors.password?.message} />
                    <InputElement type='password' registration={register('confirmPassword')} label={'パスワード（確認用）'} errorMessage={errors.confirmPassword?.message} />
                    <div>
                        <select
                            {...register("birthday.year", {
                                valueAsNumber: true  // 文字列から数値に変換
                            })}
                        >
                            <option value="">年</option>
                            {Array.from({ length: 100 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                        <select
                            {...register("birthday.month", {
                                valueAsNumber: true
                            })}
                        >
                            <option value="">月</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <select
                            {...register("birthday.day", {
                                valueAsNumber: true
                            })}
                        >
                            <option value="">日</option>
                            {Array.from({ length: 31 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        {errors.birthday?.root?.message && (
                            <p className="mt-1 rounded p-1 text-sm text-red-500 bg-red-100">{errors.birthday?.root?.message}</p>
                        )}
                    </div>
                    <button className='rounded-full bg-slate-400 p-2 hover:opacity-70' type="submit">submit</button>
                </div>
            </form>
        </>
    )
}