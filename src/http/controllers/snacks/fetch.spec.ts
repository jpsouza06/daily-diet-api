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

		await prisma.snack.create({
			data: {
				name: 'Snack-01',
				description: 'Snack', 
				date_time: new Date(), 
				on_diet: true,
				user_id: user.id  
			}
		})

		await prisma.snack.create({
			data: {
				name: 'Snack-02',
				description: 'Snack',  
				date_time: new Date(),
				on_diet: true,
				user_id: user.id  
			}
		})

		const response = await request(app.server)
			.get(`/snacks/${user.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()      
		expect(response.statusCode).toEqual(200)
		expect(response.body.snacks).toHaveLength(1)
		expect(response.body.snacks).toEqual([
			expect.objectContaining({
				name: 'Snack-01',
			}),
			expect.objectContaining({
				name: 'Snack-02',
			})
		])
	})
})