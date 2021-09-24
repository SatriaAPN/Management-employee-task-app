const router = require('express')();
const { userController } = require('../controllers');

router.get('/register', userController.getHotel);

router.post('/register', userController.getHotel);

router.get('/login', userController.getHotel);

router.post('/login', userController.getHotel);

module.exports = router;