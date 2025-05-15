import { Account, Client, Databases } from "node-appwrite"
import { getMember } from "../members/utils"
import { DATABASE_ID, WORKSPACE_ID } from "@/config"
import { cookies } from "next/headers"
import { Project } from "./types"
import { AUTH_COOKIE } from "../auth/constants"

interface GetProjectId{
    projectId: string
}

export const getProject = async ({projectId: workspaceId}:GetProjectId) => {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

        const session = await cookies().get(AUTH_COOKIE)

        if (!session) return null

        client.setSession(session.value)

        const databases = new Databases(client)
        const account = new Account(client)
        const user = await account.get()

        const project = await databases.getDocument<Project>(
            DATABASE_ID, 
            WORKSPACE_ID,
            workspaceId
        )
        const member = await getMember({
            databases, 
            userId: user.$id,
            workspaceId: project.workspaceId
        })

        if(!member){
            throw new Error("Não autorizado.")
        }

        return project
    } catch {
        return null
    }
}