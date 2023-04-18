import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { DeleteSnackUseCase } from '../delete-snack'

export function makeDeleteSkaneUseCase() {
	const snacksRepository = new PrismaSnacksRepository()
	const deleteSnackUseCase = new DeleteSnackUseCase(snacksRepository)

	return deleteSnackUseCase
}