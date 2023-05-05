import { makeDeleteSnackUseCase } from '@/use-cases/factories/make-delete-snack-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deleteSnack(request: FastifyRequest, reply: FastifyReply) {
	const deleteSnackParamsSchema = z.object({
		snackId: z.string().uuid()
	})

	const { snackId } = deleteSnackParamsSchema.parse(request.params)
	
	const deleteSnackUseCase = makeDeleteSnackUseCase()
	
	const { snack } = await deleteSnackUseCase.execute({
		snackId,
	})

	return reply.status(200).send({
		snack
	})
}