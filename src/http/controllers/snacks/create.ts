import { makeCreateSnackUseCase } from '@/use-cases/factories/make-create-snack-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createSnackBodySchema = z.object({
		name: z.string(),
		description: z.string(),
		dateTime: z.coerce.date(),
		onDiet: z.boolean().default(false),
	})
	const { name, description, dateTime, onDiet } = createSnackBodySchema.parse(request.body)
	
	const createUseCase = makeCreateSnackUseCase()
	
	await createUseCase.execute({
		name,
		description, 
		dateTime, 
		onDiet,
		userId: request.user.sign.sub
	})

	return reply.status(201).send()
}