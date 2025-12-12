"use client";
import { useEffect, useState } from "react";
import { account, ID } from "../../appwrite";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import router from "next/router";
import { redirect } from "next/navigation";
import {
  loginWithEmailAndPassword,
  signUp,
} from "@/lib/actions/appwrite.action";
import Link from "next/link";
import { toast } from "sonner";
import { RegisterForm, RegisterFormValues } from "@/components/RegisterForm";

const SignUp = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const login = async (email: string, password: string) => {
    const loggedIn = await loginWithEmailAndPassword({ email, password });
    if (loggedIn.success) {
      try {
        const currentUser = await account.get();
        setLoggedInUser(currentUser); // Update state
        router.push("/"); // Use client-side navigation
      } catch (e) {
        console.error("Error fetching user after login", e);
      }
    } else {
      console.log("There was an error");
    }
  };

  const register = async (values: RegisterFormValues) => {
    const { email, password, firstName, lastName } = values;
    const signedUp = await signUp({
      email,
      username: `${firstName} ${lastName}`,
      password,
      firstName,
      lastName,
    });
    if (signedUp.success) {
      toast("Account has been created.");
      login(email, password);
      redirect("/");
    } else {
      console.log("There was an error");
      toast("there was an error");
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    redirect("/");
  }

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center gap-[-3] px-4 md:px-0">
      {/* bg-linear-to-r from-[#AC72A1] via-[#FBD9FA] to-[#070E2A] */}
      {/* <Image src="/Rectangle 1.png" alt="football" width={596} height={661} /> */}
      <div className="backdrop-blur-[87.5px] py-10 px-6 md:px-8 bg-[#0F1117] flex flex-col gap-16 drop-shadow-lg rounded-[10px] border-black border-2 font-roboto w-full max-w-md md:max-w-none md:w-auto">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[27px] font-bold">Sign Up</h2>
          <p className="text-[#858EAD]">to continue to DesignFlow</p>
        </div>
        {/* Form */}
        <RegisterForm onRegister={register} />
      </div>
    </div>
  );
};

export default SignUp;
