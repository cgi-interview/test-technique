import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Task } from '../../types/Task';
import { taskApi } from '../../api/taskApi';

type TaskState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchAll', taskApi.fetchAll);
export const createTask = createAsyncThunk('tasks/create', taskApi.create);
export const completeTask = createAsyncThunk(
  'tasks/complete',
  async ({ id, completed }: { id: number; completed: boolean }) => {
    return await taskApi.complete(id, completed);
  }
);
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur de chargement';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
