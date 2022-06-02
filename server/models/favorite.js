'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      favorite.belongsTo(models.users, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      }),
      favorite.belongsTo(models.literature, {
        as: "literature",
        foreignKey: {
          name: "idLiterature",
        },
      });
    }
  };
  favorite.init({
    idUser: DataTypes.INTEGER,
    idLiterature: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favorite',
  });
  return favorite;
};