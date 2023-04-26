import { makeGetSnackUseCase } from '@/use-cases/factories/make-get-snack-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
	const registerParamsSchema = z.object({
		snackId: z.string().uuid()
	})

	const { snackId } = registerParamsSchema.parse(request.params)
	
	const createUseCase = makeGetSnackUseCase()
	
	await createUseCase.execute({
		snackId
	})

	return reply.status(200).send()
}