// register関数の戻り値の型を使用
import { UseFormRegisterReturn } from 'react-hook-form';

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
            {errorMessage && (
                <p className="mt-1 rounded p-1 text-sm text-red-500 bg-red-100">{errorMessage}</p>
            )}
        </div>
    )
}