import { SnacksRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteSnackUseCaseRequest {
   snackId: string;
}

interface DeleteSnackUseCaseResponse {
   snack: Snack
}

export class DeleteSnackUseCase {
	constructor(
      private snacksRepository: SnacksRepository
	) {}

	async execute({
		snackId,
	}: DeleteSnackUseCaseRequest): Promise<DeleteSnackUseCaseResponse> {
		const snack = await this.snacksRepository.delete(snackId)

		if(!snack) {
			throw new ResourceNotFoundError()
		}
      
		return {
			snack,
		}
	}
}