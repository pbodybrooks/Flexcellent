const router = require('express').Router();
const { User, Workout, Exercise } = require('../models');
const withAuth = require('../utils/auth');
const http = require('https');

require('dotenv').config();

router.get('/', withAuth, async (req, res) => {
    if (!req.session.logged_in || !req.session.user_id) {
        res.redirect('/login');
        return;
    }
    try {
        console.log("sesh", req.session)
        const user = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const userData = user.get({ plain: true });
        console.log("userData", userData)

        res.render('homepage', {
            user: userData,
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

router.get('/myWorkouts', withAuth, async (req, res) => {
    if (!req.session.logged_in || !req.session.user_id) {
        res.redirect('/login');
        // return res.status(404).send('User not logged in');
        return;
    }

    try {
        const workoutHistory = await Workout.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: Exercise,
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
            // add the workout data and the exercises to the result object
            result[workoutHistory[i].id] = {
                "workoutData": workoutData,
                "exercises": exerciseArray
            };
        }
        // render the result object for user in handlebars
        res.render('workoutHistory', {
            layout: 'main',
            result,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

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

const fetchExercises = (muscleGroup) => {
    return new Promise((resolve, reject) => {
        const options = {
            host: 'exercises-by-api-ninjas.p.rapidapi.com',
            path: `/v1/exercises?muscle=${muscleGroup}`,
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
            }
        };

        const httpReq = http.request(options, function (httpRes) {
            const chunks = [];
            httpRes.on('data', function (chunk) {
                chunks.push(chunk);
            });
            httpRes.on('end', function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        httpReq.on('error', function (err) {
            reject(err);
        });

        httpReq.end();
    });
};

router.get('/explore', withAuth, async (req, res) => {
    try {
        let exercises = [];


        if (req.query.muscleGroup) {
            const response = await fetchExercises(req.query.muscleGroup);

            exercises = JSON.parse(response);
        }

        console.log({ exercises });

        res.render('explore', {
            layout: 'main',
            exercises,
            muscleGroups: muscleGroupData,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/addWorkouts', withAuth, async (req, res) => {
    try {
        res.render('workouts', {
            muscleGroups: muscleGroupData,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;