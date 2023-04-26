import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

import { create } from './create'
import { fetch } from './fetch'
import { get } from './get'

export async function snacksRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.post('/snacks', create)

	app.get('/snacks/:snackId', get)
	app.get('/snacks/:userId/:page', fetch)
}