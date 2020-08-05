const express = require("express");

let app = express();

app.use(express.static('public'));

const port = 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});