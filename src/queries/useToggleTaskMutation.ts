import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendUpdateTaskStatus } from "../infraestructure/TaksRepository";
import { queriesFactory } from "./queriesFactory";


export function useToggleTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendUpdateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queriesFactory.getTaskLists().queryKey })
    }
  })
}