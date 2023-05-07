import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'
import { refresh } from './refresh'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { metrics } from './metrics'

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', register)
	app.post('/sessions', authenticate)

	app.patch('/token/refresh', refresh)
	
	
	app.get('/users/metrics', { onRequest: [verifyJwt]}, metrics)
}