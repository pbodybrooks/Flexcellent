const router = require('express').Router();
const { User, Workout, Exercise } = require('../models');
const withAuth = require('../utils/auth');
const http = require('https');

require('dotenv').config();

router.get('/', withAuth, async (req, res) => {
    if (
        req.session.logged_in == false && !req.session.userid
    ) {
        res.redirect('/login')
        return;
    }
    try {
        console.log(req.session)
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        console.log("userData", userData)

        const users = userData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            users,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/register', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('register');
});

// Below is for workout history page
// get workout history from database -> render workoutHistory.handlebars
router.get('/myWorkouts', withAuth, async (req, res) => {
    // check to make sure user is logged in
    if (!req.session.logged_in) {
        return res.status(404).send('User not logged in');
    }

    try {
        // get workouts from database that belong to the user
        const workoutHistory = await Workout.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        // create an object to store the workout data and the exercises associated with each workout
        const result = {};

        // loop through the workouts and get the exercises associated with each workout
        for (let i = 0; i < workoutHistory.length; i++) {
            const workoutData = workoutHistory[i].dataValues;

            const exercises = await Exercise.findAll({
                where: {
                    workout_id: workoutHistory[i].id
                }
            });
            // create an array to store the exercises associated with each workout
            const exerciseArray = [];
            // loop through the exercises and push them to the array
            for (let j = 0; j < exercises.length; j++) {
                const exercise = exercises[j].dataValues;
                exerciseArray.push(exercise);
            }
            // console.log("exercise array: ", exerciseArray); 
            // add the workout data and the exercises to the result object
            result[workoutHistory[i].id] = {
                "workoutData": workoutData,
                "exercises": exerciseArray
            };
            // console.log("result: ", result);
        }
        // render the result object for user in handlebars
        res.render('workoutHistory', {
            result
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/addWorkouts', withAuth, async (req, res) => {
    try {
        // const userData = await User.findByPk(req.session.user_id, {
        //     attributes: { exclude: ['password'] },
        //     include: [{ model: Workout }],
        // });

        // const user = userData.get({ plain: true });

        res.render('workouts', {
            // ...user,
            // logged_in: true

        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: put this in a helper file and then import it in this file, maybe
const muscleGroupData = [
    { value: 'abdominals', id: 'abdominals', label: 'Abdominals' },
    { value: 'abductors', id: 'abductors', label: 'Abductors' },
    { value: 'adductors', id: 'adductors', label: 'Adductors' },
    { value: 'biceps', id: 'biceps', label: 'Biceps' },
    { value: 'calves', id: 'calves', label: 'Calves' },
    { value: 'chest', id: 'chest', label: 'Chest' },
    { value: 'forearms', id: 'forearms', label: 'Forearms' },
    { value: 'glutes', id: 'glutes', label: 'Glutes' },
    { value: 'hamstrings', id: 'hamstrings', label: 'Hamstrings' },
    { value: 'lats', id: 'lats', label: 'Lats' },
    { value: 'lower_back', id: 'lower_back', label: 'Lower Back' },
    { value: 'middle_back', id: 'middle_back', label: 'Middle Back' },
    { value: 'neck', id: 'neck', label: 'Neck' },
    { value: 'quadriceps', id: 'quadriceps', label: 'Quadriceps' },
    { value: 'traps', id: 'traps', label: 'Traps' },
    { value: 'triceps', id: 'triceps', label: 'Triceps' }
];

router.get('/explore', withAuth, async (req, res) => {
    try {
        let exercises = [];
        console.log("api key", process.env.API_KEY);
        // TODO: create a function that returns this if statement
        if (req.query.muscleGroup) {
            // const url = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${req.query.muscleGroup}`;
            const options = {
                host: 'exercises-by-api-ninjas.p.rapidapi.com',
                path: `/v1/exercises?muscle=${req.query.muscleGroup}`,
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': process.env.API_KEY,
                    'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
                }
            };
            // console.log({ url, options });
            const promise = new Promise((resolve, reject) => {
                const httpReq = http.request(options, function(httpRes) {
                  const chunks = [];
                  httpRes.on('data', function(chunk) {
                    chunks.push(chunk);
                  });
                  httpRes.on('end', function () {
                    const body = Buffer.concat(chunks);
                    resolve(body.toString());
                  });
                })
              
                httpReq.on('error', function(err) {
                  reject(err);
                })
              
                httpReq.end();
              });

            exercises = await promise
                .then(function (response) {
                    console.log({ response });
                    return JSON.parse(response);
                })
                .catch((err) => {
                    console.log({ err });
                    return [];
                })
        }

        console.log({ exercises });

        res.render('explore', {
            layout: 'main',
            logged_in: req.session.logged_in,
            exercises,
            muscleGroups: muscleGroupData
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/addWorkouts', withAuth, async (req, res) => {
    try {
        // const userData = await User.findByPk(req.session.user_id, {
        //     attributes: { exclude: ['password'] },
        //     include: [{ model: Workout }],
        // });

        // const user = userData.get({ plain: true });
        

        

        res.render('workouts', {
            // ...user,
            // logged_in: true

        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;