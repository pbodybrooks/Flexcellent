const router = require('express').Router();
const { User, Workout } = require('../models');
const withAuth = require('../utils/auth');

router.get('/home', withAuth, async (req, res) => {
    try {
        const userInput = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const users = userInput.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            users, 
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/signUp', withAuth, async (req, res) => {
//     try {
//         const userInput = await User.findAll({
//             attributes: { exclude: ['password'] },
//             order: [['name', 'ASC']],
//         });

//         const users = userInput.map((project) => project.get({ plain: true }));

//         res.render('homepage', {
//             users, 
//             logged_in: req.session.logged_in,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/signUp', (req, res) => {
    // if (req.session.logged_in) {
    //     res.redirect('/');
    //     return;
    // }

    res.render('signup');
});

// router.get('//:id')

router.get('/explore', withAuth, async (req, res) => {
    try {
        const userInput = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Workout }],
        });

        // const user = userInput.get({ plain: true });

        res.render('explore', {
            // ...user,
            // logged_in: true
        });    
    } catch (err) {
        res.status(500).json(err);
    }
})

// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/');
//         return;
//     }

//     res.render('login');
// });


router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});




module.exports = router;

// TODO: will need routes for: login, home, myworkouts, explore
// TODO: might need routes for: home/rewards