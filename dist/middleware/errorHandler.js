const NotFoundError = require('../exceptions/NotFoundError');

module.exports = (err, req, res, next) => {
    if(err){
        const statusCode = err.statusCode || 401;
        const message = err.message || 'no message';
        const page = req.pg || './public/404';

        if(err instanceof NotFoundError){
            res.status(statusCode).render('./public/404');
        }else{
            res.status(statusCode).render(page, { errorMessage: message });
        }
    }
    next();
}