import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { User, user } from "../schemas"
import InputElement from './InputElement';
import InputBirthDay from './InputBirthDay';
import { InputRadioGroupElement } from './InputRadioGroupElement';

export default function RegisterUserForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<User>({ // ジェネリクスを渡すと、register関数の引数がtypeを参照するようになりちょっと型安全。つけないとerrors.name?.messageがstringにならなかった。なぜ
        resolver: zodResolver(user),
    });

    // valid時はparse後の値がgetValuesで取得できる。例えばbirthdayはnumber
    const onSubmit: SubmitHandler<User> = data => console.log(data);

    // zodで定義したkeyが存在しない場合はinvalid
    // invalid時はparse前の値がgetValuesで取得できる。例えばbirthdayはstring
    const onInvalid: SubmitErrorHandler<User> = () => console.log('errors', errors, getValues());

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <div className='grid grid-cols-1 gap-2'>
                    <InputElement registration={register('name')} label={'ユーザー名'} errorMessage={errors.name?.message} />
                    <InputRadioGroupElement label='性別' errorMessage={errors.gender?.message} registration={register('gender')} options={[]} />
                    <InputElement registration={register('email')} label={'メールアドレス'} errorMessage={errors.email?.message} />
                    <InputElement type='password' registration={register('password')} label={'パスワード'} errorMessage={errors.password?.message} />
                    <InputElement type='password' registration={register('confirmPassword')} label={'パスワード（確認用）'} errorMessage={errors.confirmPassword?.message} />
                    <InputBirthDay label='生年月日'
                        registrationYear={register("birthday.year")}
                        registrationMonth={register("birthday.month")}
                        registrationDay={register("birthday.day")}
                        errorMessage={errors.birthday?.root?.message}
                    />
                    <button className='rounded-full bg-slate-400 p-2 hover:opacity-70' type="submit">submit</button>
                </div>
            </form>
        </>
    )
}