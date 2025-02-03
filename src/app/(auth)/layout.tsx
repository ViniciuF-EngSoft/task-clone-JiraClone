"use client"
import Image from "next/image"
import Logo from '../../../public/project.png'
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    const pathname = usePathname()
    const isSignIn = pathname === '/sign-in'


    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <Image src={Logo} height={50} width={56} alt="Logo" />
                    <Button asChild variant='secondary'>
                        <Link href={isSignIn ? '/sign-up' : '/sign-in'}>
                        {isSignIn? "Criar Conta" : "Entre"}
                        </Link>
                    </Button>
                </nav>
                <div className="flex flex-col items-center justify-center pt-4 md:pt-14 max-w-[572px] m-auto">
                    {children}
                </div>
            </div>
        </main>
    )
}
export default AuthLayout