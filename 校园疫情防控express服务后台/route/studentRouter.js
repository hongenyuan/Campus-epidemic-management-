const express = require('express')
const router = express.Router()//router属于路由中间件
const studentMiddle = require('../middleWare/studentMiddle')
const { route } = require('./userRouter')
//请假
router.post('/student/setLeave', (req, res) => {
    studentMiddle.studentSetleave(req,res)
})
//获得假条
router.get('/student/getLeave', (req, res) => {
    studentMiddle.studentGetleave(req,res)
})
module.exports=router