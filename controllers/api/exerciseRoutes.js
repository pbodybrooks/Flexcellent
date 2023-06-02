const router = require('express').Router();
const { User, Exercise, Workout } = require('../../models');

// router.post('/api/exercises', async (req, res) => {
    router.post('/explore', async (req, res) => {
        try {
          const exerciseExists = await Exercise.checkExercise({
            name: req.body.name,
            muscle: req.body.musle,
            equipment: req.body.equipment,
            difficulty: req.body.difficulty,
            instructions: req.body.instructions,
          }, {
            include: [{
              model: Workout,
              attributes: ['id', 'name'],
            }],
          });
      
          if (exerciseExists) {
            // TODO: check the associated workout_id
            const workoutId = exerciseExists.Workout.id;
            const workoutName = exerciseExists.Workout.name;
            res.status(400).json({ message: 'Exercise already collected. Check it out in My Workouts', workoutId, workoutName });
            return;
          };

          const newExercise = await Exercise.create({
            name: req.body.name,
            muscle: req.body.musle,
            equipment: req.body.equipment,
            difficulty: req.body.difficulty,
            instructions: req.body.instructions,
          });
      
          // req.session.save()

          req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = newExercise.id;
            res
              .status(200)
              .json({ message: 'Exercise created successfully', exercise: newExercise });
          });

        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    });
      

module.exports = router;