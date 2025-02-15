import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]['$delete'], 200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]['$delete']>

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ param }) => {
            const response = await client.api.workspaces[":workspaceId"]['$delete']({ param })
            if (!response.ok) {
                throw new Error("Falha ao deletar área de trabalho. Tente novamente em instantes.")
            }
            return await response.json()
        },
        onSuccess: ({ data }) => {
            toast.success("Deletado com sucesso!")
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
            queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] })
        },
        onError: () => {
            toast.error("Falha ao deletar.")
        }
    })

    return mutation
}