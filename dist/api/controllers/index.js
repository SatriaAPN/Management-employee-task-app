const UserController = require('./user');
const TaskController = require('./task');


const userController = new UserController();
const taskController = new TaskController();

module.exports = { userController, taskController };