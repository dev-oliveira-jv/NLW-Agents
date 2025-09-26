import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { desc, eq } from 'drizzle-orm'
import { db } from '../../DB/connection.ts'
import { schema } from '../../DB/schema/index.ts'
import z4 from 'zod/v4'

export const getRoomsQuestions: FastifyPluginCallbackZod =  (app) => {
    app.get('/rooms/:roomId/quetions',{
        schema: {
            params: z4.object({
                roomId: z4.string(),
            }),
        },
    }, async (request) => {
      const { roomId } = request.params

      const results = await db.select({
        id: schema.questions.id,
        question: schema.questions.question,
        answer: schema.questions.answer,
        createdAt: schema.questions.createdAt,
      }).from(schema.questions).where(
        eq(schema.questions.roomId, roomId)
      ).orderBy(desc(schema.questions.createdAt))

      return results
    })
}