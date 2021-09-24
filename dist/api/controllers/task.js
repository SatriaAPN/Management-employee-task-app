class TaskController{
    constructor(service){
        this._service = service;
    }

    async getAllDailyTask(req, res, next){
        try{
            
        }catch(err){
            next(err);
        }
    }
}

module.exports = TaskController;