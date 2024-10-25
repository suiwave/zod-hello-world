// register関数の戻り値の型を使用
import { UseFormRegisterReturn } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

type InputElementProps = {
    label: string;
    type?: string;
    errorMessage?: string;
    registration: UseFormRegisterReturn;  // ...register("xxx")の結果
}

export default function InputElement({
    label,
    type = "text",
    errorMessage,
    registration
}: InputElementProps) {
    return (
        <div>
            {label && <label htmlFor={registration.name}>{label}</label>}
            <input
                id={registration.name}
                type={type}
                className={`w-full rounded border p-2 ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
                {...registration}
            />
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        </div>
    )
}