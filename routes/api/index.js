const router = require('express').Router();
const userRoutes = require('./users-routes');
const thoughtsRoutes = require('./thoughts-routes');


router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtsRoutes);

module.exports = router;

