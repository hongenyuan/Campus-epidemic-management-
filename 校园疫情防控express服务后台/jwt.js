const express = require('express');
const app = express();
const session = require('express-session');
// const path = require('path');
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
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
//生成密钥
const secretKey = 'item No1 ^_^'
//注册将JWT字符串解析还原成JSON对象的中间件
  //注意：只要配置成功了express-jwt这个中间件，就可以把解析出来的用户信息挂载到req.user身上
app.use(expressJWT({ secret: secretKey ,algorithms:['HS256']}).unless({path:[/^\/api\//]}))
// 发送post请求
app.post('/api/user', (req, res) => {
    if (req.body.username !== 'admin' || req.body.password !== '123') {
        return { status: 1, msg: '登录失败'}
    }
    //登录成功后
    //生成token字符串
    //千万不要把密码加载到token中否则会很危险
   const tokenStr=jwt.sign({username:req.body.username},secretKey,{expiresIn:'30h'})
    res.send({ tokenStr })
});

app.get('/username', (req, res) => {
  console.log(req.user);
    res.send({
        status: '200',
        msg: '访问成功!',
        data: req.user
    })
}
)
app.post('/logout', (req, res) => {
    res.send({
        status: 0,
        msg:'退出登录成功！'
    })
})
app.listen(8001, () => {
    console.log('服务器启动成功');
})
