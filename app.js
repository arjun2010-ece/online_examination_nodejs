var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const registerApp = require("./routes/index");


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

registerApp(app);

app.listen(5000, () => {
  console.log("Listening on port 5000");
})

// module.exports = app;
