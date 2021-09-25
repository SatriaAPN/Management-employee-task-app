const UserController = require('./user');
const TaskController = require('./task');

const { 
    usersService,
    tasksService
} = require('../../services');

const {
    UsersValidator,
    TasksValidator
} = require('../../validator');

const userController = new UserController(usersService, UsersValidator);
const taskController = new TaskController(tasksService, TasksValidator);

module.exports = { userController, taskController };