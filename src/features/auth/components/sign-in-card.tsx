"use client"
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { DottedSeparator } from "@/components/dotted-separator"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-separator'
import { loginSchema } from '../schema'
import { useLogin } from '../api/user-login'

export const 
SignInCard = () => {
    const {mutate, isPending} = useLogin()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({
            json:values,
        })
    }
    return (
        <Card className="w-full h-full p-2 md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center py-7">
                <CardTitle className="text-2xl">
                    Bem-Vindo de volta!
                </CardTitle>
            </CardHeader>
            <CardContent className="p-7 ">
                <Form {...form}>
                    <form className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            name='email'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                        disabled={isPending}
                                            {...field}
                                            type="email"
                                            placeholder="Digite seu email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='password'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                        disabled={isPending}
                                            {...field}
                                            type="password"
                                            placeholder="Digite sua senha"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" disabled={isPending} size={'lg'}>
                            Entrar
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="mt-5">
                <DottedSeparator height='4px' />
            </div>
            <CardContent>
                <Button
                    variant={'ghost'} size={'lg'} className="w-full"
                    disabled={isPending}>
                    <FcGoogle className='mr-2 size-5' />
                    Entre com o Google
                </Button>
                <Button
                    variant={'ghost'} size={'lg'} className="w-full"
                    disabled={isPending}>
                    <FaGithub className='mr-2 size-5' />
                    Entre com o Github
                </Button>
            </CardContent>
            <div className='py-4'>
                <Separator />
            </div>
            <CardContent className='p-7 mb-7 flex items-center justify-center'>
                <p className='text-sm p-5'>
                    Ainda não possui conta? {" "}
                    <Link href='/sign-up'>
                        <span className='text-blue-500'>Cadastre-se</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}