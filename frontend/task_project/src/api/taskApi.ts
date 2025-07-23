import axios from 'axios';
import type { Task } from '../types/Task';

const API = '/api/tasks/';

export const taskApi = {
  fetchAll: async (): Promise<Task[]> => {
    const response = await axios.get(API);
    return response.data;
  },

  create: async (title: string): Promise<Task> => {
    const response = await axios.post(API, { title });
    return response.data;
  },

  complete: async (id: number, completed: boolean): Promise<Task> => {
    const response = await axios.patch(`${API}${id}/`, { completed });
    return response.data;
  }
};
