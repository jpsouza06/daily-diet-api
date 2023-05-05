import { makeUpdateSnackUseCase } from '@/use-cases/factories/make-update-snack-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateSnackParamsSchema = z.object({
		snackId: z.string().uuid()
	})
	const updateSnackBodySchema = z.object({
		name: z.string(),
		description: z.string(),
		dateTime: z.coerce.date(),
		onDiet: z.boolean().default(false),
	})

	const { snackId } = updateSnackParamsSchema.parse(request.params)
	const { name, description, dateTime, onDiet } = updateSnackBodySchema.parse(request.body)
	
	const updateSnackUseCase = makeUpdateSnackUseCase()
	
	const { snack } = await updateSnackUseCase.execute({
		snackId,
		name,
		description, 
		dateTime, 
		onDiet,
	})

	return reply.status(201).send({
		snack
	})
}