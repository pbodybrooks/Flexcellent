const router = require('express').Router();
const { User, Exercise, Workout } = require('../../models');

// router.post('/api/exercises', async (req, res) => {
    // router.post('/explore', async (req, res) => {
    //     try {
    //       const exerciseExists = await Exercise.checkExercise({
    //         name: req.body.name,
    //         muscle: req.body.musle,
    //         equipment: req.body.equipment,
    //         difficulty: req.body.difficulty,
    //         instructions: req.body.instructions,
    //       }, {
    //         include: [{
    //           model: Workout,
    //           attributes: ['id', 'name'],
    //         }],
    //       });
      
    //       if (exerciseExists) {
    //         // TODO: check the associated workout_id
    //         const workoutId = exerciseExists.Workout.id;
    //         const workoutName = exerciseExists.Workout.name;
    //         res.status(400).json({ message: 'Exercise already collected. Check it out in My Workouts', workoutId, workoutName });
    //         return;
    //       };

    //       const newExercise = await Exercise.create({
    //         name: req.body.name,
    //         muscle: req.body.musle,
    //         equipment: req.body.equipment,
    //         difficulty: req.body.difficulty,
    //         instructions: req.body.instructions,
    //       });
      
    //       // req.session.save()

    //       req.session.save(() => {
    //         req.session.logged_in = true;
    //         req.session.user_id = newExercise.id;
    //         res
    //           .status(200)
    //           .json({ message: 'Exercise created successfully', exercise: newExercise });
    //       });

    //     } catch (err) {
    //       console.log(err);
    //       res.status(500).json(err);
    //     }
    // });

    // TODO: question: /addWorkout is the page i'll be on when the post is created, is that what I put in the first arg?
    // router.post('/exercises', async (req, res) => {
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
          // TODO: do I need to add the workout id to the session again?

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