"use client"
import React from 'react'
import ResponsiveModalComponent from '@/components/responsive-modal'
import CreateProjectFormComponent from './create-project-form'
import { useCreateProjectsModal } from '../hooks/use-create-project-modal'

const CreateProjectModalComponent = () => {

    const {isOpen, setIsOpen, close} = useCreateProjectsModal()

  return (
    <ResponsiveModalComponent open={isOpen} onOpenChange={setIsOpen} >
        <CreateProjectFormComponent onCancel={close} />
    </ResponsiveModalComponent>
  )
}

export default CreateProjectModalComponent