const router = require('express')();

router.use('/users', require('./users'));

router.use('/api/users', require('./usersApi'));

router.use('/api/tasks', require('./tasksApi'));

router.use('/404', require('./notFound'));

router.use('/', require('./tasks'));

router.use('/*', (req, res, next) => {
    res.status(404).render('./public/404')
})

module.exports = router;