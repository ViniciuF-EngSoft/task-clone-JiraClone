"use client"

import { Loader } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    const { data: user, isLoading } = useCurrent()

    if (isLoading) {
        return (
            <div className="size-10 rounded-full flex items-center justify-center bg-slate-400 border border-neutral-300">
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
            <Avatar className="w-2 h-2 hover:opacity-75 border border-neutral-300 p-5 cursor-pointer text-muted-foreground bg-slate-300">
                <AvatarFallback className="bg-slate-300 font-medium text-neutral-500 flex items-center justify-center">
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>
        </DropdownMenu>
    )
}