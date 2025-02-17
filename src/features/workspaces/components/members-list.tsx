"use client"
import Link from 'next/link'
import { Fragment } from 'react'

import { useWorkspaceId } from '../hooks/use-workspace-id'
import { useDeleteMember } from '@/features/members/api/use-delete-member'
import { useGetMembers } from '@/features/members/api/use-get-members'
import { useUpdateMember } from '@/features/members/api/use-update-member'
import  useConfirm  from '@/hooks/use-confirm'

import { MemberRole } from '@/features/members/types'

import { DottedSeparator } from '@/components/dotted-separator'
import MemberAvatarComponent from '@/features/members/components/members-avatar'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-separator'

import { ArrowLeft, MoreVertical } from 'lucide-react'

const MembersListComponent = () => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Remover membro",
        "Esse membro será removida da área de trabalho",
        "destructive"
    )

    const workspaceId = useWorkspaceId()
    const { data } = useGetMembers({ workspaceId })
    const {
        mutate: deleteMember,
        isPending: isDeletingMember
    } = useDeleteMember()

    const {
        mutate: updateMember,
        isPending: isUpdatindMember
    } = useUpdateMember()

    const handleUpdateMember = (memberId: string, role: MemberRole) => {
        updateMember({
            json: { role },
            param: { memberId }
        })
    }

    const handleDeleteMember = async (memberId: string) => {
        const ok = await confirm()

        if(!ok) return

        deleteMember({param: {memberId}}, {
            onSuccess: () => {
                window.location.reload()
            }
        })
    }

    return (
        <Card className='w-full h-full border-2 shadow-none'>
            <ConfirmDialog />
            <CardHeader className='flex flex-row items-center gap-x-4 p-7 space-y-0'>
                <Button
                    asChild
                    size='sm'
                    variant='secondary'
                >
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeft />
                        Voltar
                    </Link>
                </Button>
                <CardTitle className='text-xl font-bold'>
                    Lista de Membros
                </CardTitle>
            </CardHeader>
            <div className='py-7'>
                <DottedSeparator />
            </div>
            <CardContent className='p-7'>
                {data?.documents.map((member, index) => (
                    <Fragment key={member.$id}>
                        <div className='flex items-center gap-2'>
                            <MemberAvatarComponent
                                className='size-10'
                                fallbackClassName='text-lg'
                                name={member.name}
                            />
                            <div className='flex flex-col'>
                                <p className='text-sm font-medium'>
                                    {member.name}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    {member.email}
                                </p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className='ml-auto'
                                        variant='secondary'
                                        size='icon'
                                    >
                                        <MoreVertical className='text-muted-foreground' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side='bottom' align='end'>
                                    <DropdownMenuItem
                                        className='font-medium'
                                        onClick={() => handleUpdateMember(
                                            member.$id, MemberRole.ADMIN
                                        )}
                                        disabled={isUpdatindMember}
                                    >
                                        Mudar para <strong>Administrador</strong>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className='font-medium'
                                        onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)}
                                        disabled={isUpdatindMember}
                                    >
                                        Mudar para <strong>Membro</strong>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className='font-medium text-red-800'
                                        onClick={() => handleDeleteMember(member.$id)}
                                        disabled={isDeletingMember}
                                    >
                                        Remover<strong>{member.name}</strong>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {index < data.documents.length - 1 && (
                            <Separator />
                        )}
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    )
}

export default MembersListComponent