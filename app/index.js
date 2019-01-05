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

let patientController = require('./controllers/patientController');
let queueController = require('./controllers/queueController');
let doctorController = require('./controllers/doctorController');

app.post("/patients/create", patientController.create);

app.get("/queues/gettickets", queueController.getTickets);
app.get("/queues/getactivequeue", queueController.getActiveQueue);
app.get("/queues/getticketswithdoctors", queueController.getTicketsWithDoctors);
app.post("/queues/opennewqueue", queueController.openNewQueue);
app.post("/queues/closeactivequeue", queueController.closeActiveQueue);

app.post("/doctors/adddoctor", doctorController.addDoctor);
app.get("/doctors/getalldoctors", doctorController.getAllDoctors);
app.post("/doctors/toggleduty", doctorController.toggleDuty);
app.get("/doctors/getondutydoctors", doctorController.getOnDutyDoctors);
app.post("/doctors/nextpatient", doctorController.nextPatient);

app.get("/patients/test", patientController.test);

// start the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
