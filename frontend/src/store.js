import { configureStore, createSlice } from '@reduxjs/toolkit';

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    setAuth: (state, action) => {
      const { user, token } = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      const user = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    }
  }
});

// Task Slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find(t => t._id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t._id !== action.payload);
    },
    resetTasks: (state) => {
      state.tasks = [];
      state.stats = null;
      state.loading = false;
      state.error = null;
    }
  }
});

// Create store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tasks: taskSlice.reducer,
  }
});

// Export actions
export const { setAuth, logout, updateUser } = authSlice.actions;
export const { setTasks, setStats, setLoading, setError, addTask, updateTask, removeTask, resetTasks } = taskSlice.actions;
