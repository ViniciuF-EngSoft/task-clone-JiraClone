import React from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'


interface MemberAvatarProps {
    name: string,
    className?: string,
    fallbackClassName?: string
}


const MemberAvatarComponent = ({
 name, className, fallbackClassName
    }: MemberAvatarProps) => {
 

  return(
    <Avatar className={cn(
        "size-5 transition border rounded-full", className
    )}>
        <AvatarFallback className={cn(
            " font-medium text-neutral-500 flex items-center justify-center m-auto", fallbackClassName
        )}>
            {name.charAt(0).toUpperCase()}
        </AvatarFallback>
    </Avatar>
  )
}

export default MemberAvatarComponent