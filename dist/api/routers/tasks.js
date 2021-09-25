const router = require('express')();
const { taskController } = require('../controllers');

router.get('/', taskController.getTasks);

router.get('/:uuid/edit', taskController.getUpdateTask);

module.exports = router;