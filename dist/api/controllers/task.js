class TaskController{
    constructor(service){
        this._service = service;

        this.getTasks = this.getTasks.bind(this);

        this.postCreateTask = this.postCreateTask.bind(this);
        this.getDeleteTask = this.getDeleteTask.bind(this);
        this.getUpdateTask = this.getUpdateTask.bind(this);
        this.postUpdateTask = this.postUpdateTask.bind(this);
    }

    async postCreateTask(req, res, next){
        try{
            console.log('create')
            if(!req.user){
                return res.status(400).redirect('/api/users/logout');
            }

            if(req.user.role != "employee"){
                return res.status(202).render('./public/tasksManagement', { data: { tasks } });
            }

            const { title, description } = req.body;
console.log('create')
            const task = await this._service.createTask(req.user.sub, title, description);
console.log(task);
            res.status(202).redirect('/');
        }catch(err){
            next(err);
        }
    }

    async getTasks(req, res, next){
        try{
            console.log('here')
            console.log(req.user)
            if(!req.user){
                return res.status(400).redirect('/api/users/logout');
            }

            if(req.user.role == "manager"){
                const tasks = await this._service.getAllTasks();
console.log(tasks)
                return res.status(202).render('./public/tasksManagement', { user: req.user, data: { tasks } });
            }else if(req.user.role == "employee"){
                const user = await this._service.getUserTasksByUserUuid(req.user.sub);

                return res.status(202).render('./public/tasksManagement', { user: req.user, data: { tasks: user.tasks } });
            }
        }catch(err){
            next(err);
        }
    }

    async getDeleteTask(req, res, next){
        try{
            console.log('tas')
            const { uuid } = req.params;

            await this._service.deleteTaskByUuid(uuid);

            res.status(203).redirect('/');
        }catch(err){
            next(err);
        }
    }

    async getUpdateTask(req, res, next){
        try{
            console.log('here')
            console.log(req.params)
            const { uuid } = req.params;

            const task = await this._service.getTaskByUuid(uuid);
console.log(task)
            res.status(200).render('./public/editTask', {user: req.user, data: { task }});
        }catch(err){
            next(err);
        }
    }

    async postUpdateTask(req, res, next){
        try{
            const { uuid } = req.params;
            const { title, description } = req.body;

            await this._service.updateTask(uuid, title, description);

            res.status(201).redirect('/');
        }catch(err){
            next(err);
        }
    }
}

module.exports = TaskController;