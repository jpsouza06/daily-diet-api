import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { CreateAndAuthenticaUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Fetch Snack (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to fetch snacks by user', async () => {
		const { token, user } = await CreateAndAuthenticaUser(app)

		await prisma.snack.createMany({
			data: [
				{
					name: 'Snack-01',
					on_diet: true,
					user_id: user.id  
				},
				{
					name: 'Snack-02',
					on_diet: true,
					user_id: user.id  
				}
			]
		})


		const response = await request(app.server)
			.get('/snacks/history')
			.set('Authorization', `Bearer ${token}`)
			.send()   
		
		expect(response.statusCode).toEqual(200)
		expect(response.body.snacks).toHaveLength(2)
		expect(response.body.snacks).toEqual([
			expect.objectContaining({
				user_id: user.id,
			}),
			expect.objectContaining({
				user_id: user.id,
			})
		])
	})
})