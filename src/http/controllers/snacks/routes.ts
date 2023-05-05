import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

import { create } from './create'
import { history } from './history'
import { get } from './get'
import { update } from './update'
import { deleteSnack } from './delete-snack'

export async function snacksRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.post('/snacks', create)

	app.put('/snacks/:snackId', update)
	app.delete('/snacks/:snackId', deleteSnack)

	app.get('/snacks/:snackId', get)
	app.get('/snacks/history', history)
}