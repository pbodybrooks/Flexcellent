const User = require('./User');
const Exercise = require('./Exercise');
const Workout = require('./Workout');
const Weight = require('./Weight');

Workout.hasMany(Exercise, {
    foreignKey: 'workout_id',
    onDelete: 'CASCADE'
});

Exercise.belongsTo(Workout, {
    foreignKey: 'workout_id'
});

// TODO: Don't think this is needed because we are not tying exercises directly to users
// instead, exercises are tied to the workout, which is tied to the user!
// User.hasMany(Exercise, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// });

User.hasMany(Workout, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Weight, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Exercise, Workout, Weight }