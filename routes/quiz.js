var express = require('express');
var router = express.Router();

const {createQuizController,createQuestionsInQuizController, 
    startQuizController, deleteQuestionsInQuizController,
    finishQuizController, getAllQuizController,
    deleteQuizController} = require("../controllers/quiz.controller");

router.post("/create",  createQuizController);
router.post("/questions/create",  createQuestionsInQuizController);
router.get("/all",  getAllQuizController);
router.get("/start/:quizId",  startQuizController);
router.delete("/delete/:quizId",  deleteQuizController);
router.delete("/question/delete/:qid",  deleteQuestionsInQuizController);
router.post("/finish/:quizId",  finishQuizController);

module.exports = router;
