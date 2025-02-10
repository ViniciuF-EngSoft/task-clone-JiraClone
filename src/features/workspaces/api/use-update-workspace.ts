import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.workspaces[':workspaceId']['$patch'], 200>
type RequestType = InferRequestType<typeof client.api.workspaces[':workspaceId']['$patch']>

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({form, param}) => {
            const response = await client.api.workspaces[':workspaceId']['$patch']({form, param})
            if(!response.ok){
                throw new Error("Falha ao atualizar área de trabalho. Tente novamente em instantes.")
            }
            return await response.json()
        },
        onSuccess: ({data}) => {
            toast.success("Atualizado com sucesso!")
            queryClient.invalidateQueries({queryKey: ["workspaces"]})
            queryClient.invalidateQueries({queryKey: ["workspace", data.$id]})
        },
        onError: () => {
            toast.error("Falha ao Atualizar.")
        }
    })

    return mutation
}