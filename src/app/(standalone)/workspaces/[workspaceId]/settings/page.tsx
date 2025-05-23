import { getCurrent } from '@/features/auth/queries'
import { getWorkspace } from '@/features/workspaces/queries'
import EditWorkspaceFormComponent from '@/features/workspaces/components/edit-workspace-form'
import { redirect } from 'next/navigation'
import React from 'react'

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string
  }
}

const WorkspaceIdSettingsPage = async ({ params }: WorkspaceIdSettingsPageProps) => {

  const user = getCurrent()
  if (!user) redirect("/sign-in")

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId })

  if (!initialValues) {
    redirect(`/workspace/${params.workspaceId}`)
  }

  return (
    <div className='w-full lg:max-w-xl'>
      <EditWorkspaceFormComponent initialValues={initialValues} />
    </div>
  )
}

export default WorkspaceIdSettingsPage