const router = require('express').Router();
const userRoutes = require('./userRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const weightRoutes = require('./trackerRoutes');


router.use('/users', userRoutes);
router.use('/workouts', exerciseRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/weight', weightRoutes);

module.exports = router;
