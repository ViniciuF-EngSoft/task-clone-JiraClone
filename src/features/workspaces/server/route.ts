import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";

import { createWorkSpaceSchema } from "../schemas";
import { DATABASE_ID, IMAGE_BUCKET_ID, WORKSPACE_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
    .get('/', sessionMiddleware, async (c) => {
        const databases = c.get('databases')

        const workspaces = await databases.listDocuments(
            DATABASE_ID, 
            WORKSPACE_ID
        )

        return c.json({data: workspaces})
    })
    .post(
        '/', //=> workspaces
        zValidator('form', createWorkSpaceSchema),
        sessionMiddleware,
        async (c) => {
            const databases = c.get("databases")
            const storage = c.get("storage")
            const user = c.get("user")

            const {name, image} = c.req.valid("form")

            let uploadedImageUrl: string | undefined

            if(image instanceof File){
                const file = await storage.createFile(
                    IMAGE_BUCKET_ID,
                    ID.unique(),
                    image
                )

                const arrayBuffer = await storage.getFilePreview(
                    IMAGE_BUCKET_ID,
                    file.$id
                )

                uploadedImageUrl = `data:image/png/base64,${Buffer.from(arrayBuffer).toString('base64')}`
            }

            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACE_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    imageUrl: uploadedImageUrl,
                }
            )

            return c.json({data: workspace})
        }

    )




export default app

