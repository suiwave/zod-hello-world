import RegisterUserForm from "./components/RegisterUserForm";
// import VanillaForm from "./components/VanillaForm";
// import ZodForm from "./components/ZodForm";
// import ZodFormV2 from "./components/ZodFormV2";

export default function App() {
  return (
    <>
      <div className="container w-1/3 ms-auto me-auto">
        <h1 className="font-bold underline">Zod + React-Hook-Form</h1>
        {/* <VanillaForm />
      <ZodForm />
      <ZodFormV2 /> */}
        <RegisterUserForm />
      </div>
    </>
  );
}