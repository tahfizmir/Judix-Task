import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { taskAPI } from '../services/api';
import { useTaskStore } from '../store';

export default function TaskForm({ taskId, initialData, onClose, onSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const addTask = useTaskStore(state => state.addTask);
  const updateTask = useTaskStore(state => state.updateTask);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setApiError('');

      if (taskId) {
        await taskAPI.updateTask(taskId, data);
        updateTask(taskId, data);
      } else {
        const response = await taskAPI.createTask(data);
        addTask(response.data.task);
      }

      onSuccess?.();
      onClose?.();
    } catch (error) {
      setApiError(error.response?.data?.error || 'Failed to save task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {taskId ? 'Edit Task' : 'Create New Task'}
      </h2>

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="input-field"
                placeholder="Task title"
                {...register('title', {
                  required: 'Title is required',
                  maxLength: {
                    value: 100,
                    message: 'Title must not exceed 100 characters'
                  }
                })}
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="input-field min-h-[100px]"
                placeholder="Task description"
                {...register('description', {
                  maxLength: {
                    value: 1000,
                    message: 'Description must not exceed 1000 characters'
                  }
                })}
              />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
            </div>
          </div>

          <div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="input-field" {...register('status')}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="input-field" {...register('priority')}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="input-field"
                {...register('dueDate')}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Task'}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
