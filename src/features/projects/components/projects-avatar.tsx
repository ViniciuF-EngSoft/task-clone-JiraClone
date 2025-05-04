import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'


interface ProjectAvatarProps {
    image?: string,
    name: string,
    className?: string
}


const ProjectAvatarComponent = ({
        image, name, className
    }: ProjectAvatarProps) => {
  if(image){
    return(
        <div className={cn(
            "size-10 relative rounded-md overflow-hidden", className
        )}>
            <Image src={image} alt='name' width={64} height={64} className='object-cover fill'/>
        </div>
    )
  }

  return(
    <Avatar className={cn(
        "size-10", className
    )}>
        <AvatarFallback className='text-white font-semibold text-lg'>
            {name[0]}
        </AvatarFallback>
    </Avatar>
  )
}

export default ProjectAvatarComponent