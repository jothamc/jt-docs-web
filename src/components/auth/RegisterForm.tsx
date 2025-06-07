import { RegisterSchema } from "@/features/auth/schema";
import { Formik } from "formik";
import React from "react";
import FormInput from "../Form/FormInput";
import { RegisterSchemaType } from "@/features/auth/types";

interface Props {
  onSubmit: (values: RegisterSchemaType) => void;
}
const RegisterForm = ({ onSubmit }: Props) => {
  return (
    <Formik
      validationSchema={RegisterSchema}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        "confirm-password": "",
        agreeToTerms: false,
      }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid, isSubmitting, values, setFieldValue }) => (
        <form onSubmit={handleSubmit} className="space-y-6 ">
          <div className="flex items-start justify-between space-x-4">
            <FormInput name="firstName" placeholder="First name" />
            <FormInput name="lastName" placeholder="Last name" />
          </div>
          <FormInput name="email" placeholder="Email" />
          <FormInput
            name="password"
            minLength={8}
            pattern="^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
            placeholder="Enter your password"
            type="password"
          />
          <FormInput
            name="confirm-password"
            placeholder="Confirm your password"
            type="password"
          />
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              name="agreeToTerms"
              onChange={(e) => {
                setFieldValue("agreeToTerms", e.target.checked);
              }}
              checked={values.agreeToTerms}
              className="h-5 w-5"
            />
            <span>
              I agree to the{" "}
              <span className="text-secondary underline">
                Terms & Conditions
              </span>
            </span>
          </div>

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
