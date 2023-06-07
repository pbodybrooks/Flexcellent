const router = require('express').Router();
const { Weight } = require('../../models');
const { Op } = require("sequelize");

// add/create a new user weight data point (used for weight tracking - dashboard)
router.post('/add', async (req, res) => {
    if (!req.session.logged_in) {
        return res.status(404).send('User not logged in');
    }

    try {
        const { weight, date } = req.body;
        const userId = req.session.user_id;
        await Weight.create({ userId, weight, date });
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get all weight data points for the user (used for weight tracking - dashboard)
router.get('/retriever', async (req, res) => {
    if (!req.session.logged_in) {
        return res.status(404).send('User not logged in');
    }

    try {
        const userId = req.session.user_id;
        console.log(req.session.userid)
        const weights = await Weight.findAll({ attributes: ["id", ["weight", 'y'], ['date', 'x']], where: { userId } });
        res.status(200).json({ userId, weights });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// update a weight data point for the user (used for weight tracking - dashboard)
router.put('/update', async (req, res) => {
    if (!req.session.logged_in) {
        return res.status(404).send('User not logged in');
    }
    const userId = req.session.user_id;
    const { rowId, weight, date } = req.body;
    await Weight.update({ id: rowId, weight: weight, date: date }, { where: { [Op.and]: [{ userId: userId }, { id: rowId }] } });

    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// delete a weight data point for the user (used for weight tracking - dashboard)
router.delete('/delete', async (req, res) => {
    if (!req.session.logged_in) {
        return res.status(404).send('User not logged in');
    }

    try {
        const rowId = req.body.rowId; await Weight.destroy({ where: { id: rowId } });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;