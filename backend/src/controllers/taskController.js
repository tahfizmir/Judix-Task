import { Task } from '../models/Task.js';

// Create task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.userId
    });

    await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};

// Get all tasks for user
export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;
    const filter = { userId: req.userId };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.json({
      count: tasks.length,
      tasks
    });
  } catch (error) {
    next(error);
  }
};

// Get single task
export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, userId: req.userId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
};

// Update task
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: Date.now() };

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};

// Delete task
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get tasks statistics
export const getTasksStats = async (req, res, next) => {
  try {
    const total = await Task.countDocuments({ userId: req.userId });
    const completed = await Task.countDocuments({ userId: req.userId, status: 'completed' });
    const pending = await Task.countDocuments({ userId: req.userId, status: 'pending' });
    const inProgress = await Task.countDocuments({ userId: req.userId, status: 'in-progress' });

    res.json({
      stats: {
        total,
        completed,
        pending,
        inProgress,
        completionRate: total > 0 ? ((completed / total) * 100).toFixed(2) + '%' : '0%'
      }
    });
  } catch (error) {
    next(error);
  }
};
