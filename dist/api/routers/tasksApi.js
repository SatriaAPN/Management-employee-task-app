const router = require('express')();
const { taskController } = require('../controllers');

// router.get('/', taskController.getAllDailyTask);

router.post('/create', taskController.postCreateTask);

router.get('/:uuid/delete', taskController.getDeleteTask);

router.post('/:uuid/edit', taskController.postUpdateTask);

module.exports = router;