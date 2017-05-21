var express = require('express');
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
// app.use('/views', express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/views'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/app', express.static(__dirname + '/app'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


require('./configs/routes')(app);

app.get('/', function (req, res) {
    res.sendfile('views/index.html', { root: __dirname })
});
//process.env.PORT
app.listen(3000, function () {
    console.log('listening on port 3000');
});