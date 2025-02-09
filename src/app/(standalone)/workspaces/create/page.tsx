import { redirect } from 'next/navigation'
import { getCurrent } from '@/features/auth/actions'

import CreaterWorkspaceFormComponent from '@/features/workspaces/components/create-workspaces-form'

const WorkspaceCreatePageComponent = async() => {
    const user = await getCurrent()
    if(!user) redirect("/sign-in")

    return (
        <div className='w-full lg:max-w-xl'>
            <CreaterWorkspaceFormComponent />
        </div>
    )
}

export default WorkspaceCreatePageComponent