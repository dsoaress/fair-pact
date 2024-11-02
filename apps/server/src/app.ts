import { fastify } from 'node_modules/fastify/fastify'

const app = fastify()

app.get('/', async (_request, reply) => {
  reply.send({ hello: 'world' })
})

export { app }
