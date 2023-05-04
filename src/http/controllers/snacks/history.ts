import { makeFetchUserSnackHistoryUseCase } from '@/use-cases/factories/make-fetch-user-snack-history-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
	const historySnacksQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1)
	})

	const { page } = historySnacksQuerySchema.parse(request.query)
	
	const fetchUserSnackHistoryUseCase = makeFetchUserSnackHistoryUseCase()
	
	const {snacks} = await fetchUserSnackHistoryUseCase.execute({
		userId: request.user.sign.sub,
		page
	})

	return reply.status(200).send({
		snacks
	})
}