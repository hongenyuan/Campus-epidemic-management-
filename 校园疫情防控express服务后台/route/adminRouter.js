const express = require('express')
const router = express.Router()
const adminMiddle = require('../middleWare/adminMiddle')
router.post('/setNotice', (req, res) => {
    adminMiddle. adminSetNotice(req,res)
})
//管理员获取当天所有健康表
router.post('/admin/getHealthnowDay', (req, res) => {
    adminMiddle.gethealthNowDay(req,res)
})
   //管理员获取当月所有健康表 
   router.post('/admin/getHealthnowMonth', (req, res) => {
    adminMiddle.gethealthNowMonth(req,res)
})
//获得假条
router.get('/teacher/getLeave', (req, res) => {
   adminMiddle.teacherGetleave(req,res)
})
//获得假条
router.get('/teacher/getLeave', (req, res) => {
    adminMiddle.teacherGetleave(req,res)
})
 //修改假条状态
router.post('/teacher/updateState', (req, res) => {
    adminMiddle.teacherUpdatestate(req,res)
 })
module.exports=router