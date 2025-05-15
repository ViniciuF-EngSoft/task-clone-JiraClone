import { toast } from "sonner";
import { dataTagSymbol, useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]['$patch'], 200>
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]['$patch']>

export const useUpdateProject = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ form, param }) => {
            const response = await client.api.projects[":projectId"]['$patch']({ form, param })
            if (!response.ok) {
                throw new Error("Falha ao criar projeto. Tente novamente em instantes.")
            }
            return await response.json()
        },
        onSuccess: ({data}) => {
            toast.success("Alterado com sucesso!")
            router.refresh()
            queryClient.invalidateQueries({queryKey: ["Projects"]})
            queryClient.invalidateQueries({ queryKey: ["project", data.$id] })
        },
        onError: () => {
            toast.error("Falha ao Editar.")
        }
    })

    return mutation
}