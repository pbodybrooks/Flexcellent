const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// DEFINITION OF WORKOUT MODEL
// A WORKOUT IS A COLLECTION OF EXERCISES - FOR EXAMPLE:
// A "CHEST AND TRICEPS" WORKOUT MAY INCLUDE THE FOLLOWING EXERCISES:
//    - DUMBBELL BENCH PRESS
//    - DUMBBELL FLY
//    - TRICEPS PUSHDOWN
//    - TRICEPS DIP
//    - ETC.

class Workout extends Model {}

Workout.init(
  {
    // identifies each workout by a unique, auto-incrementing id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // optional - name your workout (ex. "Leg Day", "Chest and Triceps" etc.)
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // date will be automatically generated and used in the heading of workout cards in workout history
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    // optional: enter the duration of your workout in minutes (ex. 50 minutes) 
    //    - clicking "complete workout" will ask user if they want to enter a duration
    workout_duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // user_id ties a workout to a user
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'workout',
  }
);

module.exports = Workout;