import fastify from 'fastify'

export const app = fastify()

app.get('/user', (request, reply) => {
	return reply.status(201).send({
		message: 'Ok'
	})
})