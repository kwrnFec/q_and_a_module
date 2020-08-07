const express = require("express");
const axios = require("axios");
const apiUrl = 'http://52.26.193.201:3000';

let app = express();

app.use(express.static('public'));

app.use(express.json());

app.get('/questions', (req, res) => {
  let { qLimit, aLimit, product_id } = req.query;
  let url = apiUrl + '/qa/' + product_id;
  axios.get(url)
    .then((response) => {
      let questions = response.data.results.slice(0, qLimit);

      for (let i = 0; i < questions.length; i++) {
        let limitedAnswers = {};
        let j = 0
        while (Object.keys(limitedAnswers).length < aLimit) {
          let ids = Object.keys(questions[i].answers);
          limitedAnswers[ids[j]] = questions[i].answers[ids[j]];
          j++;
        }

        questions[i].answers = limitedAnswers;
      }

      res.send(questions);
    })
    .catch((err) => {
      console.log(err);
    })
});

const port = 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});