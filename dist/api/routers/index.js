const router = require('express')();

router.use('/api/user', require('./user'));

router.use('/api/task', require('./task'));

module.exports = router;