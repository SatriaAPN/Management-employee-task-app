const { TaskModel, UserModel } = require('../../models');
const { nanoid } = require('nanoid');

const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
    constructor(UsersService){
        this._UsersService = UsersService;

        this._Task = TaskModel;
        this._User = UserModel;

        this.getUserTasksByUserUuid = this.getUserTasksByUserUuid.bind(this);
    }

    async createTask(employeeUuid, title, description){
        console.log('here')
        const employee = await this._UsersService.getUserByUuid(employeeUuid);
console.log('here2')
        // Create the user in the database
        const task = await this._Task.create({
            uuid: nanoid(16),
            title,
            employeeId: employee.id,
            description,
        });
        console.log('here3')
        return task;
    }

    async getAllTasks(){
        const tasks = await this._Task.findAll({
            include: [{
                model: this._User,
                as: 'employee'
            }]
        });

        return tasks;
    }

    async getUserTasksByUserUuid(uuid){
        const tasks = await this._UsersService.getUserWithTasks(uuid);

        return tasks;
    }

    async verifyTaskByUuid(uuid){
        const task = await this._Task.findOne({
            where: { uuid }
        })

        if(!task){
            throw new InvariantError('task tidak ditemukan')
        }
    }

    async deleteTaskByUuid(uuid){
        await this.verifyTaskByUuid(uuid);

        const task = await this._Task.findOne({
            where: { uuid }
        })

        await task.destroy();
    }

    async getTaskByUuid(uuid){
        await this.verifyTaskByUuid(uuid);

        const task = await this._Task.findOne({
            where: { uuid }
        })

        return task;
    }

    async updateTask(uuid, title, description){
        await this.verifyTaskByUuid(uuid);

        const task = await this.getTaskByUuid(uuid);

        task.title = title;
        task.description = description;

        await task.save();
    }
}

module.exports = UsersService;