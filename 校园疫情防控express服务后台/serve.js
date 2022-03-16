const express = require('express');
const userMiddle = require('./middleWare/userMiddle')
const user =require('./model/userModel')
const app = express();
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

//处理post参数
var body_parser = require('body-parser');
app.use(body_parser.json());//用来解析json数据格式的,把客户端传过来的json数据解析为js数据挂载到req.body身上
app.use(body_parser.urlencoded());//bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据，
//也就是请求头中包含这样的信息： Content - Type: application / x - www - form - urlencoded

//设置静态托管资源
app.use(express.static('public'))

//引入路由模块
const userRouter = require('./route/userRouter')
const studentRouter=require('./route/studentRouter')
const adminRouter=require('./route/adminRouter')
//全系统允许跨域处理
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

//定义全局密钥
global.screctKey = 'ok^_^'

//全局注册解析token数据的中间件，只要配置成功了express-jwt这个中间件，就可以把解析出来的用户信息挂载到req.user身上
app.use(expressJWT({ secret: global.screctKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))//除了以api开头的请求路径外，其他路径都要经过token验证

app.get('/user', (req, res) =>{
 res.send('hhh')
})
//全局注册路由模块
app.use(userRouter)
app.use(studentRouter)
app.use(adminRouter)
app.listen(8001, () => {
    console.log('服务器启动成功！');
})

