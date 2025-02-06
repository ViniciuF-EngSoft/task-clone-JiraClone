import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";

import { createWorkSpaceSchema } from "../schemas";
import { DATABASE_ID, WORKSPACE_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
    .post(
        '/', //=> workspaces
        zValidator('json', createWorkSpaceSchema),
        sessionMiddleware,
        async (c) => {
            const databases = c.get("databases")
            const user = c.get("user")

            const {name} = c.req.valid("json")

            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACE_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id
                }
            )

            return c.json({data: workspace})
        }

    )




export default app

