import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { CreateAndAuthenticaUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Update Snack (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to update a snack', async () => {
		const { token, user } = await CreateAndAuthenticaUser(app)

		const snack = await prisma.snack.create({
			data: {
				name: 'Snack',
				description: 'Snack', 
				date_time: new Date(), 
				on_diet: true,
				user_id: user.id  
			}
		})

		const response = await request(app.server)
			.put(`/snacks/${snack.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Snack1',
				description: 'Snack1', 
				dateTime: new Date(), 
				onDiet: false,
			})
      
		expect(response.statusCode).toEqual(201)
	})
})