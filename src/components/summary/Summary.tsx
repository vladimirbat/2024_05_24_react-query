import { useTasksList } from "../../queries/useTasksList";

export interface SummaryProps {

}

export function Summary() {
  const { data: list } = useTasksList()
  const total = list?.length;
  const done = list?.filter(t => t.status === 'DONE').length;
  const pending = list?.filter(t => t.status === 'TO-DO').length;
  return <div>
    <div>Total: {total}</div>
    <div>Done: {done}</div>
    <div>Pending: {pending}</div>
  </div>;
}