var express=require('express');
var qs = require('querystring');
var bodyParser = require('body-parser')

var app=express();
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.json())


var mysql      = require('mysql2');
var connection = mysql.createConnection({ user: 'root', database: 'test'});
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/JS'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Return home page
//app.get('/explore',function(req,res){
//	return process(req.query.q, req,res);
//});
	

//app.use(express.bodyParser());
//app.post('/explore1', function(req,res) {
//	console.log(req.body.q);
//	return process(req.body.q, req,res);
//});
app.use('/explore', function(req,res) {
	var query=req.query.q;
	if (req.method == 'POST') {
		query=req.body.q;
	}
	return process(query, req,res);

});
function process(query, req, res) {
  //connection.query('SELECT * from test', function(err, rows, fields) {
  //connection.query(req.query.q, function(err, rows, fields) {
  connection.query(query, function(err, rows, fields) {
  	console.log(rows, fields);
	if (err) throw err;
	var data=[];
	for(i=0;i<rows.length;i++)
	{
		data.push(rows[i].year);
		data.push(rows[i].track);
		data.push(rows[i].market_share);
	}
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.end(JSON.stringify(rows));
  });
};

var server=app.listen(3000,function(){
console.log("We have started our server on port 3000");
});
