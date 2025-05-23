import { redirect } from "next/navigation"
import { getCurrent } from "@/features/auth/queries"
import MembersListComponent from "@/features/workspaces/components/members-list"

const WorkspaceIdMembersPage = () => {
    const user = getCurrent()
    if(!user) redirect("/sign-in")

    

  return (
    <div className="w-full lg:max-w-xl">
        <MembersListComponent />
    </div>
  )
}

export default WorkspaceIdMembersPage