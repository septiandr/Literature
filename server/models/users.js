'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    full_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    photo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};