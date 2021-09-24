const router = require('express')();

router.use('/api/palembang', require('./palembang'));

module.exports = router;