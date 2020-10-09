'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      history.belongsTo(models.quiz);
    }
  };
  history.init({
    email: DataTypes.STRING,
    eid:DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    right: DataTypes.INTEGER,
    wrong: DataTypes.INTEGER,
    trieddate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'history',
  });
  return history;
};