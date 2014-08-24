var express = require('express');
var Hipchatter = require('hipchatter');
var fs = require('fs');
var deasync = require('deasync');

var app = express();
var client = new Hipchatter(process.env['HIPCHAT_TOKEN']);

var emoticons = [];
var reloadEmoticons = function() {
  console.log("Reloading emoticons");

  var startIndex = 0;
  emoticons = [];
  while (true) {
    var newEmoticons = null; 
    client.emoticons({ 'start-index': startIndex }, function (err, _e) {
      newEmoticons = _e;
      console.log("Found: " + newEmoticons.length);
      console.log("" + newEmoticons[0].shortcut);
    });
    while(newEmoticons == null) { deasync.sleep(100); }
    emoticons = emoticons.concat(newEmoticons);
    if (newEmoticons.length < 100) {
      break;
    } else {
      startIndex = 100;
    }
  }
};

reloadEmoticons();
setInterval(reloadEmoticons, 3600000);

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send(fs.readFileSync('index.html', 'utf-8'));
});

app.get('/emoticons.json', function(req, res) {
  res.send(JSON.stringify(emoticons));
});

app.listen(3000);
