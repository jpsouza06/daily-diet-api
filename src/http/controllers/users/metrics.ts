import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
	const metricsSnacksQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1)
	})

	const { page } = metricsSnacksQuerySchema.parse(request.query)
	
	const getUserMetricsUseCase = makeGetUserMetricsUseCase()
	
	const metrics = await getUserMetricsUseCase.execute({
		userId: request.user.sign.sub,
		page
	})

	return reply.status(200).send({
		metrics
	})
}