'use strict';
const db = require('./models/index.js');
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 1604;
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const ioUtil = require('./io/io');
const path = require('path');
ioUtil.setIo(socketIo(server));
const io = ioUtil.getIo();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet())
app.use(cors());
app.use(express.static(path.join(__dirname, "../build")));

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

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// start the server
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

