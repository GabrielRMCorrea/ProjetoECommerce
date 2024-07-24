import { z } from 'zod'

const userCreateSchema = z.object({
    email: z.string().email(),
    password: z.string().trim().min(6)
})

const userUpdatechema = z.object({
    email: z.string().email().optional(),
    password: z.string().trim().min(6).optional()
})

export default {
    userCreateSchema,
    userUpdatechema
}
