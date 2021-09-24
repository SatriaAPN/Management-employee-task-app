const { 
    TasksService,
    UsersService,
} = require('./postgres');

// services class initialization
const usersService = new UsersService();
const tasksService = new TasksService();


module.exports = { 
    usersService, 
    tasksService
};