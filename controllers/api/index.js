const router = require('express').Router();
const userRoutes = require('./userRoutes');
const workoutRoutes = require('./workoutRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const weightRoutes = require('./trackerRoutes');


router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/weight', weightRoutes);

module.exports = router;
