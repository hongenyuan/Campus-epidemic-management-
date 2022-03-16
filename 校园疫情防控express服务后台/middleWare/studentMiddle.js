const studentModel = require('../model/studentModel')
//假条申请
const studentSetleave=async function(req,res){
    const query = req.body
    const leave={
        l_id: Date.now(),
        u_id: query.u_id,
        reason:query.reason,
        leaveType: query.leaveType,
        startTime: query.startTime,
        endTime: query.endTime,
        class:query.classes
    }
    // console.log(leave);
    const result = await studentModel.setLeave(leave);
    if (result.affectedRows === 1) {
       res.send('假条申请成功！')
    } else {
        res.send('假条申请失败！')
   }
}
//获取假条
const studentGetleave = async function (req, res) {
    let u_id=req.user.id
    let data = await studentModel.getLeave(u_id, req.query.currPage, req.query.pageNum)
    let total = await studentModel.getLeavetotal(u_id)
    res.send({data, total: total[0].count})
}
module.exports = {
    studentSetleave,
    studentGetleave
}