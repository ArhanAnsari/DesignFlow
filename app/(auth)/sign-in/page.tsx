"use client";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/actions/appwrite.action";
import { toast } from "sonner";
import { LoginForm, LoginFormValues } from "@/components/LoginForm";

const LoginPage = () => {
  const router = useRouter();

  const logIn = async (values: LoginFormValues) => {
    const { email, password } = values;
    const result = await createSession({ email, password });
    if (result.success) {
      redirect("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="  w-screen h-screen flex flex-row items-center justify-center gap-[-3] font-roboto">
      <div className="py-10 px-8 bg-[#0F1117] rounded-[10px] flex flex-col gap-5 drop-shadow-lg border-black border-2 ">
        <div className="flex flex-col gap-2">
          <h1 className="text-[27px] font-bolf">Sign In to DesignFlow</h1>
          <p>Welcome Back! Sign in to DesignFlow to continue.</p>
        </div>
        <LoginForm onLogin={logIn} />
      </div>
    </div>
  );
};

export default LoginPage;
