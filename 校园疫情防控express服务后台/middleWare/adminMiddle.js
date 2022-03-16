const adminModel = require('../model/adminModel')
const dateObj = require('./public')
//发布消息
const adminSetNotice = async function (req, res) {
    const query = req.body
    const notice = {
        n_id: query.n_id,
        title: query.title,
        content: query.content,
        // createtime: query.createtime,
        author:query.author
    }
    const result = await adminModel.setNotice(notice);
    if (result.affectedRows === 1) {
        res.send('发布成功！')
    }
}
//管理员获得当天所有健康表
 const gethealthNowDay= async function(req,resp){
    const date = new Date();
     const nextDay = dateObj.nextDay(date)
     const nowDay = dateObj.nowDay(date) 
    let data= await adminModel.gethealthNowDay(nowDay,nextDay)
    resp.send(data)
}
//管理员获得当月所有健康表
const gethealthNowMonth = async function (req, resp) {
    const date = new Date();
    const nextMonth = dateObj.nextMonth(date)
    const nowMonth = dateObj.nowMonth(date) 
    console.log(nextMonth);
    console.log(nowMonth);
    let data = await adminModel.gethealthNowMonth(nowMonth, nextMonth)
    console.log(data);
    resp.send(data)
}
//老师获取假条
const teacherGetleave = async function (req, res) {
    let data = await adminModel.getLeave(req.query.currPage, req.query.pageNum)
    let total = await adminModel.getLeavetotal()
    res.send({data, total: total[0].count})
}
//老师修改假条状态
const teacherUpdatestate = async function (req, res) {
    let result = await adminModel.updateLeavestate(req.body.l_id, req.body.state);
    res.send(result);//!!res必须要响应些内容前端的axios才能得到回应执行 then里的resolved方法
}
module.exports = {
    adminSetNotice,
    teacherGetleave,
    teacherUpdatestate,
    gethealthNowDay,
    gethealthNowMonth

}