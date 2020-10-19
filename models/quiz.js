'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      quiz.hasMany(models.questions);
      quiz.hasMany(models.history);
    }
  };
  quiz.init({
    title: DataTypes.STRING,
    correct: DataTypes.INTEGER,
    wrong: DataTypes.INTEGER,
    totalQuestions: DataTypes.INTEGER,
    timeLimit: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    postedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'quiz',
  });
  return quiz;
};