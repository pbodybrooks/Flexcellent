const User = require('./User');
const Exercise = require('./Exercise');
const Workout = require('./Workout');

Workout.hasMany(Exercise, {
    foreignKey: 'workout_id',
    onDelete: 'CASCADE'
});

Exercise.belongsTo(Workout, {
    foreignKey: 'workout_id'
});

// TO DO: Make sure this is correct
User.hasMany(Workout, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Exercise, Workout}