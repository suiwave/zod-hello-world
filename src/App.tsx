import RegisterUserForm from "./components/RegisterUserForm";
// import VanillaForm from "./components/VanillaForm";
// import ZodForm from "./components/ZodForm";
// import ZodFormV2 from "./components/ZodFormV2";

export default function App() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen p-12">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="font-bold underline mb-4 text-lg">React-Hook-Form + Zod</h1>
          {/* <VanillaForm />
              <ZodForm />
              <ZodFormV2 /> */}
          <RegisterUserForm />
        </div>
      </div>
    </>
  );
}