//TODO: include workouts, exercises, measurements, explore... maybe?
const router = require('express').Router();
const { User, Workout } = require('../../models');

router.post('/myWorkouts', async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;