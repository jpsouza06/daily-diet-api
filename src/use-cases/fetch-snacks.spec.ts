import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorySnacksRepository } from '@/repositories/in-memory/in-memory-snacks-repository'
import { FetchSnacksUseCase } from './fetch-snacks'

let snacksRepository: InMemorySnacksRepository
let sut: FetchSnacksUseCase

describe('Fetch Snacks Use Case', () => {
	beforeEach(() => {
		snacksRepository = new InMemorySnacksRepository()
		sut = new FetchSnacksUseCase(snacksRepository)
	})

	it('should be able to fetch snack by user', async () => {
		await snacksRepository.create({
			id: 'snack-01',
			name: 'snack',
			description: 'Snack',
			date_time: new Date(),
			on_diete: true,
			user_id: '12345'
		})

		await snacksRepository.create({
			id: 'snack-02',
			name: 'snack',
			description: 'Snack',
			date_time: new Date(),
			on_diete: true,
			user_id: '12345'
		})

		const { snacks } = await sut.execute({
			userId: '12345',
			page: 1
		})

		expect(snacks).toHaveLength(2)
		expect(snacks).toEqual([
			expect.objectContaining({id: 'snack-01'}),
			expect.objectContaining({id: 'snack-02'})
		])
	})

	it('should be able to fetch paginated snack by user', async () => {
		for(let i = 1; i <= 22; i++) {
			await snacksRepository.create({
				id: `snack-${i}`,
				name: 'snack',
				description: 'Snack',
				date_time: new Date(),
				on_diete: true,
				user_id: '12345'
			})
		}

		const { snacks } = await sut.execute({
			userId: '12345',
			page: 2
		})

		expect(snacks).toHaveLength(2)
		expect(snacks).toEqual([
			expect.objectContaining({id: 'snack-21'}),
			expect.objectContaining({id: 'snack-22'})
		])
	})
})