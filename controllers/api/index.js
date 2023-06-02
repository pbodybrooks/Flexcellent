const router = require('express').Router();
const userRoutes = require('./userRoutes');
const workoutRoutes = require('./workoutRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const weightRoutes = require('./trackerRoutes');
const measureRoutes = require('./measureRoutes');


router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/measurements', measureRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/weight', weightRoutes);

module.exports = router;
