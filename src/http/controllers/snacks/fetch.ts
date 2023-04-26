import { makeFetchSkaneUseCase } from '@/use-cases/factories/make-fetch-snack-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
	const registerParamsSchema = z.object({
		userId: z.string().uuid(),
		page: z.coerce.number().min(1).default(1)
	})

	const { userId, page } = registerParamsSchema.parse(request.params)
	
	const fetchUseCase = makeFetchSkaneUseCase()
	
	await fetchUseCase.execute({
		userId,
		page
	})

	return reply.status(200).send()
}