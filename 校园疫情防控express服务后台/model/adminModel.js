const model = require('./model')
class adminModel extends model{
    static setNotice(noticeObj) {
        return new Promise((resolve, reject) => {
            let sql = "insert into notice set ?"
            this.query(sql, noticeObj).then((result) => {
                resolve(result)
            }).catch(err => {
                console.log(`发布公告出错:${err.message}`)
                reject("由于网络原因,您的公告并没有发出")
            })

        })
    }
    //管理员获取当天所有健康表
    static gethealthNowDay(nowDate, nextDate) {
        return new Promise((resolve, reject) => {
            let sql = "select * from health where createtime between ? and ?"
            this.query(sql, [nowDate,nextDate]).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }
     // 管理员获取当月所有健康表
     static gethealthNowMonth(nowDate, lasDate) {
        return new Promise((resolve, reject) => {
            let sql = "select * from health where createtime between ? and ?"
            this.query(sql,[nowDate,lasDate]).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }
    //老师分页获取所有
 static getLeave( currPage, pageNum) {
    pageNum = Number(pageNum)
    currPage = Number(currPage)
    currPage = Number(pageNum * currPage)
    return new Promise((resolve, reject) => {
        // let sql = "select * from application_leave order by createTime desc limit ?,? "
        let sql='select l_id,reason,leaveType,startTime,endTime,state,application_leave.createTime,class,username from application_leave inner join user on u_id=id order by application_leave.createTime desc limit ?,?'
        this.query(sql,[currPage,pageNum]).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
    }
     //老师获取假条总数
     static getLeavetotal() {
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count  from application_leave"
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject("没有请假记录!")
            })
        })
    }
    //老师修改假条状态
    static updateLeavestate(l_id,state) {
        // l_id = Number(l_id)
        // upState = Number(upState)
        return new Promise((resolve, reject) => {
            let sql = "update application_leave set state = ? where l_id =?"
            this.query(sql, [state, l_id]).then(result => {
                resolve('审批成功！')
            }).catch(err => {
              resolve('审批失败！')
            })
        })
    }
}
module.exports=adminModel