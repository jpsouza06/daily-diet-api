import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { GetSnackUseCase } from '../get-snack'

export function makeGetSnackUseCase() {
	const snacksRepository = new PrismaSnacksRepository()
	const getSnackUseCase = new GetSnackUseCase(snacksRepository)

	return getSnackUseCase
}