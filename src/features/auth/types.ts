import { LoginSchema, RegisterSchema } from "./schema";
import { InferType } from "yup";

export type RegisterSchemaType = InferType<typeof RegisterSchema>;
export type LoginSchemaType = InferType<typeof LoginSchema>;
