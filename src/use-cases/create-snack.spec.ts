import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.ts'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemorySnacksRepository } from '@/repositories/in-memory/in-memory-snacks-repository'
import { CreateSnackUseCase } from './create-snack'

let usersRepository: InMemoryUsersRepository
let snacksRepository: InMemorySnacksRepository
let sut: CreateSnackUseCase

describe('Snack Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		snacksRepository = new InMemorySnacksRepository()
		sut = new CreateSnackUseCase(usersRepository, snacksRepository)
	})

	it('should be able to create a snack', async () => {
		const user  = await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),	
		})

		const {snack} = await sut.execute({
			name: 'Banana',
			description: 'Snack',
			dateTime: new Date(),
			onDiete: true,
			userId: user.id
		})

		expect(snack.id).toEqual(expect.any(String))
	})

})