"use client"
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Separator } from '@radix-ui/react-separator'

const formSchema = z.object({
    name: z.string().min(8, 'O nome precisa ter no mínimo 8 caracteres'),
    email: z.string().email(),
    password: z.string().min(8, 'Mínimo de 8 caracteres')
})

export const SignUpCard = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log({ values })
    }


    return (
        <Card className="w-full h-full p-2 md:w-[487px] border-none shadow-none lg:w-[500px]">
            <CardHeader className="flex items-center justify-center text-center py-7">
                <CardTitle className="text-2xl">
                    Crie sua conta agora!
                </CardTitle>
                <CardDescription>
                    Ao entrar, você concorda com nossas {" "}
                    <Link href='/privacy'>
                        <span className='text-blue-600 hover:text-blue-800 cursor-pointer'>Política de Privacidade</span>{" e "}
                    </Link>
                    <Link href='/terms'>
                        <span className='text-blue-600 hover:text-blue-800 cursor-pointer'>Termos de Serviços</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent className="p-7 ">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            name='name'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Digite seu nome"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='email'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
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
                                            {...field}
                                            type="password"
                                            placeholder="Digite sua senha"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" disabled={false} size={'lg'}>
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
                    disabled={false}>
                    <FcGoogle className='mr-2 size-5' />
                    Entre com o Google
                </Button>
                <Button
                    variant={'ghost'} size={'lg'} className="w-full"
                    disabled={false}>
                    <FaGithub className='mr-2 size-5' />
                    Entre com o Github
                </Button>
            </CardContent>
            <div className='p-7'>
                <Separator />
            </div>
            <CardContent className='p-7 mb-7 flex items-center justify-center'>
                <p className='text-sm pt-7'>
                    Já possui uma conta? {" "}
                    <Link href='/sign-in' className='text-blue-600'>
                        <span className='text-blue-500 cursor-pointer'>Entre</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}