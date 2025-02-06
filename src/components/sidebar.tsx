import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DottedSeparator } from './dotted-separator'
import { NavigationComponent } from './navigation'

const SidebarComponent = () => {
    return (
        <aside className='h-full bg-neutral-100 p-4 w-full'>
            <Link href='/'>
                <Image src='/automation.png' alt='Logo' width={64} height={48} />
            </Link>
            <DottedSeparator className='my-4' />
            <NavigationComponent />
        </aside>
    )
}

export default SidebarComponent