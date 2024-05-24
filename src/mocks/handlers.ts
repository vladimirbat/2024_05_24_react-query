import { http, HttpResponse } from 'msw';
import { Task } from '../domain/model/Task';

const tasks: Task[] = [
  {
    id: 1,
    text: 'Estudiar React Query',
    status: 'TO-DO',
  },
  {
    id: 2,
    text: 'Ir al examen',
    status: 'TO-DO',
  },
  {
    id: 3,
    text: 'Ver Filmin',
    status: 'DONE',
  },
];

let failCount = 0;

export const handlers = [
  http.get('*/api/tasks', async () => {
    failCount--;
    if (failCount + 1 <= 0) {
      return HttpResponse.json(
        tasks
      )
    }
    return getError()
  }),
  http.post('*/api/tasks', async ({ request }) => {
    const task = (await request.json()) as Task;
    addTaskToList(task);
    console.log(tasks);
    return new Response(null, { status: 200 });
  }),
  http.patch('*/api/tasks', async ({ request }) => {
    const taskData = (await request.json()) as { id: number, status: 'TO-DO' | 'DONE' };
    const task = tasks.find(t => t.id == taskData.id);
    if (task) {
      task.status = taskData.status;
      console.log(tasks);
      return new Response(null, { status: 200 });
    }
    return getError(404, 'Not found');
  }),
];

function addTaskToList(task: Task): Task {
  const ids = tasks.map((t) => t.id);
  task.id = Math.max(...ids) + 1;
  tasks.push(task);
  return task;
}


function getError(code = 500, message = 'server error') {
  return new HttpResponse(message, { status: code });
}