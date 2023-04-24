import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorySnacksRepository } from '@/repositories/in-memory/in-memory-snacks-repository'
import { DeleteSnackUseCase } from './delete-snack'

let snacksRepository: InMemorySnacksRepository
let sut: DeleteSnackUseCase

describe('Delete Snack Use Case', () => {
	beforeEach(() => {
		snacksRepository = new InMemorySnacksRepository()
		sut = new DeleteSnackUseCase(snacksRepository)
	})

	it('should be able to delete a snack', async () => {
		await snacksRepository.create({
			id: 'snack-01',
			name: 'snack',
			description: 'Snack',
			date_time: new Date(),
			on_diet: true,
			user_id: '12345'
		})

		const deletedSnack = await sut.execute({
			snackId: 'snack-01',
		})

		expect(deletedSnack?.snack.id).toEqual('snack-01')
	})
})