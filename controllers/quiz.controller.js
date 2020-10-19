const {createQuiz, createQuestionsInQuiz, 
    startQuiz, finishQuiz, 
    deleteQuestionsInQuiz,
    getAllQuiz,
    deleteQuiz} = require("../services/quiz.service");

exports.createQuizController = (req, res) => {
    createQuiz(req).then(data => {
        res.status(200).json({
            message: "Success...",
            data: data
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
    
}

exports.createQuestionsInQuizController = (req, res) => {
    createQuestionsInQuiz(req).then(data => {
        res.status(200).json({
            message: "Success...",
            data: data
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
    
}

exports.deleteQuestionsInQuizController = (req, res) => {
    deleteQuestionsInQuiz(req).then(data => {
        res.status(200).json({
            message: "Success.",
            data: data
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.startQuizController = (req, res) => {
    startQuiz(req).then(data => {
        res.status(200).json({
            message: "Success...",
            data: data
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.finishQuizController = (req, res) => {
    finishQuiz(req).then((data) => {
        res.status(200).json({
            message: "Finished the quiz.",
            data: data
        });
    })
    .catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.getAllQuizController = (req, res) => {
    getAllQuiz(req).then((data) => {
        res.status(200).json({
            message: "List of all the quizs.",
            data: data
        });
    })
    .catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.deleteQuizController = (req, res) => {
    const msg = deleteQuiz(req);
    res.status(200).json({
        message: "Deleted.",
        data: msg
    });
}