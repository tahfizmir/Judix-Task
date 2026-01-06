import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { taskAPI, authAPI } from '../services/api';
import { setTasks, setLoading } from '../store';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskStats from '../components/TaskStats';
import UserProfile from '../components/UserProfile';

export default function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const tasks = useSelector(state => state.tasks.tasks);
  const loading = useSelector(state => state.tasks.loading);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch tasks on mount and filter change
  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      dispatch(setLoading(true));
      const response = await taskAPI.getTasks({
        status: filters.status || undefined,
        priority: filters.priority || undefined,
        search: filters.search || undefined
      });
      dispatch(setTasks(response.data.tasks));
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Judix Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <UserProfile />
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        {/* Stats Section */}
        <TaskStats />

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="form-label">Status</label>
              <select
                className="input-field"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="form-label">Priority</label>
              <select
                className="input-field"
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="form-label">Search</label>
              <input
                type="text"
                className="input-field"
                placeholder="Search tasks..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-primary w-full"
              >
                {showForm ? 'Cancel' : 'New Task'}
              </button>
            </div>
          </div>
        </div>

        {/* Task Form */}
        {showForm && (
          <TaskForm
            onClose={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false);
              fetchTasks();
            }}
          />
        )}

        {/* Tasks List */}
        <TaskList tasks={tasks} loading={loading} onTaskUpdate={fetchTasks} />
      </div>
    </div>
  );
}
