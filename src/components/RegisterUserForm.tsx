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
    const onInvalid: SubmitErrorHandler<User> = () => console.log(errors);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <div className='grid grid-cols-1'>
                    <InputElement registration={register('name')} label={'ユーザー名'} errorMessage={errors.name?.message} />
                    <InputElement registration={register('email')} label={'メールアドレス'} errorMessage={errors.email?.message} />
                    <input type="submit" />
                </div>
            </form>
        </>
    )
}