import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"], 200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]>

export const useResetInviteCode = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ param }) => {
            const response = await client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]({ param })
            if (!response.ok) {
                throw new Error("Falha ao resetar link de convite da área de trabalho. Tente novamente em instantes.")
            }
            return await response.json()
        },
        onSuccess: ({ data }) => {
            toast.success("Link de convide alterado!")
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
            queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] })
        },
        onError: () => {
            toast.error("Falha ao resetar link de convite.")
        }
    })

    return mutation
}