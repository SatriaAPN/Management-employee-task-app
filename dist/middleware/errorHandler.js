const NotFoundError = require('../exceptions/NotFoundError');

module.exports = (err, req, res, next) => {
    if(err){
        const statusCode = err.statusCode || 401;
        const message = err.message || 'no message';

        if(err instanceof NotFoundError){
            res.status(statusCode).render('./public/404');
        }else{
            res.status(statusCode).json({message});
        }
    }
    next();
}