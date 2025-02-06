"use client"
import React, { useEffect, useState } from 'react'

import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import SidebarComponent from './sidebar'
import { usePathname } from 'next/navigation'

const MobileSidebarComponent = () => {

  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='secondary' className='lg:hidden'>
          <MenuIcon className='size-5 text-neutral-500' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='p-0'>
        <SidebarComponent />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebarComponent