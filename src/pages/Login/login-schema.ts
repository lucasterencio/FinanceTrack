import z from "zod";

export const schema = z.object({
    email: z.email("Insira um email válido").nonempty(),
    password: z.string("Insira sua senha")
})


export type LoginData = z.infer<typeof schema>