import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { CreateAndAuthenticaUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('User Metrics (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to get user metrics', async () => {
		const { token, user } = await CreateAndAuthenticaUser(app)

		await prisma.snack.createMany({
			data: [
				{
					name: 'Snack-01',
					on_diet: true,
					date_time: new Date(),
					user_id: user.id  
				},
				{
					name: 'Snack-02',
					on_diet: false,
					date_time: new Date(),
					user_id: user.id  
				},
				{
					name: 'Snack-02',
					on_diet: false,
					date_time: new Date(),
					user_id: user.id  
				},
				{
					name: 'Snack-02',
					on_diet: true,
					date_time: new Date(),
					user_id: user.id  
				}
			]
		})


		const response = await request(app.server)
			.get('/users/metrics')
			.set('Authorization', `Bearer ${token}`)
			.send()   

		expect(response.statusCode).toEqual(200)
		expect(response.body.metrics).toEqual(
			expect.objectContaining({
				snacksCount: 4,
				snacksOnDietCount: 2,
				snacksOffDietCount: 2,
				bestSnackSequencePerDayWithinDiet: 1
			}),
		)
	})
})