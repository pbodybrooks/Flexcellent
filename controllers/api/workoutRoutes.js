//TODO: include workouts, exercises, measurements, explore... maybe?
const router = require('express').Router();
const { Workout } = require('../../models');

router.post('/myWorkouts', async (req, res) => {
    try {
        const userInput = await Workout.create({
            description: req.body.description,
            date_created: req.body.date_created
        });

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userInput.user_id;
            res.status(200).json(userInput);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;