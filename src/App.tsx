import RegisterUserForm from "./components/RegisterUserForm";
import VanillaForm from "./components/VanillaForm";
import ZodForm from "./components/ZodForm";
import ZodFormV2 from "./components/ZodFormV2";

export default function App() {
  return (
    <>
      <VanillaForm />
      <ZodForm />
      <ZodFormV2 />
      <RegisterUserForm />
    </>
  );
}