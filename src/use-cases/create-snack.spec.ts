import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.ts'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from './register-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { compare } from 'bcryptjs'
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

	it('should be able to register a user', async () => {
		const {user} = await sut.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
			
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should hash user password upon registration', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		})

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			user.password_hash
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with same email twice', async () => {
		const email = 'johndoe@example.com'

		await sut.execute({
			name: 'John Doe',
			email,
			password: '123456'
		})

		await expect(() =>
			sut.execute({
				name: 'John Doe',
				email,
				password: '123456'
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})
})