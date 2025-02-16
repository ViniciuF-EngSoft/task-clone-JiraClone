"use client"

import { DottedSeparator } from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import Link from 'next/link'
import { useJoinWorkspace } from '../api/use-join-workspace'
import { useInviteCode } from '../hooks/use-invite-code'
import { useWorkspaceId } from '../hooks/use-workspace-id'
import { useRouter } from 'next/navigation'

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string
    },

}

const JoinWorkspaceFormComponent = ({
    initialValues
}: JoinWorkspaceFormProps) => {
    const router = useRouter()
    const workspaceId = useWorkspaceId()
    const inviteCode = useInviteCode()
    const { mutate, isPending } = useJoinWorkspace()

    const onSubmit = () => {
        mutate({
            param: {workspaceId },
            json: { code: inviteCode}
        },{
            onSuccess: ({data}) => {
                router.push(`/workspaces/${data.$id}`)
            }
        })
    }

    return (
        <Card className='w-full h-full border-2 shadow-sm '>
            <CardHeader className='p-7'>
                <CardTitle className='text-xl font-bold'>
                    Entre na Área de Trabalho
                </CardTitle>
                <CardDescription>
                    Você foi convidade para entrar na área de trabalho <strong>{initialValues.name}</strong>!
                </CardDescription>
                <div className='px-7'>
                    <DottedSeparator />
                </div>
                <CardContent className='p-7'>
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-y-2'>
                        <Button
                            variant='outline'
                            type='button'
                            className='w-full lg:w-fit'
                            asChild
                            disabled={isPending}
                        >
                            <Link href='/'>
                                Cancelar
                            </Link>
                        </Button>
                        <Button
                            type='button'
                            className='w-full lg:w-fit'
                            onClick={onSubmit}
                            disabled={isPending}
                        >
                            Entrar em {initialValues.name}
                        </Button>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default JoinWorkspaceFormComponent