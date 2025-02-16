import { getCurrent } from "@/features/auth/queries"
import JoinWorkspaceFormComponent from "@/features/workspaces/components/join-workspace-form"
import { getWorkspaceInfo } from "@/features/workspaces/queries"
import { redirect } from "next/navigation"

interface WorkspaceIdJoinPageProps {
  params: {
    workspaceId: string,
    inviteCode: string
  }
}

const JoinComponent = async ({
  params
}: WorkspaceIdJoinPageProps) => {

  const user = await getCurrent()
  if (!user) {
    redirect("/sign-in")
  }

  const workspaceInitialValues = await getWorkspaceInfo({
    workspaceId: params.workspaceId
  })

  if (!workspaceInitialValues) {
    redirect("/")
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceFormComponent
        initialValues={workspaceInitialValues}
      />
    </div>
  )
}

export default JoinComponent