const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Measurement extends Model {}

Measurement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    waist_circumference: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    chest_circumference: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    arm_circumference: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
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
    modelName: 'measurement',
  }
);

module.exports = Measurement;