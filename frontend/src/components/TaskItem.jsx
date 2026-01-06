import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskAPI } from '../services/api';
import { updateTask as updateTaskAction } from '../store';

export default function TaskItem({ task, onDelete, onUpdate, isEditing, setEditingId }) {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(task);

  const handleStatusChange = async (newStatus) => {
    try {
      await taskAPI.updateTask(task._id, { status: newStatus });
      dispatch(updateTaskAction({ id: task._id, updates: { status: newStatus } }));
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleSave = async () => {
    try {
      await taskAPI.updateTask(task._id, editData);
      dispatch(updateTaskAction({ id: task._id, updates: editData }));
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="card p-6 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
      {isEditing ? (
        // Edit Mode
        <div className="space-y-4">
          <input
            type="text"
            className="input-field"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          />
          <textarea
            className="input-field min-h-[100px]"
            value={editData.description || ''}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
          <div className="grid grid-cols-3 gap-4">
            <select
              className="input-field"
              value={editData.status}
              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className="input-field"
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              className="input-field"
              value={editData.dueDate ? new Date(editData.dueDate).toISOString().split('T')[0] : ''}
              onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary">Save</button>
            <button onClick={() => setEditingId(null)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      ) : (
        // View Mode
        <>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
              {task.description && (
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => setEditingId(task._id)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-600 hover:text-red-800 font-medium text-sm"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
              {task.status.replace('-', ' ')}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="text-sm text-gray-600">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="input-field text-sm"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
}
