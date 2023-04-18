import { makeCreateSnackUseCase } from '@/use-cases/factories/make-create-snack-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const creatCheckInParamsSchema = z.object({
		userId: z.string().uuid()
	})

	const registerBodySchema = z.object({
		name: z.string(),
		description: z.string(),
		dateTime: z.date(),
		onDiet: z.boolean().default(false),
	})

	const { userId } = creatCheckInParamsSchema.parse(request.params)
	const { name, description, dateTime, onDiet } = registerBodySchema.parse(request.body)


	const createUseCase = makeCreateSnackUseCase()
      
	await createUseCase.execute({
		name,
		description, 
		dateTime, 
		onDiet,
		userId
	})

	return reply.status(201).send()
}