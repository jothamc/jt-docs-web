import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be up to 8 characters"),
});

const RegisterSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be up to 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be up to 2 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be up to 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  "confirm-password": Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Password confirmation is required"),
  agreeToTerms: Yup.boolean().required().oneOf([true]),
});

export { LoginSchema, RegisterSchema };
