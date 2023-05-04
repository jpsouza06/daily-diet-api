import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { FetchUserSnacksHistoryUseCase } from '../fetch-user-snacks-history'

export function makeFetchUserSnackHistoryUseCase() {
	const snacksRepository = new PrismaSnacksRepository()
	const fetchUserSnacksHistoryUseCase = new FetchUserSnacksHistoryUseCase(snacksRepository)

	return fetchUserSnacksHistoryUseCase
}