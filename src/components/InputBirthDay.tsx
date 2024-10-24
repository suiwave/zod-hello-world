// register関数の戻り値の型を使用
import { UseFormRegisterReturn } from 'react-hook-form';

type InputElementProps = {
    label: string;
    errorMessage?: string;
    registrationYear: UseFormRegisterReturn;  // ...register("birthday.year")の結果
    registrationMonth: UseFormRegisterReturn;  // ...register("birthday.month")の結果
    registrationDay: UseFormRegisterReturn;  // ...register("birthday.day")の結果
}

export default function InputBirthDay({
    label,
    errorMessage,
    registrationYear,
    registrationMonth,
    registrationDay,
}: InputElementProps) {
    return (
        <>
            {label && <label htmlFor={"birthday"}>{label}</label>}
            <div role="group" id={"birthday"}>
                <select
                    {...registrationYear}
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
                    {...registrationMonth}
                >
                    <option value="">月</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <select
                    {...registrationDay}
                >
                    <option value="">日</option>
                    {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                {errorMessage && (
                    <p className="mt-1 rounded p-1 text-sm text-red-500 bg-red-100">{errorMessage}</p>
                )}
            </div>
        </>
    )
}