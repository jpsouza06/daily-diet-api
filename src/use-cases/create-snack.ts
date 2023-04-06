import { SnacksRepository } from '@/repositories/snacks-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Snack } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateSnackUseCaseRequest {
   name: string;
   description: string;
   dateTime: Date;
   onDiete: boolean;
   userId: string
}

interface CreateSnackUseCaseResponse {
   snack: Snack;
}

export class CreateSnackUseCase {
	constructor(
      private usersRepository: UsersRepository,
      private snacksRepository: SnacksRepository
	) {}

	async execute({
		name,
		description,
		dateTime,
		onDiete,
		userId
	}: CreateSnackUseCaseRequest): Promise<CreateSnackUseCaseResponse> {
		const user = await this.usersRepository.findById(userId)

		if (!user) {
			throw new ResourceNotFoundError()
		}

		const snack = await this.snacksRepository.create({
			name,
			description,
			date_time: dateTime,
			on_diete: onDiete,
			user_id: userId
		})

		return {
			snack,
		}
	}
}