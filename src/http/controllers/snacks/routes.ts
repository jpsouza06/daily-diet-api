import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function snacksRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.post('/snacks', create)
}