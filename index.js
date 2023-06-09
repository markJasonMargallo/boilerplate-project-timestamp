// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  const timestamp = new Date().getTime() / 1000;
  res.json({unix: (timestamp*1000), utc: (new Date()).toUTCString()});
});

app.get("/api/:timestamp", function (req, res) {

  var isValidDate = (new Date(req.params.timestamp)).getTime() > 0;
  var isValidTimestamp = req.params.timestamp > 0;
  var timestamp_from_date = new Date(req.params.timestamp).getTime() / 1000;

  if(isValidTimestamp){
    const timestamp = req.params.timestamp/1000

    var date = new Date(timestamp*1000);
    res.json({unix: (timestamp*1000), utc: date.toUTCString()});
  }
  if(isValidDate){

    var date = new Date(timestamp_from_date * 1000);
    res.json({unix: (timestamp_from_date*1000), utc: date.toUTCString()});
  }
  if(!isValidDate && !isValidTimestamp){
    res.json({ error : "Invalid Date" })
  }

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});