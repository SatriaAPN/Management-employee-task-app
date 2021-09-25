const TokenManager = require('../../config/lib/tokenize/TokenManager');

class UserController{
  constructor(service, validator){
    this._service = service;

    this._validator = validator;

    this._TokenManager = TokenManager;

    this.postUserRegister = this.postUserRegister.bind(this);
    this.postUserLogin = this.postUserLogin.bind(this);
  }

  async getUserRegister(req, res, next){
    try{
      if(req.user){
        return res.status(200).redirect(`/`);
      }

      res.status(200).render('./public/usersRegister');
    }catch(err){
      next(err);
    }
  }

  async postUserRegister(req, res, next){
    try{
      if(req.user){
        return res.status(200).redirect(`/`);
      }

      await this._validator.validateUserRegister(req.body);

      const { name, email, password, role } = req.body;

      const userRegistered = await this._service.createUser(name, email, password, role);

      const tokenData = await this._TokenManager.generateJwtToken(userRegistered.uuid, userRegistered.role)

      res.setHeader('Set-Cookie', [`token=${tokenData.token}; path=/; expires= ${tokenData.date};Secure; HttpOnly`]);
      res.status(201).redirect('/');
    }catch(err){
      req.pg = './public/usersRegister';
      next(err);
    }
  }

  async getUserLogin(req, res, next){
    try{
      if(req.user){
        return res.status(200).redirect(`/`);
      }

      res.status(200).render('./public/loginPage');
    }catch(err){
      next(err);
    }
  }

  async postUserLogin(req, res, next) {
    try{
      if(req.user){
        return res.status(200).redirect('/users');
      }

      this._validator.validateUserLogin(req.body);

      const { email, password } = req.body;

      const user = await this._service.userLogin(email, password);

      const tokenData = await this._TokenManager.generateJwtToken(user.uuid, user.role)

      res.setHeader('Set-Cookie', [`token=${tokenData.token}; path=/; expires= ${tokenData.date};Secure; HttpOnly`]);
      res.status(200).redirect('/');
    }catch(error){
      req.pg = './public/loginPage';
      next(error);
    }
  }

  async getUserLogout (req, res, next) {
    try{
      res.setHeader('Set-Cookie', [`token= ; path=/`]);
      res.status(200).redirect('/users/login');
    }catch(err){
      next(err);
    }
  }
}

module.exports = UserController;