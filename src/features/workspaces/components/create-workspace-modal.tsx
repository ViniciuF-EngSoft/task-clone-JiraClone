"use client"
import React from 'react'
import ResponsiveModalComponent from '@/components/responsive-modal'
import CreaterWorkspaceFormComponent from './create-workspaces-form'
import { useCreateWorkspaceModal } from '../hooks/use-create-workspace-modal'

const CreateWorkspaceModalComponent = () => {

    const {isOpen, setIsOpen, close} = useCreateWorkspaceModal()

  return (
    <ResponsiveModalComponent open={isOpen} onOpenChange={setIsOpen} >
        <CreaterWorkspaceFormComponent onCancel={close} />
    </ResponsiveModalComponent>
  )
}

export default CreateWorkspaceModalComponent