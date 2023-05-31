const User = require('./User');
const Exercise = require('./Exercise');
const Workout = require('./Workout');
const Measurement = require('./Measurement');

Workout.hasMany(Exercise, {
    foreignKey: 'workout_id',
    onDelete: 'CASCADE'
});

Exercise.belongsTo(Workout, {
    foreignKey: 'workout_id'
});

Measurement.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Workout, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Measurement, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Exercise, Workout, Measurement }