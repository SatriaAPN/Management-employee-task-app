class UserController{
    constructor(service, validator){
        this._service = service;
    }

    async userRegister(req, res, next){
        try{
            await validator.validateUserRegister(req.body);

            const { name, email, password } = req.body;

            const userRegistered = await this._service.createUser(name, email, password);

            res.status(201).json({});
        }catch(err){
            next(err);
        }
    }
}

module.exports = UserController;