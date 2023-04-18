import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
	const snacksRepository = new PrismaSnacksRepository()
	const getUserMetricsUseCase = new GetUserMetricsUseCase(snacksRepository)

	return getUserMetricsUseCase 
}