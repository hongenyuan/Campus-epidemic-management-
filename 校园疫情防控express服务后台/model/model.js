const mysql = require('mysql')
// 创建连接数据库的类
class model {
    static connection() {
        model.conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            port: 3306,
            database: 'database',
            timezone: +8
        })
        //连接数据库
        model.conn.connect((err, result) => {
            if (err) {
                console.log('数据库连接失败！');
            } else {
                console.log('数据库连接成功！');
            }
        })
    }
    // 建立查询
    static query(sql, parmas) {
        return new Promise((resolve, reject) => {
            this.connection();
            model.conn.query(sql, parmas, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
      
    }
    //关闭数据库
    static end() {
        if (model.conn != null) {
            model.conn.end()
        }
    }
    //取出对象里的属性保存到数组中
    static setParmasarray(parmasObj) {
        const array = []
        for (var k in parmasObj) {
            array.push(parmasObj[k])//k是属性名
        }
        console.log(array);
    }
}

//注意直接导出model 在使用model，model就不可用了，要用下面方法导出才可用
module.exports=model