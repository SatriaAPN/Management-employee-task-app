const UserController = require('./user');
const TaskController = require('./task');

const { 
    usersService,
    tasksService
} = require('../../services');

const {
    UsersValidator
} = require('../../validator');

const userController = new UserController(usersService, UsersValidator);
const taskController = new TaskController(tasksService);

module.exports = { userController, taskController };