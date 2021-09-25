const router = require('express')();
const { taskController } = require('../controllers');

router.get('/', taskController.getTasks);

module.exports = router;