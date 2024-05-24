import { useQuery } from "@tanstack/react-query";
import { queriesFactory } from "./queriesFactory";


export function useTasksList() {
  return useQuery(queriesFactory.getTaskLists());
}