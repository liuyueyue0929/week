var express = require('express');
var app=express();
var ejs=require("ejs");
var mysql=require('mysql');
var bodyparser=require('body-parser');
app.set('views',__dirname+'/view');
app.set('view engine','ejs');
app.use(express.static(__dirname+'/node_modules/jquery/dist'))
app.use(bodyparser.urlencoded({extended:false}));
var router=express.Router();
//与数据库建立连接
var connection=mysql.createConnection({
    'host':'localhost',
    'user':'root',
    'password':'0929',
    'database':'test'
})
connection.connect();
router.get('/',function(req,res){
    //sql语句  操作数据库
    connection.query('select * from admin',function(err,result){
        res.render('index',{
            num:result
        })
    })
})
//app.use('/',router)
app.listen(8000,function(){
    console.log(111)
})