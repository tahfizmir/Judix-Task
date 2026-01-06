import express from 'express';
import { authMiddleware } from '../middleware.js';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTasksStats
} from '../controllers/taskController.js';
import { createTaskValidator, updateTaskValidator, validate } from '../validators.js';

const router = express.Router();

// Apply auth middleware to all task routes
router.use(authMiddleware);

// Tasks routes
router.post('/', createTaskValidator, validate, createTask);
router.get('/', getTasks);
router.get('/stats', getTasksStats);
router.get('/:id', getTask);
router.patch('/:id', updateTaskValidator, validate, updateTask);
router.delete('/:id', deleteTask);

export default router;
