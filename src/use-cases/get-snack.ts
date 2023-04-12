import { SnacksRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetSnacksUseCaseRequest {
   snackId: string
}

interface GetSnacksUseCaseResponse {
   snack: Snack
}

export class GetSnacksUseCase {
	constructor(
      private snacksRepository: SnacksRepository
	) {}

	async execute({
		snackId,
	}: GetSnacksUseCaseRequest): Promise<GetSnacksUseCaseResponse> {
		const snack = await this.snacksRepository.findById(snackId)

		if(!snack) {
			throw new ResourceNotFoundError()
		}

		return {
			snack,
		}
	}
}