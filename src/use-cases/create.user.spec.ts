import { describe, it } from 'vitest'
import { CreateUserUseCase } from './create-user'

describe('User Use Case', () => {
	it('should be able to create a user', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const sut = new CreateUserUseCase(usersRepository)
	})
})