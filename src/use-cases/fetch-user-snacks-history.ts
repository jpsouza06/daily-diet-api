import { SnacksRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchUserSnacksHistoryUseCaseRequest {
   userId: string
	page: number
}

interface FetchUserSnacksHistoryUseCaseResponse {
   snacks: Snack[]
}

export class FetchUserSnacksHistoryUseCase {
	constructor(
      private snacksRepository: SnacksRepository
	) {}

	async execute({
		userId,
		page
	}: FetchUserSnacksHistoryUseCaseRequest): Promise<FetchUserSnacksHistoryUseCaseResponse> {
		const snacks = await this.snacksRepository.findManyByUserId(userId, page)

		if(!snacks) {
			throw new ResourceNotFoundError()
		}

		return {
			snacks,
		}
	}
}