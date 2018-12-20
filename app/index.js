const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 1604;
const helmet = require('helmet');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet())


// retrieve all questions
app.get("/", (req, res) => {
  var msg = "Testing server";
  res.send(msg);
});

// start the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});