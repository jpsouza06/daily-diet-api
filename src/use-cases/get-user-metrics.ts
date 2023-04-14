import { SnacksRepository } from '@/repositories/snacks-repository'
import { getBestSnackSequencePerDayWithinDiet } from '@/utils/get-best-snack-sequence-per-day-within-diet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserMetricsUseCaseRequest {
   userId: string
	page: number
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
		page
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

		const snacksOnDiet = 
			await this.snacksRepository.findManySnacksOnDiet(userId, page)
		
		if(!snacksOnDiet) {
			throw new ResourceNotFoundError()
		}

		const bestSnackSequencePerDayWithinDiet = 
			getBestSnackSequencePerDayWithinDiet(snacksOnDiet)

		return {
			snacksCount,
			snacksOnDietCount,
			snacksOffDietCount,
			bestSnackSequencePerDayWithinDiet
		}
	}
}