const sequelize = require('../config/connection');
const { User, Exercise, Workout } = require('../models');
// const seedFILE2 = require('');

const userData = require('./userData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
    // ADD FILES TO BE SEEDED - needs updates
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    //await seedSEEDFILE1();
    //await seedSEEDFILE2();

  process.exit(0);
};

seedAll();