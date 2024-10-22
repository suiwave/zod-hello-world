import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

type Inputs = {
    example: string,
    exampleRequired: string,
};

export default function VanillaForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(111, data);
    const onInvalid: SubmitErrorHandler<Inputs> = data => console.log(222, data);

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        /* "handleSubmit" は第2引数に失敗時に実行される関数を受け取る */
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            {/* register your input into the hook by invoking the "register" function */}
            {/* register関数はこんなobjを返却する {name: 'example', onChange: ƒ, onBlur: ƒ, ref: ƒ} */}
            {/* そのまま...で展開することで、input JSXのプロパティになる仕組み */}
            {/* https://koshiro54600.hatenablog.com/entry/2022/10/03/130115 */}
            <input defaultValue="test" {...register("example")} />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("exampleRequired", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
        </form>
    );
}