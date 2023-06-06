const sequelize = require('../config/connection');
const { User, Exercise, Workout, Weight } = require('../models');

const userData = require('./userData.json');
const exerciseData = require('./exerciseData.json');
const workoutData = require('./workoutData.json');
const weightData = require('./weightData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Workout.bulkCreate(workoutData, {
      individualHooks: true,
      returning: true,
    });

    await Exercise.bulkCreate(exerciseData, {
      individualHooks: true,
      returning: true,
    });

    await Weight.bulkCreate(weightData, {
      individualHooks: true,
      returning: true,
    });
    
  process.exit(0);
};

seedAll();