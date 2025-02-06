"use client"
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { createWorkSpaceSchema } from '../schemas'
import { DottedSeparator } from '@/components/dotted-separator'
import { useCreateWorkspace } from '../api/use-create-workspace'


interface CreateWorkspacesFormProps {
    onCancel?: () => void
}

const CreaterWorkspaceFormComponent = ({ onCancel }: CreateWorkspacesFormProps) => {
    const {mutate, isPending} = useCreateWorkspace()

    const form = useForm<z.infer<typeof createWorkSpaceSchema>>({
        resolver: zodResolver(createWorkSpaceSchema),
        defaultValues: {
            name: ''
        }
    })

    const onSubmit = (values: z.infer<typeof createWorkSpaceSchema>) => {
        mutate({json: values})
    }

    return (
        <Card className='w-full h-full border-none shadow-none rounded-sm p-2'>
            <CardHeader className='flex p-7'>
                <CardTitle className='text-xl font-bold'>
                    Criar uma nova Área de Trabalho
                </CardTitle>
                <div className='px-7'>
                    <DottedSeparator />
                </div>
            </CardHeader>
            <CardContent className='p-7'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-y-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Nome da Área de Trabalho
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='@Area de Trabalho'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DottedSeparator className='py-7'/>
                        <div className='flex items-center justify-between p-4'>
                            <Button type='button' size='lg' variant='secondary'
                            onClick={onCancel}
                            disabled={isPending}
                            >
                                Cancelar
                            </Button>
                            <Button type='submit' size='lg' variant='default'
                            onClick={onCancel}
                            disabled={isPending}
                            >
                                Criar Workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default CreaterWorkspaceFormComponent