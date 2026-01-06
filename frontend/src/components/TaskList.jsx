import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { taskAPI } from '../services/api';
import { removeTask as removeTaskAction } from '../store';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, loading, onTaskUpdate }) {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskAPI.deleteTask(id);
      dispatch(removeTaskAction(id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  if (loading) {
    return (
      <div className="card p-12 text-center">
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-gray-600 text-lg">No tasks yet. Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tasks ({tasks.length})</h2>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={handleDelete}
          onUpdate={onTaskUpdate}
          isEditing={editingId === task._id}
          setEditingId={setEditingId}
        />
      ))}
    </div>
  );
}
