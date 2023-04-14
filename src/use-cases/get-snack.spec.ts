import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorySnacksRepository } from '@/repositories/in-memory/in-memory-snacks-repository'
import { GetSnackUseCase } from './get-snack'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let snacksRepository: InMemorySnacksRepository
let sut: GetSnackUseCase

describe('Get Snack Use Case', () => {
	beforeEach(() => {
		snacksRepository = new InMemorySnacksRepository()
		sut = new GetSnackUseCase(snacksRepository)
	})

	it('should be able to get a snack', async () => {
		await snacksRepository.create({
			id: 'snack-01',
			name: 'snack',
			description: 'Snack',
			date_time: new Date(),
			on_diete: true,
			user_id: '12345'
		})

		const { snack } = await sut.execute({
			snackId: 'snack-01'
		})
      
		expect(snack.id).toEqual('snack-01')
	})

	it('should not be able to get a snack with wrong id', async () => {
		await expect(() => sut.execute({
			snackId: 'snack-01'
		})).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})