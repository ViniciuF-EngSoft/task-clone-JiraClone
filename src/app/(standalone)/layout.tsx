import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../../../public/automation.png'
import { UserButton } from '@/features/auth/components/user-buttom'
interface StandAloneLayoutProps {
    children: React.ReactNode
}

const StandAloneLayout = ({ children }: StandAloneLayoutProps) => {
    return (
        <main className='min-h-screen px-2'>
            <div className='mx-auto max-w-screen-2xl justify-center py-4'>
                <nav className='flex justify-between items-center h-[73px] border-b-2'>
                    <Link href='/'>
                    <Image src={logo || '/automation.png'} width={64} height={32} alt='logo'/>
                    </Link>
                    <UserButton />
                </nav>
                <div className='flex flex-col items-center justify-center py-4'>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default StandAloneLayout