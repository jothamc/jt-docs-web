import { LoginSchema } from "@/features/auth/schema";
import { Formik } from "formik";
import React from "react";
import FormInput from "../Form/FormInput";
import { LoginSchemaType } from "@/features/auth/types";

interface Props {
  onSubmit: (values: LoginSchemaType) => void;
}
const RegisterForm = ({ onSubmit }: Props) => {
  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid, isSubmitting, values, setFieldValue }) => (
        <form onSubmit={handleSubmit} className="space-y-6 ">
          <FormInput name="email" placeholder="Email" />
          <FormInput
            name="password"
            minLength={8}
            pattern="^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
            placeholder="Enter your password"
            type="password"
          />

          <div>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`bg-primary w-full text-white rounded-lg p-4 ${
                !isValid || isSubmitting
                  ? "opacity-50"
                  : "cursor-pointer hover:bg-purple-900"
              }`}
            >
              Create account
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
