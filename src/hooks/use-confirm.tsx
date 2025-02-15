import { useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import ResponsiveModalComponent from "@/components/responsive-modal"
import {
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle
} from '@/components/ui/card'



const useConfirm = ( 
    title: string, 
    message: string,
    variant: ButtonProps["variant"] = "ghost"
): [() => JSX.Element, () => Promise<unknown>] => {
    const [promisse, setPromisse] = useState<{resolve: (value: boolean) => void} | null>(null)

    const confirm = () => {
        return new Promise((resolve)=>{
            setPromisse({resolve})
        })
    }

    const handleClose = () => {
        setPromisse(null)
    }

    const handleConfirm = () => {
        promisse?.resolve(true)
        handleClose()
    }

    const handleCancel = () => {
        promisse?.resolve(false)
        handleClose()
    }

  const ConfirmDialog = () => (
    <ResponsiveModalComponent open={promisse !== null} onOpenChange={handleClose}>
        <Card className="w-full h-full border-none shadow-none">
            <CardContent className="pt-7">
                <CardHeader className="p-0">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{message}</CardDescription>
                </CardHeader>
                <div className="pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
                    <Button onClick={handleCancel} variant='link'
                    className="w-full lg:w-auto"
                    >
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} variant={variant}
                    className="w-full lg:w-auto"
                    >
                        Confirmar
                    </Button>
                </div>
            </CardContent>
        </Card> 
    </ResponsiveModalComponent>
)

  return [ConfirmDialog, confirm]
}

export default useConfirm