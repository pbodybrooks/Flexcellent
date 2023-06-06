//TODO: include workouts, exercises, measurements, explore... maybe?
const router = require('express').Router();
const { Workout } = require('../../models');

// router.post('/workouts', async (req, res) => {
// router.post('/addWorkouts', async (req, res) => {
router.post('/myWorkouts', async (req, res) => {
    try {
        const workout = await Workout.create({
            // date_created: req.body.date_created
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log("workout", workout);
    
        req.session.save(() => {
            req.session.logged_in = true;
            req.session.workout_id = workout.id;
            // req.session.user_id = workout.user_id;
            res.status(200).json(workout);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;