const model = require('./model')
class studentModel extends model{  
    //请假申请
    static setLeave(parmasObj) {
        const sql = 'INSERT INTO application_leave SET ?'
            return new Promise((resolve, reject) => {
                this.query(sql, parmasObj).then(result => {
                    resolve(result)
                    console.log('假条申请成功！');
                }, defeat => {
                    reject(defeat)
                    console.log('假条申请失败！');
                    //如果因为sql语句等语言上的错误，那么程序就不会执行下一步了
                })
            })      
    }
       //分页自己获取假条
       static getLeave(u_id, currPage, pageNum) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(pageNum * currPage)
        return new Promise((resolve, reject) => {
            let sql = "select * from application_leave where u_id=? order by createTime desc limit ?,? "
            this.query(sql,[u_id,currPage,pageNum]).then(result => {
                resolve(result)
       
            }).catch(err => {
                reject("您没有请假记录")
            })
        })
    }
    
     //获取假条总数
     static getLeavetotal(u_id) {
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count  from application_leave where u_id= ? "
            this.query(sql, [u_id]).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有请假记录!")
            })
        })
    }
}


module.exports=studentModel