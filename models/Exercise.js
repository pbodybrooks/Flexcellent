const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Exercise extends Model {}

Exercise.init(
  {
    // assigns each exercise a unique, auto-incrementing id.
    //    - this will not be used for anything in the app
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // name of the exercise (ex. "Dumbbell Bench Press", "High-Bar Squat", etc.)
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // primary muscle group targeted by the exercise
    muscle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // number of sets per exercise
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // number of reps per set
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // equipment_weight is the weight of the equipment used for the exercise (60lb dumbbells,135lb barbell, etc.)
    equipment_weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // workout_id ties each exercise to a workout
    workout_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'workout',
        key: 'id',
      },
    },
    // We dont think this is needed - exercises are tied to users indirectly via workouts
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   },
    // },
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