var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyparser = require('body-parser');
var url = require("url");
app.set('views', __dirname + '/view');
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/js'))
app.use(bodyparser.urlencoded({extended: false}));
var router = express.Router();
//与数据库建立连接
var connection = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password': '0929',
    'database': 'test'
})
connection.connect();
app.get("/sel", function (req, res) {
    var getid = url.parse(req.url, true).query.id;
    //定义浏览数量
    var eyenum = 0;
    console.log(getid);
    connection.query('select * from admin where id=' + getid, function (err, result) {
        eyenum = result[0].eye + 1;
        connection.query('update admin set eye=' + eyenum + ' where id=' + getid);
        connection.query('select * from admin where id=' + getid, function (err, rs) {
            res.end(JSON.stringify(rs));
        });
    });

});
//点击添加
app.get("/add", function (req, res) {
    var getcont = url.parse(req.url, true).query.cont;
    var gettit = url.parse(req.url, true).query.tit;
    console.log(getcont);
    connection.query('insert into admin(title,content,eye) values("' + gettit + '","' + getcont + '",0)', function (err, result) {
        console.log(result);
        res.end(JSON.stringify(result));
    });
    // res.end(getcont);
});
router.get('/', function (req, res) {
    //sql语句  操作数据库
    connection.query('select * from admin', function (err, result) {
        var datas = JSON.stringify(result);
        var jsond = JSON.parse(datas), arr = [], idarr = [], eyearr = [];
        jsond.forEach((obj, ind) = > {
            arr.push(obj.title);
        idarr.push(obj.id);
        eyearr.push(obj.eye);
    })
    res.render('index', {
        num: arr,
        id: idarr,
        eye: eyearr
    })
    // connection.close();
})
})
app.use('/', router);
app.listen(8000, function () {
    console.log(111)
})