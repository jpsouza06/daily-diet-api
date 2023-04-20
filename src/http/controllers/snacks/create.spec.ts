import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { CreateAndAuthenticaUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Snack (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to create a snack', async () => {
		const { token } = await CreateAndAuthenticaUser(app)
		const response = await request(app.server)
			.post('/snacks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Snack',
				description: 'Snack', 
				dateTime: new Date(), 
				onDiet: true
			})
      
		expect(response.statusCode).toEqual(201)
	})
})