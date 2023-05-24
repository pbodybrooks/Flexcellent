const sequelize = require('../config/connection');
// const seedFILE1 = require('');
// const seedFILE2 = require('');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
    // ADD FILES TO BE SEEDED
    //await seedSEEDFILE1();
    //await seedSEEDFILE2();

  process.exit(0);
};

seedAll();