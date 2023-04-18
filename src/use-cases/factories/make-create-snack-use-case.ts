import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateSnackUseCase } from '../create-snack'

export function makeCreateSnackUseCase() {
	const snacksRepository = new PrismaSnacksRepository()
	const usersRepository = new PrismaUsersRepository()
	const createSnackUseCase = new CreateSnackUseCase(usersRepository, snacksRepository)

	return createSnackUseCase
}