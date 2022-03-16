const express = require('express')
const router = express.Router()
const userMiddle = require('../middleWare/userMiddle')
//监测登陆时用户是否注册
router.post('/api/checkUserlogin', (req, res) => {
    userMiddle.checkUserlogin(req,res)
})
//监测注册时用户是否注册
router.post('/api/checkUser', (req, res) => {
    userMiddle.checkUser(req,res)
})
//用户注册
router.post('/api/register', (req, res) => {
    userMiddle.peopleSetuser(req, res);
})
// 用户验证登录路由
router.post('/api/login', (req, res) => {
    userMiddle.userLogin(req, res);
})
//填报健康表
router.post('/setHealth', (req, res) => {
    userMiddle.peopleSethealth(req,res)
})
//获取健康表
router.post('/getHealth', (req, res) => {
    userMiddle.peopleGethealth(req,res)
})
//修改健康表
router.post('/updateHealth', (req, res) => {
    userMiddle.peopleUpdatehealth(req,res)
})
//获取当天健康表
router.post('/getNowdayHealth', (req, res) => {
    userMiddle. peopleGetnowDayHealth(req,res)
})
//获取个人信息
router.get('/getUser', (req, res) => {
    userMiddle.peopleGetuser(req,res)
})
//修改密码
router.post('/updatepassword', (req, res) => {
    userMiddle.peopleUpdatepwd(req,res)
})
//修改个人头像
router.post('/updateHeadportrait', (req, res) => {
    userMiddle.peopleUpdateheadportrait(req,res)
})
//上传个人头像
router.post('/api/update', (req, res) => {
    console.log('gg');
})
//修改个人信息
router.post('/updateUser', (req, res) => {
    userMiddle.peopleUpdateuser(req,res)
})
//得到假条
router.get('/getLeave', (req, res) => {
    userMiddle.getuserLeave(req,res)
})
module.exports=router