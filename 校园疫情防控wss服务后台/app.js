// 引入WebSocket模块
var ws = require('nodejs-websocket')
var PORT = 3000.
//建立数据库连接
const mysql = require('mysql')
let conn = '';
//配置数据库连接
connection = function () {
     conn= mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        port: 3306,
        database: 'database',
        timezone: +8
    })
    conn.connect((err, result) => {
        if (err) {
            console.log('数据库连接失败！');
        } else {
            console.log('数据库连接成功！');
        }
    })
}  
//封装查询数据方法
getQuery = function (sql, parmas) {
    return new Promise((resolve, reject) => {
        connection();
        conn.query(sql, parmas, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result)
            }
        })
   
    })
}
//将数组转为json格式
arrayTojson = function(arr) {
    var json = {};
    for ( var i = 0; i < arr.length; i++){
        json[i]=arr[i]
    }
    json=JSON.stringify(json)
    return json;
}
//获取消息
getNotices = function (conn,str) {
    var sql = 'select * from notice order by createtime desc'
    var parmas=str
    getQuery(sql, parmas).then(result => {
        if (result.length != 0) {
            conn.send(arrayTojson(result))//发送的数据格式必须是json的
        }   
    }, err => {
        console.log(err);
    })
}
// on就是addListener，添加一个监听事件调用回调函数
var server = ws.createServer(function(conn){
            console.log('New connection')
            conn.on("text",function(str){
            console.log("Received"+str)
              setInterval(() => {//设置查询轮回
                    getNotices(conn, str)
                }, 4000);
            })
    conn.on("close", function (code, reason) {
                console.log("connection closed")
            })
            conn.on("error",function(err){
                console.log("handle err")
                console.log(err)
            })
        }).listen(PORT)
        console.log('websocket server listening on port ' + PORT)