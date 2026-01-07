import z from "zod";

export const schema = z
  .object({
    email: z.email("Insira um email válido"),

    password: z
      .string()
      .min(6, "Digite uma senha com no mínimo 6 caracteres")
      .refine((val) => /[A-Z]/.test(val), {
        message: "A senha deve ter pelo menos uma letra maiúscula",
      }),

    name: z.string().min(3, "Insira pelo menos 3 caracter"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não combinam",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof schema>;
