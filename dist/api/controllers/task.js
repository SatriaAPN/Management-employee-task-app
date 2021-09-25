class TaskController{
    constructor(service){
        this._service = service;

        this.getTasks = this.getTasks.bind(this);

        this.postCreateTask = this.postCreateTask.bind(this);
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
            res.status(202).json({task});
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
}

module.exports = TaskController;