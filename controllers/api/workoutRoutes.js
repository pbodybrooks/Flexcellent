const router = require('express').Router();
const { Workout } = require('../../models');

router.post('/myWorkouts', async (req, res) => {
    try {
        const workout = await Workout.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log("workout", workout);
    
        req.session.save(() => {
            req.session.logged_in = true;
            req.session.workout_id = workout.id;
            res.status(200).json(workout);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;