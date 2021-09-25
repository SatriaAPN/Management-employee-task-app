const router = require('express')();
const { userController } = require('../controllers');

router.get('/register', userController.getUserRegister);

router.get('/login', userController.getUserLogin);

module.exports = router;