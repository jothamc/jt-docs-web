import { useField } from "formik";
import React from "react";

type Props = {
  label?: string;
  name: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const FormInput = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-full">
      {props.label && <label>{props.label}</label>}
      <input
        {...props}
        {...field}
        className="px-2 py-4 text-white text-lg focus:outline-2 focus:outline-accent w-full block bg-fade rounded-md"
      />
      {meta.touched && meta.error && <span className="text-red-400 text-sm">{meta.error}</span>}
    </div>
  );
};

export default FormInput;
