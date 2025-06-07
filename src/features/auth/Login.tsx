"use client";

import React from "react";
import sideImage from "../../../public/pexels-iriser-1381679.jpg";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "./slice";
import { LoginSchemaType } from "./types";
import { NetworkError } from "@/utils/types";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();

  const [register, result] = useLoginMutation();
  const handleSubmit = async (values: LoginSchemaType) => {
    try {
      await register(values).unwrap();
      router.replace("/home");
    } catch (error) {
      toast.error((error as NetworkError).data.message, {
        position: "top-right",
      });
    }
  };
  return (
    <div className="min-h-screen p-8 flex items-center justify-center space-x-8">
      <div className="w-1/2 h-[90vh] rounded-xl overflow-hidden">
        <Image className="h-full w-full object-cover" alt="l" src={sideImage} />
      </div>
      <div className="w-1/2 space-y-8 px-8">
        <h3 className="text-4xl font-semibold text-white">Create an account</h3>
        <p className="text-gray-4 00">
          Don't have an account?{" "}
          <Link href="/register">
            <span className="text-secondary underline">Register</span>
          </Link>
        </p>

        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Login;
