var util = require("util");
var dateFormat = require('dateformat');

var express = require('express');
var app = express();

app.get('/:input', function (req, res) {
  var input = req.params.input;
  
  // validate the input is unix timestamp/natural language date
  var valid = false;
  var date;
  var dateObject = {
      unix: null,
      natural: null
  };
  // check if input is a number
  if (!isNaN(input)) {
      // it is a number
      input = parseInt(input);
      valid = (new Date(input)).getTime() > 0;
      if (valid) {
          date = new Date(input);
      }
  } else {
      // not a number, check if it's a natural language date
      valid = isNaN(Date.parse(input)) ? false : true;
      if (valid) {
          date = new Date(Date.parse(input));
      }
  }
  
  // if valid create the output object
  if (valid) {
      // unix timestamp in seconds
      dateObject.unix = date.getTime();
      // natural language date (July 23, 1986)
      dateObject.natural = dateFormat(dateObject.unix, "mmmm d, yyyy");
  }
  // check if valid unix timestamp
  res.send(dateObject);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
