var express = require('express');

const quizRouter = require("./quiz");

let registerApp = function(app){
    app.use("/api/quiz/", quizRouter)
}

module.exports = registerApp;
