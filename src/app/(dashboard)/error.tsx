"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, Home } from "lucide-react"
import Link from "next/link"

const ErrorPage = () => {
return (
    <div className=" h-screen flex flex-col gap-y-2 items-center justify-center">
        <AlertTriangle/>
        <p className="text-sm text-muted-foreground">
            Alguma coisa saiu mal...
        </p>
        <Button variant='ghost'>
            <Link href='/'>
                <Home /> 
                Voltar ao início
            </Link>
        </Button>

    </div>
)
}

export default ErrorPage