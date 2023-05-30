const router = require('express').Router();
const { User } = require('../../models');

// Create new user
router.post('/signUp', async (req, res) => {
  try {
    const userInput = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userInput.id;
      res.redirect("/")
      res.status(200).json(userInput);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const userInput = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userInput) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await userInput.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    console.log("user data values id", userInput.dataValues.id)
    console.log("user input id", userInput.id)
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userInput.id;
      res.redirect("/")
      res
        .status(200)
        .json({ user: userInput, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, the session is destroyed
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect("/login");
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;