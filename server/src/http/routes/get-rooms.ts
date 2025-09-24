import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../DB/connection.ts'
import { schema } from '../../DB/schema/index.ts'

export const getRoomsRoute: FastifyPluginCallbackZod =  (app) => {
    app.get('/rooms', async () => {
      const results = await   db.select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        
      }).from(schema.rooms).orderBy(schema.rooms.createdAt)

      return results
    })
}