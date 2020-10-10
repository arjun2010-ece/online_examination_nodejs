const db = require("../models/index");
const quiz = require("../models/quiz");
const quizModal = quiz(db.sequelize, db.Sequelize.DataTypes);

exports.createQuiz = (req) => {
    let newQuiz = {
        title: req.body.title,
        totalQuestions: req.body.totalQuestions,
        correct: req.body.correct,
        wrong: req.body.wrong,
        timeLimit: req.body.timeLimit,
        description: req.body.description
    };
    const quiz = quizModal.create(newQuiz);
    return quiz;
}

exports.getAllQuiz = (req) => {
    const quizs =  quizModal.findAll();
    return quizs;
}

exports.deleteQuiz = (req) => {
    const quizs =  quizModal.destroy({
        where: {
            id: req.params.quizId
        }
    });
    return quizs;
}