import { UserButton } from '@/features/auth/components/user-buttom'
import React from 'react'

const NavbarComponent = () => {
  return (
    <nav className='pt-4 px-6 flex items-center justify-between'>
        <div className=' flex-col hidden lg:flex'>
            <h1 className='text-xl font-semibold'>Início</h1>
            <p className='text-muted-foreground'>Gerencie todos os seus projetos e tarefas aqui!</p>
        </div>
        <UserButton />
    </nav>
  )
}

export default NavbarComponent