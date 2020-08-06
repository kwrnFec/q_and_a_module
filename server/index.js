const express = require("express");
const axios = require("axios");
const apiUrl = 'http://52.26.193.201:3000';

let app = express();

app.use(express.static('public'));

app.use(express.json());

app.get('/questions', (req, res) => {
  let { limit, product_id } = req.query;
  let url = apiUrl + '/qa/' + product_id;
  axios.get(url)
    .then((response) => {
      res.send(response.data.results)
    })
    .catch((err) => {
      console.log(err);
    })
});

const port = 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});