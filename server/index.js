var express=require("express");
var bodyParser=require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/cars");
var db = mongoose.connection;
db.on('Error', console.log.bind(console, 'Error in Connection'));
db.once('Open', function(callback)
{
    console.log('Connection Successfull');
});

var app=express() 
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/', function(req,res){
    var name = req.body.name;
    var price =req.body.price;
    var company = req.body.company;
    var capacity =req.body.capacity;
    var data = {
        "name": name,
        "price":price,
        "company":company,
        "capacity":capacity
    }
db.collection('details').insertOne(data, function(err, collection)
{
    if (err) throw err;
    console.log('Data Inserted Successfully');
})

}) 
app.get('/',function(req,res){
    var cursor = db.collection('details').find();
            cursor.each(function(err, item) {
                if (item != null) {
                    str = str +  item + "</br>";
                }
            });
            res.send(str);
}).listen(3000)
console.log("server listening at port 3000");