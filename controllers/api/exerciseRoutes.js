const router = require('express').Router();
const { Exercise } = require('../../models');

// post a newly created workout to the database (used for Create a New Workout)
router.post('/addWorkouts', async (req, res) => {
  try {
    const workout_id = req.session.workout_id;

    const exercise = await Exercise.create({
      name: req.body.name,
      muscle: req.body.muscle,
      sets: req.body.sets,
      reps: req.body.reps,
      equipment_weight: req.body.eqpWeight,
      workout_id: workout_id,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.exercise_id = exercise.id;
      res
        .status(200)
        .json({ message: 'Exercise added successfully', exercise: exercise })
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
      

module.exports = router;