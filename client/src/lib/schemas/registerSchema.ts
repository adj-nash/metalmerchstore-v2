import { z } from "zod";

const passwordValidation = new RegExp(/(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/);

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(passwordValidation, { 
        message: "Password must contain 1 lowercase letter, 1 uppercase letter & 1 digit."
    })
});

export type RegisterSchema = z.infer<typeof registerSchema>;