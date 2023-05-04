import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { UpdateSnackUseCase } from '../update-snack'

export function makeUpdateSnackUseCase() {
	const snacksRepository = new PrismaSnacksRepository()
	const updateSnackUseCase = new UpdateSnackUseCase(snacksRepository)

	return updateSnackUseCase
}