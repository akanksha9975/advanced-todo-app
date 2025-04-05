import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  currentFilter: 'all',
  loading: false,
  error: null
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskStart(state) {
      state.loading = true;
      state.error = null;
    },
    addTaskSuccess(state, action) {
      state.tasks.push(action.payload);
      state.loading = false;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    addTaskFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTaskPriority(state, action) {
      const { id, priority } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.priority = priority;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    setFilter(state, action) {
      state.currentFilter = action.payload;
    }
  }
});

export const { 
  addTaskStart, 
  addTaskSuccess, 
  addTaskFailure,
  deleteTask,
  updateTaskPriority,
  setFilter
} = tasksSlice.actions;

export default tasksSlice.reducer;