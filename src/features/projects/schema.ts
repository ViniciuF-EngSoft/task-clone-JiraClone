import { z } from 'zod'

export const createProjectSchema = z.object({
	name: z.string().trim().min(1, "Required"),
	image: z.union([
		z.instanceof(File),
		z.string().transform((value) => value === '' ? undefined : value)
	]),
	workspaceId: z.string()
})

export const updateProjectSchema = z.object({
	name: z.string().trim().min(1, "Required"),
	image: z.union([
		z.instanceof(File),
		z.string().transform((value) => value === '' ? undefined : value)
	])
	.optional()
	
})