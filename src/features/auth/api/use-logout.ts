import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.logout['$post']>


export const useLogout = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.auth.logout['$post']()
            if(!response.ok){
                throw new Error("Falha ao sair. Tente novamente em instantes.")
            }
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Logout com sucesso.")
            router.refresh()
            queryClient.invalidateQueries({queryKey: ['current']})
            queryClient.invalidateQueries({queryKey: ['workspaces']})
        },
        onError: ()=>{
            toast.error("Falha ao sair do sistema.")
        }
    })

    return mutation
}