import { queryOptions } from '@tanstack/react-query';
import { fetchTaks } from '../infraestructure/TaksRepository';

export const queriesFactory = {
  getTaskLists: () => {
    return queryOptions({
      queryKey: ['tasksList'],
      queryFn: fetchTaks
    });
  }
};