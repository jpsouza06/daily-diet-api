import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemorySnacksRepository } from '@/repositories/in-memory/in-memory-snacks-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let snacksRepository: InMemorySnacksRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
	beforeEach(() => {
		snacksRepository = new InMemorySnacksRepository()
		sut = new GetUserMetricsUseCase(snacksRepository)
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to get user metrics', async () => {
		vi.setSystemTime(new Date(2023, 0, 1, 0, 40))  
		await snacksRepository.create({
			id: 'snack-01',
			name: 'snack',
			description: 'Snack',
			date_time: new Date(),
			on_diete: true,
			user_id: '12345'
		})

		const oneDay = 1000 * 60 * 60 * 24 
      
		vi.advanceTimersByTime(oneDay)

		await snacksRepository.create({
			id: 'snack-02',
			name: 'snack',
			description: 'Snack',
			date_time: new Date(),
			on_diete: true,
			user_id: '12345'
		})
      
		vi.advanceTimersByTime(oneDay)

		await snacksRepository.create({
			id: 'snack-03',
			name: 'snack',
			description: 'Snack',
			date_time: new Date(),
			on_diete: false,
			user_id: '12345'
		})
      
		vi.advanceTimersByTime(oneDay)

		await snacksRepository.create({
			id: 'snack-04',
			name: 'snack',
			description: 'Snack',
			date_time: new Date(),
			on_diete: true,
			user_id: '12345'
		})

		const { 
			bestSnackSequencePerDayWithinDiet, 
			snacksCount,
			snacksOffDietCount, 
			snacksOnDietCount 
		} = await sut.execute({
			userId: '12345'
		})
      
		expect(bestSnackSequencePerDayWithinDiet).toEqual(2)
		expect(snacksCount).toEqual(4)
		expect(snacksOffDietCount).toEqual(1)
		expect(snacksOnDietCount).toEqual(3)
	})

})