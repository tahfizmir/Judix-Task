import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStats, setLoading as setTaskLoading } from '../store';
import { taskAPI } from '../services/api';

export default function TaskStats() {
  const dispatch = useDispatch();
  const stats = useSelector(state => state.tasks.stats);
  const loading = useSelector(state => state.tasks.loading);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      dispatch(setTaskLoading(true));
      const response = await taskAPI.getStats();
      dispatch(setStats(response.data.stats));
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  if (loading || !stats) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      <div className="card p-6 bg-blue-50 border-l-4 border-l-blue-500">
        <p className="text-gray-600 text-sm font-medium">Total Tasks</p>
        <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
      </div>

      <div className="card p-6 bg-green-50 border-l-4 border-l-green-500">
        <p className="text-gray-600 text-sm font-medium">Completed</p>
        <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
      </div>

      <div className="card p-6 bg-yellow-50 border-l-4 border-l-yellow-500">
        <p className="text-gray-600 text-sm font-medium">In Progress</p>
        <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.inProgress}</p>
      </div>

      <div className="card p-6 bg-red-50 border-l-4 border-l-red-500">
        <p className="text-gray-600 text-sm font-medium">Pending</p>
        <p className="text-3xl font-bold text-red-600 mt-2">{stats.pending}</p>
      </div>

      <div className="card p-6 bg-purple-50 border-l-4 border-l-purple-500">
        <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
        <p className="text-3xl font-bold text-purple-600 mt-2">{stats.completionRate}</p>
      </div>
    </div>
  );
}
