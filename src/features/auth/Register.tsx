"use client";

import React from "react";
import sideImage from "../../../public/pexels-iriser-1381679.jpg";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import { RegisterSchemaType } from "./types";
import { useRegisterMutation } from "./slice";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { NetworkError } from "@/utils/types";

const Register = () => {
  const router = useRouter();

  const [register, result] = useRegisterMutation();
  const handleSubmit = async (values: RegisterSchemaType) => {
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
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-secondary underline">Log in</span>
          </Link>
        </p>

        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Register;
