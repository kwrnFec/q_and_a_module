const express = require("express");
const axios = require("axios");
const apiUrl = 'http://52.26.193.201:3000/';

let app = express();

app.use(express.static('public'));

app.use(express.json());

app.get('/questions', (req, res) => {
  let { qLimit, aLimit, product_id } = req.query;
  let url = apiUrl + 'qa/' + product_id;
  axios.get(url)
    .then((response) => {
      // checks if there is more than qLimit questions
      let isMoreQuestions = response.data.results.length > qLimit;

      // limits amount of questions displayed
      let questions = response.data.results.slice(0, qLimit);

      // limits amount of answers per question displayed
      for (let i = 0; i < questions.length; i++) {
        let limitedAnswers = {};

        let ids = Object.keys(questions[i].answers);
        let j = 0;
        while (Object.keys(limitedAnswers).length < aLimit && ids.length !== 0) {
          limitedAnswers[ids[j]] = questions[i].answers[ids[j]];
          j++;
        }

        let isMoreAnswers = aLimit < ids.length;
        limitedAnswers.isMoreAnswers = isMoreAnswers;

        questions[i].answers = limitedAnswers;
      }
      res.send({questions, isMoreQuestions});
    })
    .catch((err) => {
      console.log(err);
    })
});

app.put('/answer/helpful', (req, res) => {
  let answer_id = req.body.answer_id;
  let url = apiUrl + `qa/answer/${answer_id}/helpful`;

  axios.put(url)
    .then(() => {
      res.send();
    })
});

app.put('/question/helpful', (req, res) => {
  let question_id = req.body.question_id;
  let url = apiUrl + `qa/question/${question_id}/helpful`;

  axios.put(url)
    .then(() => {
      res.send();
    })
});

const port = 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});