import { SnacksRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetSnackUseCaseRequest {
   snackId: string
}

interface GetSnackUseCaseResponse {
   snack: Snack
}

export class GetSnackUseCase {
	constructor(
      private snacksRepository: SnacksRepository
	) {}

	async execute({
		snackId,
	}: GetSnackUseCaseRequest): Promise<GetSnackUseCaseResponse> {
		const snack = await this.snacksRepository.findById(snackId)

		if(!snack) {
			throw new ResourceNotFoundError()
		}

		return {
			snack,
		}
	}
}