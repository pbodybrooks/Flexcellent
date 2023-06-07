const router = require('express').Router();
const { Exercise, Workout } = require('../../models');

// POST a newly created exercise and workout to the database
router.post('/addWorkouts', async (req, res) => {
  try {
    const { workout_name, date_created, name, muscle, sets, reps, eqpWeight } = req.body;
    
    console.log("sets", sets);

    const workout = await Workout.create({
      name: workout_name,
      date_created: date_created,
      user_id: req.session.user_id,
    });

    console.log("workout", workout);

    // Create the exercise
    const exercise = await Exercise.create({
      name: name,
      muscle: muscle,
      sets: sets,
      reps: reps,
      equipment_weight: eqpWeight,
      workout_id: workout.id,
    });

    console.log("exercise", exercise);


    res.status(200).json({
      message: 'Exercise and Workout added successfully',
      workout: workout,
      exercise: exercise,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;