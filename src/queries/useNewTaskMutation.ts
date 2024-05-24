import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postNewTask } from "../infraestructure/TaksRepository";
import { queriesFactory } from "./queriesFactory";


export function useNewTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postNewTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queriesFactory.getTaskLists().queryKey })
    }
  })
}