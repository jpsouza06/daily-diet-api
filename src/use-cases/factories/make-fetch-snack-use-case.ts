import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { FetchSnacksUseCase } from '../fetch-snacks'

export function makeFetchSkaneUseCase() {
	const snacksRepository = new PrismaSnacksRepository()
	const fetchSnackUseCase = new FetchSnacksUseCase(snacksRepository)

	return fetchSnackUseCase
}