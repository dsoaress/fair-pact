import { fastify } from 'fastify'

const app = fastify()

app.get('/', async (_request, reply) => {
  reply.send({ hello: 'world' })
})

export { app }
