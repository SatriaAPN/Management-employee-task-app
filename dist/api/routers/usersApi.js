const router = require('express')();
const { userController } = require('../controllers');

router.post('/register', userController.postUserRegister);

router.post('/login', userController.postUserLogin);

router.get('/logout', userController.getUserLogout)

module.exports = router;