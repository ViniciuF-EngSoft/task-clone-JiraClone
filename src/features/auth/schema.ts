import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Required'),
})

export const registerSchema = z.object({
    name: z.string().min(8, 'O nome precisa ter no mínimo 8 caracteres'),
    email: z.string().email(),
    password: z.string().min(8, 'Mínimo de 8 caracteres')
})