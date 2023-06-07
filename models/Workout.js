const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
    // optional - reference exercise muscle for the heading of workout cards in workout history
    muscle_group: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: 'exercise',
          key: 'muscle',
        },
    },
    // date will be automatically generated and used in the heading of workout cards in workout history
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    // optional: enter the duration of your workout in minutes (ex. 50 minutes) 
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