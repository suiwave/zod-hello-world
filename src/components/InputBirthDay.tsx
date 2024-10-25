// register関数の戻り値の型を使用
import { UseFormRegisterReturn } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

type InputElementProps = {
    label: string;
    errorMessageBirthDay?: string;
    errorMessageBirthDayField?: string;
    registrationYear: UseFormRegisterReturn;  // ...register("birthday.year")の結果
    registrationMonth: UseFormRegisterReturn;  // ...register("birthday.month")の結果
    registrationDay: UseFormRegisterReturn;  // ...register("birthday.day")の結果
}

export default function InputBirthDay({
    label,
    errorMessageBirthDay,
    errorMessageBirthDayField,
    registrationYear,
    registrationMonth,
    registrationDay,
}: InputElementProps) {
    return (
        <>
            {label && <label htmlFor={"birthday"}>{label}</label>}
            <div role="group" id={"birthday"} className="flex gap-2 items-center">
                <select
                    {...registrationYear}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">日</option>
                    {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>
            {errorMessageBirthDay && <ErrorMessage errorMessage={errorMessageBirthDay} />}
            {errorMessageBirthDayField && <ErrorMessage errorMessage={errorMessageBirthDayField} />}
        </>
    )
}