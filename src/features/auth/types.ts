import { JwtPayload } from "jwt-decode";
import { LoginSchema, RegisterSchema } from "./schema";
import { InferType } from "yup";

export type RegisterSchemaType = InferType<typeof RegisterSchema>;
export type LoginSchemaType = InferType<typeof LoginSchema>;

export type User = {
  id: string;
  email: string;
  name: string;
};
export interface LoginResponse {
  access_token: string;
}
export interface RegisterResponse {
  access_token: string;
  user: User;
}

export interface DecodedToken extends JwtPayload {
  sub: string;
  firstName: string;
  lastName: string;
  email: string;
}
