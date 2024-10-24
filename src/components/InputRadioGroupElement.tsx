import { UseFormRegisterReturn } from 'react-hook-form';

type RadioOption = {
    label: string;
    value: string;
}

type RadioGroupProps = {
    label?: string;
    options: RadioOption[];
    registration: UseFormRegisterReturn;
    errorMessage?: string;
}

export const InputRadioGroupElement = ({
    label,
    options,
    registration,
    errorMessage,
}: RadioGroupProps) => {
    return (
        <div>
            {label && <label htmlFor={"birthday"}>{label}</label>}
            <div
                role="radiogroup"
                aria-labelledby={`${registration.name}-label`}
                className="flex gap-4"
            >
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="radio"
                            value={option.value}
                            {...registration}
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
            {errorMessage && (
                <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
            )}
        </div>
    );
};