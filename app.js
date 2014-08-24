var express = require('express');
var Hipchatter = require('hipchatter');
var fs = require('fs');

var app = express();
var client = new Hipchatter(process.env['HIPCHAT_TOKEN']);

var emoticons = [];
var reloadEmoticons = function() {
  console.log("Reloading emoticons");
  client.emoticons({}, function (err, _e) {
    emoticons = _e;
  });
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
