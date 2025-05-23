"use client"

import {  Loader, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { DottedSeparator } from "@/components/dotted-separator"
import { useLogout } from "../api/use-logout"
import { useCurrent } from "../api/use-current"

export const UserButton = () => {
    const {mutate: logout} = useLogout()
    const { data: user, isLoading } = useCurrent()

    if (isLoading) {
        return (
            <div className="size-10 rounded-full flex items-center justify-center bg-transparent border border-neutral-300">
                <Loader className="size-4 animate-spin text-muted-foreground" />
            </div>
        )
    }
    if (!user) {
        return null
    }

    const { name, email } = user
    const avatarFallback = name
        ? name.charAt(0).toUpperCase()
        : email.charAt(0).toUpperCase() ?? "U"

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="w-8 h-8 hover:opacity-75 border border-neutral-300 p-5 cursor-pointer text-muted-foreground ">
                    <AvatarFallback className=" font-medium flex items-center justify-center">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
                <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                    
                    <Avatar className="w-6 h-6 hover:opacity-75 border border-neutral-300 p-5 cursor-pointer text-muted-foreground ">
                        <AvatarFallback className="font-medium text-xl t flex items-center justify-center">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm font-medium">
                            {name || "Usuário"}
                        </p>
                        <p className="text-sm text-neutral-500 flex dark:text-slate-200">
                            {email}
                        </p>
                    </div>
                </div>
                <DottedSeparator className="m-2"/>
                <DropdownMenuItem 
                onClick={()=> logout()}
                className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer dark:text-red-700">
                    <LogOut className="size-4 mr-2"/>
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}