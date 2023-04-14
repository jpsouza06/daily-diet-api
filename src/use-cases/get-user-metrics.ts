import { SnacksRepository } from '@/repositories/snacks-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserMetricsUseCaseRequest {
   userId: string
}

interface GetUserMetricsUseCaseResponse {
   snacksCount: number
   snacksOnDietCount: number
   snacksOffDietCount: number
   bestSnackSequencePerDayWithinDiet: number
}

export class GetUserMetricsUseCase {
	constructor(
      private snacksRepository: SnacksRepository
	) {}

	async execute({
		userId,
	}: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
		const snacksCount = await this.snacksRepository.countByUserId(userId)

		if(!snacksCount) {
			throw new ResourceNotFoundError()
		}

		const snacksOnDietCount = 
      await this.snacksRepository.countSnacksOnDietByUserId(userId)

		if(!snacksOnDietCount) {
			throw new ResourceNotFoundError()
		}

		const snacksOffDietCount = 
         await this.snacksRepository.countSnacksOffDietByUserId(userId)

		if(!snacksOffDietCount) {
			throw new ResourceNotFoundError()
		}
		const bestSnackSequencePerDayWithinDiet = 
         await this.snacksRepository.findBestSnackSequencePerDayWithinDiet(userId)

		if(!bestSnackSequencePerDayWithinDiet) {
			throw new ResourceNotFoundError()
		}

		return {
			snacksCount,
			snacksOnDietCount,
			snacksOffDietCount,
			bestSnackSequencePerDayWithinDiet
		}
	}
}