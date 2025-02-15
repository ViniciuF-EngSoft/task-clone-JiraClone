"use client"
import React, { useRef } from 'react'
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
import Image from 'next/image'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@/components/ui/avatar'
import { ArrowUpNarrowWide, ImageIcon, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'


interface CreateWorkspacesFormProps {
    onCancel?: () => void
}

const CreaterWorkspaceFormComponent = ({ onCancel }: CreateWorkspacesFormProps) => {
    const router = useRouter()
    const { mutate, isPending } = useCreateWorkspace()

    const inputRef = useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof createWorkSpaceSchema>>({
        resolver: zodResolver(createWorkSpaceSchema),
        defaultValues: {
            name: ''
        }
    })

    const onSubmit = (values: z.infer<typeof createWorkSpaceSchema>) => {

        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : ""
        }

        mutate({ form: finalValues },{
            onSuccess: ({data}) => {
                form.reset()
                router.push(`/workspaces/${data.$id}`)
                //onCancel?.()
            }
        })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            form.setValue("image", file)
        }
    }

    return (
        <Card className='w-full h-full border-none shadow-none rounded-sm p-2 dark:border-gray-800 dark:shadow-md dark:bg-transparent'>
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
                        <div className='flex flex-col gap-y-4 rounded-sm border-none '>
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
                            <FormField
                                control={form.control}
                                name='image'
                                render={({ field }) => (
                                    <div className='flex flex-col gap-y-2 '>
                                        <div className='flex items-center gap-x-5 justify-center p-2 bg-transparent'>
                                            {field.value ? (
                                                <div className='size-[72p-x] relative rounded-md overflow-hidden'>
                                                    <Image
                                                    className='object-cover m-2'
                                                        src={
                                                            field.value instanceof File
                                                                ? URL.createObjectURL(field.value)
                                                                : field.value
                                                        }
                                                        alt='Logo'
                                                        width={64}
                                                        height={64}
                                                    />
                                                </div>
                                            ) : (
                                                <Avatar className='size-[92px] p-2  rounded-md'>
                                                    <AvatarFallback>
                                                        <ImageIcon className='size-[36px] text-neutral-400' />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className='flex flex-col p-3'>
                                                <p className='text-sm'>Ícone da Área de Trabalho</p>
                                                <p className='text-sm text-muted-foreground'>
                                                    JPG, PNG, SVG ou JPEG <span className='text-blue-500'>Máx. 1MB</span>
                                                </p>
                                                <input className='hidden'
                                                    type='file'
                                                    accept='.jpg, .png, .svg, .jpeg'
                                                    ref={inputRef}
                                                    onChange={handleImageChange}
                                                    disabled={isPending}
                                                />
                                                {field.value ? (
                                                <Button
                                                    type='button'
                                                    disabled={isPending}
                                                    variant='destructive'
                                                    size='sm'
                                                    className='w-fit mt-4 p-4'
                                                    onClick={() => {
                                                        field.onChange(null)
                                                        if(inputRef.current){
                                                            inputRef.current.value = ''
                                                        }
                                                    }}
                                                >
                                                    <Trash2 />
                                                    Remover imagen
                                                </Button>
                                                ) : (
                                                    <Button
                                                    type='button'
                                                    disabled={isPending}
                                                    variant='ghost'
                                                    size='sm'
                                                    className='w-fit mt-4 p-4'
                                                    onClick={() => inputRef.current?.click()}
                                                >
                                                    <ArrowUpNarrowWide />
                                                    Upload de Imagem
                                                </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <DottedSeparator className='py-7' />
                        <div className='flex items-center justify-between p-4'>
                            <Button type='button' size='lg' variant='secondary'
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(
                                    !onCancel && "invisible"
                                )}
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