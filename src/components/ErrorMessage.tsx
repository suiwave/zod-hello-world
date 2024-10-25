type ErrorMessageProps = {
    errorMessage: string;
}

export const ErrorMessage = ({
    errorMessage,
}: ErrorMessageProps) => {
    return (
        <p className="mt-1 rounded p-1 text-sm text-red-500 bg-red-100">{errorMessage}</p>
    );
};