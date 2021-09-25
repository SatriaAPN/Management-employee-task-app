const router = require('express')();
const { taskController } = require('../controllers');

// router.get('/', taskController.getAllDailyTask);

router.post('/create', taskController.postCreateTask);

module.exports = router;