const db = require("../models/index");
const quiz = require("../models/quiz");
const quizModal = quiz(db.sequelize, db.Sequelize.DataTypes);
const questions = require("../models/questions");
const questionsModal = questions(db.sequelize, db.Sequelize.DataTypes);
const options = require("../models/options");
const optionsModal = options(db.sequelize, db.Sequelize.DataTypes);
const answer = require("../models/answer");
const answerModal = answer(db.sequelize, db.Sequelize.DataTypes);
const history = require("../models/history");
const historyModal = history(db.sequelize, db.Sequelize.DataTypes);
const _ = require("lodash");


exports.createQuiz = (req) => {
    let newQuiz = {
        title: req.body.title,
        totalQuestions: parseInt(req.body.totalQuestions),
        correct: parseInt(req.body.correct),
        wrong: parseInt(req.body.wrong),
        timeLimit: parseInt(req.body.timeLimit),
        description: req.body.description
    };
    const quiz = quizModal.create(newQuiz);
    return quiz;
}

exports.createQuestionsInQuiz = async (req) => {
        const { questionList} = req.body;
        // let quizExists = await quizModal.findByPk(quizId);
        let qList = questionList.map(el => _.omit(el, ["option"])) || [];
        let questions = await questionsModal.bulkCreate(qList);
        let formattedQuestions = questions.map(data => {
            return data.toJSON();
        });
        //insert into options
        let ops = [];
        let ans = [];
        questionList.map(q => {
            let d = formattedQuestions.filter(f => f.question === q.question);
            if(d){
                let qid = d[0].id;
                let option = q.option;
                let ansValue = q.answer;
                ops.push({qid, option });
                ans.push({qid, answerValue: ansValue });
            }
        })
        await optionsModal.bulkCreate(ops);
        await answerModal.bulkCreate(ans);

        return {
            ops, ans,formattedQuestions 
        };
}

exports.deleteQuestionsInQuiz = async (req) => {
    let del = await questionsModal.destroy({
        where: {
          id: req.params.qid
        }
      });
    //   console.log("its not deleting....", del);
      if(del){
        return `Question deleted with id: ${req.params.qid}.`;
      }
      else{
          return "Already deleted."
      }
}

// call to quiz table
// call to questions table, then options and then answers table

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
    if(quizs){
        return `Question deleted with id: ${req.params.quizId}.`;
      }
      else{
          return "Already deleted."
      }
}

// get list of questions and corresponding options on that questions.
exports.startQuiz = async (req) => {
    let quizId = req.params.quizId;
    let questns = await questionsModal.findAll({
        attributes: { exclude: ['createdAt', "updatedAt", "choice", "eid"] }
    },{
        where:{
            eid: quizId
        }
    });
    let optionList = [];
    let optnValue;
    var optionPromise = await questns.map( async q => {
        optnValue = await optionsModal.findOne({ where: {qid: q.toJSON().id}});
        return {qid: q.toJSON().id, option: optnValue.option};
    });
    await Promise.all(optionPromise).then(function(results) {
        optionList = results;
    });

    //format in one object
    let questionOptionList = optionList.map(op => {
    let qnsList = questns.filter(q => {
        return q.id === op.qid;
    })
    if(qnsList){
        return {id: op.qid, question: qnsList[0].question, option: op.option};
    }

    });
    return {questionOptionList};
}


exports.finishQuiz = async (req) => {
    let eid = req.params.quizId;
    const {selectedAnswers} = req.body;
    let countRight = 0;
    let countWrong = 0;
    let answer;
    for (let el of selectedAnswers) {
        answer = await answerModal.findOne({
           where :{qid: el.qid}
        });
        answer = answer.toJSON().answerValue;
        
        // counter to calculate right and wrong.
        if(el.answerSelected.trim() === answer.trim()){
            countRight = countRight + 1;
        }
        else{
            countWrong = countWrong + 1;
        }
        
    };

    //fetch +ve and -ve per question.
    let quizData = await quizModal.findOne({
        where :{id: eid}
     });
     const {correct, wrong, totalQuestions} = quizData.toJSON();
    // total score
    let score = 0;
    score = countRight*correct - countWrong*wrong;

    historyModal.create({
        email: "arjun2010.ece@gmail.com",
        eid:eid,
        score: score,
        right: countRight,
        wrong: countWrong
    })
    return {totalQuestions, countRight, countWrong, score};    
}


exports.getAllQuiz = (req) => {
    let quizs = quizModal.findAll();
    return quizs;
}
