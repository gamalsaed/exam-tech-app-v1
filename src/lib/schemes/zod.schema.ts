import z from "zod";

const confirmPasswordError = {
  message: "Password dosen't match",
  path: ["rePassword"],
};

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Your email is required" })
    .email({ message: "Email is not valid email" }),
  password: z.string().min(3, { message: "Your password is required" }),
});

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email!" }),
    firstName: z.string().min(3, { message: "at least 3 chars!" }),
    lastName: z.string().min(3, { message: "at least 3 chars!" }),
    password: z
      .string()
      .min(8, { message: "Password should be at least 8 chars!" })
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>_\-]/,
        "Password must contain at least one special character"
      ),
    phone: z.string().min(13, { message: "Invalid phone number!" }),
    rePassword: z.string(),
    username: z.string().min(3, { message: "Username is required!" }),
  })
  .refine((data) => data.password === data.rePassword, confirmPasswordError);

export const userInfoSchema = signUpSchema.omit({
  password: true,
  rePassword: true,
});

export const changePasswordSchema = signUpSchema
  .pick({ password: true, rePassword: true })
  .extend({
    oldPassword: z.string().min(8, { message: "Incorrect Password" }),
  })
  .refine((data) => data.password === data.rePassword, confirmPasswordError);

export const emailSchema = signUpSchema.pick({ email: true });

export const resetCodeSchema = z.object({
  code: z
    .string()
    .min(6, { message: "invalid code" })
    .max(6, { message: "invalid code" }),
});

export const newPasswordAuthSchema = signUpSchema
  .pick({
    password: true,
    rePassword: true,
    email: true,
  })
  .refine((data) => data.password === data.rePassword, confirmPasswordError);
