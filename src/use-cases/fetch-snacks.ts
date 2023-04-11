import { SnacksRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchSnacksUseCaseRequest {
   userId: string
	page: number
}

interface FetchSnacksUseCaseResponse {
   snacks: Snack[]
}

export class FetchSnacksUseCase {
	constructor(
      private snacksRepository: SnacksRepository
	) {}

	async execute({
		userId,
		page
	}: FetchSnacksUseCaseRequest): Promise<FetchSnacksUseCaseResponse> {
		const snacks = await this.snacksRepository.findManyByUserId(userId, page)

		if(!snacks) {
			throw new ResourceNotFoundError()
		}

		return {
			snacks,
		}
	}
}