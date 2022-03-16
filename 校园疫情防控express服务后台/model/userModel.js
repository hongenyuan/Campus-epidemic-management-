const model = require('./model')

// 用户数据模型
class userModel extends model {
    //监测登录时用户是否未注册
    static checkUserlogin(studentnum) {//根据学号查重
        const sql = 'select * from user where studentnum=?'
        return new Promise((resolve, reject) => {
            this.query(sql, [studentnum]).then(result => {
                resolve(result)
            }, err => {
                console.log('查询失败！');
                reject(err)
            })
        })
    }
//监测用户是否重复注册
    static checkUser(studentnum) {//根据学号查重
        const sql = 'select * from user where studentnum=?'
        return new Promise((resolve, reject) => {
            this.query(sql, [studentnum]).then(result => {
                resolve(result)
            }, err => {
                console.log('查询失败！');
                reject(err)
            })
        })
    }

    //注册用户
static setUser(parmasObj) {
    const sql = 'INSERT INTO user SET ?'//像health表中插入数据 set为占位符
    return new Promise((resolve, reject) => {
        this.query(sql, parmasObj).then(result => {
            resolve(result)
            console.log('注册成功！');
        }, err => {
            reject(err)
            console.log('注册失败');
        })
    })
    }
    //用户登录
    static login(name, pwd, type) {
        return new Promise((resolve, reject) => {
            let sql = 'select * from user where binary username=? and password=? and type=?'
            this.query(sql, [name, pwd, type]).then((result) => {
                resolve(result)     
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
            this.end()
        })
    }
    //填报健康表
    static setHealth(parmasObj) {
        const sql = 'INSERT INTO health SET ?'//像health表中插入数据 set为占位符
        return new Promise((resolve, reject) => {
            this.query(sql, parmasObj).then(result => {
                resolve(result)
                console.log('填报成功了！');
            }, err => {
                reject(err)
                console.log('填报失败');
            })
        })
    }
    //获取自己填报的所有健康表
    static getHealth(parma) {
        const sql = 'select * from health where u_id=?'
        return new Promise((resolve, reject) => {
            this.query(sql, [parma]).then(result => {
                resolve(result)
                console.log(result);
            }, err => {
                reject(err)
                console.log('查询失败');
            })
        })
    }
    //获取自己当天所填报表
    static getNowdayHealth(nowDay, nextDay, u_id) {
        const sql = 'select * from health where (createtime between ? and ?) and u_id=?'
        return new Promise((resolve, reject) => {
            this.query(sql, [nowDay, nextDay, u_id]).then(result => {
                resolve(result)
                console.log(result);
            }, err => {
                reject(err)
                console.log('查询失败');
            })
        })
    }
    //修改当天健康表
    static updateHealth(parmasobj, h_id) {
        const sql = 'update health set ? where h_id=?'
        return new Promise((resolve, reject) => {
            this.query(sql, [parmasobj, h_id]).then(result => {         
                resolve(result)
                console.log('修改成功！');
            }, err => {
                reject(err)
                console.log('修改失败！');
            })
        })
    }
    // //分页获取通知
    // static getNotice(currPage, pageNum) {
    //     pageNum = Number(pageNum)//注意！！这种不是直接面对数据库字段的数据，使用postman传过来时要转化成number
    //     currPage = Number(currPage) * pageNum
    //     console.log(currPage, pageNum);
    //     return new Promise((resolve, reject) => {
    //         let sql = "select * from notice order by createtime desc"
    //         this.query(sql).then(result => {
    //             resolve(result)
    //         }).catch(err => {
    //             reject(err)
    //         })
    //     })
    // }

// 获取个人信息
     static getUser(id) {
         return new Promise((resolve, reject) => {
            let sql = "select * from user where id=?"
            this.query(sql,[id]).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    //修改密码 
    static updatePassword(newpassword,id,oldpassword) {
        return new Promise((resolve, reject) => {
            let sql ='update user set password=? where id=? and password=?'
            this.query(sql, [newpassword,id,oldpassword]).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }
    //修改个人头像
    static updateHeadportrait(head_portrait,u_id){
        return new Promise((resolve, reject)=>{
            let sql="update user set head_portrait=? where id=?"
        this.query(sql,[head_portrait,u_id]).then(result=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        })
     })
    }
    //修改个人信息
    static updateUser(form, id) {
            //  console.log(form);
             return new Promise((resolve, reject) => {
                 let sql = "update user set username= ? , phone= ? , adress= ? , classes= ? , type= ? where id=?"
                 this.query(sql,[form.username,form.phone,form.adress,form.classes,form.type,id]).then(result=>{
                    resolve(result)
                }).catch(err=>{
                    reject(err)
                })
                 })   
    }  
}
module.exports=userModel

