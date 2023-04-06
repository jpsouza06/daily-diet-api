import { SnacksRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateSnackUseCaseRequest {
   snackId: string;
   name: string;
   description: string;
   dateTime: Date;
   onDiete: boolean;
}

interface UpdateSnackUseCaseResponse {
   snack: Snack;
}

export class UpdateSnackUseCase {
	constructor(
      private snacksRepository: SnacksRepository
	) {}

	async execute({
		snackId,
		name,
		description,
		dateTime,
		onDiete,
	}: UpdateSnackUseCaseRequest): Promise<UpdateSnackUseCaseResponse> {
		let snack = await this.snacksRepository.findById(snackId)

		if(!snack) {
			throw new ResourceNotFoundError()
		}

		snack = {
			...snack,
			name,
			description,
			date_time: dateTime,
			on_diete: onDiete
		}

		await this.snacksRepository.save(snack)

		return {
			snack,
		}
	}
}