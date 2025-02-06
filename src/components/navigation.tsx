import { SettingsIcon, UsersIcon } from 'lucide-react'
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from 'react-icons/go'
import Link from 'next/link'
import { cn } from '@/lib/utils'
const routes = [
    {
        label: 'Início',
        href: '',
        icon: GoHome,
        activeIcon: GoHomeFill
    },
    {
        label: 'Meus Projetos',
        href: '/tasks',
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill
    },
    {
        label: 'Configurações',
        href: '/settings',
        icon: SettingsIcon,
        activeIcon: SettingsIcon
    },
    {
        label: 'Membros',
        href: '/members',
        icon: UsersIcon,
        activeIcon: UsersIcon
    }
]

export const NavigationComponent = () => {
    return (
        <ul className='flex flex-col'>
            {routes.map((item) => {
                const isActive = false
                const Icon = isActive ? item.activeIcon : item.icon

                return (
                    <Link key={item.href} href={item.href}>
                        <div className={cn(
                            "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                            isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                        )}>
                            <Icon className='size-5 text-neutral-500' />
                            {item.label}
                        </div>
                    </Link>
                )
            })}
        </ul>
    )
}