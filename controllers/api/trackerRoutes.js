const router = require('express').Router();
const { Weight } = require('../../models');

router.post('/add', async (req, res) => {
    if (!req.session.logged_in) {
        return res.status(404).send('User not logged in');
    }

    try {
        const { weight, date } = req.body;
        const userId = req.session.userid;
        await Weight.create({ userId, weight, date });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/retriever', async (req, res) => {
    if (!req.session.logged_in) {
        return res.status(404).send('User not logged in');
    }

    try {
        const userId = req.session.userid;
        const weights = await Weight.findAll({ where: { userId } });
        res.status(200).json({ userId, weights });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.put('/update', async (req, res) => {
    if (!req.session.logged_in) {
        return res.status(404).send('User not logged in');
    }
    const userId = req.session.userid;
    const { weight, date } = req.body;
    await Weight.update({ weight, date }, { where: { userId } });

    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
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