const express = require('express');
const app = express();
const session = require('express-session');
var body_parser = require('body-parser');
//处理post参数
app.use(body_parser.json());
app.use(body_parser.urlencoded());
app.use(express.static('public'))
//全系统允许跨域处理
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.listen(8001, () => {
    console.log('服务器启动成功');
})
