const router = require('express').Router();
const { Measurement } =  require('../../models');

router.post('/myWorkouts', async (req, res) => {
    try {
        const userInput = await Measurement.create({
            weight: req.body.weight,
            waist_circumference: req.body.waist_circumference,
            chest_circumference: req.body.chest_circumference,
            arm_circumference: req.body.arm_circumference,
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