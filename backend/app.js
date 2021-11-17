var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var loginRouter = require('./routes/login.js');
var patientsRouter = require('./routes/patients');
var doctorsRouter = require('./routes/doctors');
var appointmentsRouter = require('./routes/appointments.js');
var registrationRouter = require('./routes/registration.js');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/login', loginRouter);
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);
app.use('/registration', registrationRouter);



module.exports = app;
