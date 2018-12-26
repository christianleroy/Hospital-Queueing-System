const db = require('./models/index.js');
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 1604;
const helmet = require('helmet');
const app = express();
const cors = require('cors');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet())
app.use(cors());

var patientController = require('./controllers/patientController');


// retrieve all questions
app.get("/", (req, res) => {
  var msg = "Testing server";
  var patient = db.Patient;
  res.send(msg);
});

app.post("/patients/create", patientController.create);

// start the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});