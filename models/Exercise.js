const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Exercise extends Model {
  // static async checkExercise(allParams) {
  //   const exercise = await Exercise.findOne({
  //     where: allParams
  //   });

  //   // Returns true if exercise exists, false otherwise 
  //   return exercise !== null; 
  // }
}

Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    muscle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'exercise',
  }
);

module.exports = Exercise;