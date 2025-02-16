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

import { updateWorkSpaceSchema } from '../schemas'
import { DottedSeparator } from '@/components/dotted-separator'
import Image from 'next/image'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeftIcon, ArrowUpNarrowWide, CopyIcon, ImageIcon, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Workspace } from '../types'
import { useUpdateWorkspace } from '../api/use-update-workspace'
import useConfirm from '@/hooks/use-confirm'
import { useDeleteWorkspace } from '../api/use-delete-workspace'
import { toast } from 'sonner'



interface EditWorkspaceFormProps {
    onCancel?: () => void
    initialValues: Workspace
}

const EditWorkspaceFormComponent = ({ onCancel, initialValues }: EditWorkspaceFormProps) => {
    const router = useRouter()
    const { mutate, isPending } = useUpdateWorkspace()

    const {
        mutate: deleteWorkspace,
        isPending: isDeletingWorkspace
    } = useDeleteWorkspace()

    const [DeleteDialog, confirmDelete] = useConfirm(
        "Deletar área de trabalho",
        "Essa ação não pode ser desfeita.",
        "destructive"
    )


    const inputRef = useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof updateWorkSpaceSchema>>({
        resolver: zodResolver(updateWorkSpaceSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? ''
        }
    })

    const onSubmit = (values: z.infer<typeof updateWorkSpaceSchema>) => {

        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : ''
        }

        mutate({
            form: finalValues,
            param: { workspaceId: initialValues.$id }
        }, {
            onSuccess: ({ data }) => {
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

    const handleDelete = async () => {
        const ok = await confirmDelete()

        if (!ok) { return }

        deleteWorkspace({
            param: { workspaceId: initialValues.$id },
        },
            {
                onSuccess: () => {
                    router.push("/")
                    window.location.href = '/'
                }
            }
        )
    }

    const handleCopyInviteLink = () => {
        navigator.clipboard.writeText(fullInviteLink)
        .then(()=> toast.success("Copiado para área de transferência."))
    }

    const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`

    return (
        <div className=' flex flex-col gap-4'>
            <DeleteDialog />
            <Card className='w-full h-full  shadow-md rounded-sm p-2 mb-6'>
                <CardHeader className='flex flex-row items-center justify-between'>
                    <Button size='sm' variant='secondary' onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.$id}`)}
                        className='flex'
                    >
                        <ArrowLeftIcon className=' size-4 mr-5' />

                    </Button>
                    <CardTitle className='text-xl font-bold text-center p-l-3'>
                        {initialValues.name}
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
                                <FormField
                                    control={form.control}
                                    name='image'
                                    render={({ field }) => (
                                        <div className='flex flex-col gap-y-2 '>
                                            <div className='flex items-center gap-x-5 justify-center p-2 shadow-sm rounded-sm border'>
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
                                                    <Avatar className='size-[92px] p-2 bg-slate-400 rounded-md'>
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
                                                                if (inputRef.current) {
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
                                    Atualizar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className='w-full h-full rounded-sm shadow-sm p-3 mt-6'>
                <CardContent className='p-7'>
                    <div className='flex flex-col'>
                        <h3 className='font-bold'>Convidar Membros</h3>
                        <p className='text-sm text-muted-foreground mt-2'>
                            Use o link de convite e compartilhe sua área de trabalho!
                        </p>
                        <div className='mt-4'>
                            <div className='flex items-center gap-x-2'>
                                    <Input disabled value={fullInviteLink}/>
                                    <Button 
                                    onClick={handleCopyInviteLink}
                                    className=' p-2 ml-2'
                                    variant='secondary'
                                    >
                                        Copiar
                                        <CopyIcon />
                                    </Button>
                            </div>
                        </div>
                        <Button className='mt-6 w-fit ml-auto'
                            size='sm'
                            variant='outline'
                            type='button'
                            disabled={isPending || isDeletingWorkspace}
                            onClick={handleDelete}
                        >
                            Deletar área de trabalho
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card className='w-full h-full rounded-sm shadow-sm p-3 mt-6'>
                <CardContent className='p-7'>
                    <div className='flex flex-col'>
                        <h3 className='font-bold'>Área de Risco</h3>
                        <p className='text-sm text-muted-foreground'>
                            Apagar uma área de trabalho é uma ação irreversível.
                        </p>
                        <Button className='mt-6 w-fit ml-auto'
                            size='sm'
                            variant='destructive'
                            type='button'
                            disabled={isPending || isDeletingWorkspace}
                            onClick={handleDelete}
                        >
                            Deletar área de trabalho
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditWorkspaceFormComponent