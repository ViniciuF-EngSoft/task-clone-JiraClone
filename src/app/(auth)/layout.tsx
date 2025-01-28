import Image from "next/image"
import Logo from '../../../public/project.png'
import { Button } from "@/components/ui/button"

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <Image src={Logo} height={50} width={56} alt="Logo" />
                    <Button variant='secondary'>
                        Sign Up
                    </Button>
                </nav>
                <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
                {children}
                </div>
            </div>
        </main>
    )
}
export default AuthLayout