'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      questions.hasMany(models.options);
      questions.belongsTo(models.quiz);
    }
  };
  questions.init({
    eid: DataTypes.INTEGER,
    question: DataTypes.STRING,
    choice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'questions',
  });
  return questions;
};