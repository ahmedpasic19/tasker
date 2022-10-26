import express from 'express'
import {
  assigneTask,
  compleatedTask,
  deleteTask,
  editTask,
  getAllTasks,
  getUserTasks,
} from '../controllers/task.controller'
export const taskRouter = express.Router()

//Assigne / Create taks
taskRouter.post('/', assigneTask)
//Update task to: succes / fail
taskRouter.patch('/:taskId', compleatedTask)
//GET specific task
//GET tasks for user
taskRouter.get('/:userId', getUserTasks)
//GET all task
taskRouter.get('/', getAllTasks)
//DELETE task
taskRouter.delete('/:taskId', deleteTask)
//UPDATE task
taskRouter.put('/:taskId', editTask)