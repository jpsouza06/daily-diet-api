import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorySnacksRepository } from '@/repositories/in-memory/in-memory-snacks-repository'
import { UpdateSnackUseCase } from './update-snack'

let snacksRepository: InMemorySnacksRepository
let sut: UpdateSnackUseCase

describe('Update Snack Use Case', () => {
	beforeEach(() => {
		snacksRepository = new InMemorySnacksRepository()
		sut = new UpdateSnackUseCase(snacksRepository)
	})

	it('should be able to update a snack', async () => {
		const snack = await snacksRepository.create({
			id: 'snack-01',
			name: 'snack',
			description: 'Snack',
			date_time: new Date(),
			on_diete: true,
			user_id: '12345'
		})

		await sut.execute({
			snackId: 'snack-01',
			name: 'new-snack',
			dateTime: snack.date_time,
			description: snack.description ?? '',
			onDiet: snack.on_diete
		})

		const snackUpdated = await snacksRepository.findById('snack-01')

		expect(snackUpdated?.name).toEqual('new-snack')
	})
})