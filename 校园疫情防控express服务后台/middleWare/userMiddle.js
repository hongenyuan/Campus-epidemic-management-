const userModel = require('../model/userModel')
const dateObj = require('./public')
const jwt = require('jsonwebtoken')//产生token
//async一般用来返回promise对象的，但此处是用来使用来await的，因为await的使用必须在async中使用，用来返回promise的结果
//监测登录时用户是否注册
const checkUserlogin = async function (req, res) {
    const studentnum = req.body.studentnum
    const result = await userModel.checkUserlogin(studentnum)
    if (!result.length) {
        res.send('该用户未注册')
    } else {
        res.send('已注册')
    }
}
//监测注册时用户是否已经注册
const checkUser=async function(req, res){
    const studentnum = req.body.studentnum
    const result = await userModel.checkUser(studentnum)
    if (result.length) {
        res.status(500).send('该用户已注册！')
      
    } else {
        console.log(result);
        res.send('该用户未注册！')
    }
}
//用户注册
const peopleSetuser= async function (req, res) {
    const query = req.body.form
    const user = {
        id: Date.now(),
        username: query.username,
        phone: query.phone,
        studentnum: query.studentnum,
        adress: query.adress,
        classes: query.classes,
        sex: query.sex,
        password: query.password, 
        type: query.type,
    }
    const result = await userModel.setUser(user);
    if (result.affectedRows === 1) {
        console.log('注册成功！');
        res.send('注册成功！')
    } else {
        res.send('注册失败！')
    }
}
//用户登录
const userLogin = async function (req, res) {
    const query = req.body
    const username = query.username
    const password = query.password
    const type = query.type
    const result = await userModel.login(username, password, type)
    if (result.length != 0) {
        //生成token数据
        const tokenStr = jwt.sign({
            id: result[0].id,
            username: result[0].username,
            type: result[0].type,
            classes:result[0].classes
        },
         global.screctKey,
            { expiresIn: '30h' })  
        console.log('用户登录');
        res.send({result, tokenStr });//必须以对象的形式发出去
    } else {
        res.status(500).send('用户名或者账号输入错误！')
        console.log('登录');
           
    }
}
//填报健康表
const peopleSethealth = async function (req, res) {
    const query = req.body.form
    const health = {
        h_id: query.h_id,
        u_id: query.u_id,
        tempreture: query.tempreture,
        isHot:query.isHot,
        isRisk:query.isRisk,
        location:query.location,
        healthCode:query.healthCode,
        isSchool:query.isSchool,
        isTruth:query.isTruth,
        // createtime:query.createTime
    }
    const result = await userModel.setHealth(health);
    if (result.affectedRows === 1) {
        console.log('填报成功！');
        res.send('填报成功！')
    }
}
//获取自己填报的所有健康报表
const peopleGethealth = async function (req, res) {
    const parma=req.user.id
    console.log(parma);
    const result = await userModel.getHealth(parma);
    if (result.length != 0) {
            // res.send(tokenhid)
        console.log(result);
    } else {
        res.status(500).send('用户填报健康表为空！')
   }
}
  //获取当天所填报表
const peopleGetnowDayHealth = async function (req, res) {
        const date = new Date();
        const nextDay = dateObj.nextDay(date) 
    const nowDay = dateObj.nowDay(date)
        const u_id = req.user.id
        const result = await userModel.getNowdayHealth(nowDay,nextDay,u_id);
        if (result.length != 0) {
        const tokenHid = jwt.sign({
            h_id: result[0].h_id,//通过token对指定的健康表进行修改
            },
            global.screctKey,
            {expiresIn:'30h'})  
            res.send(result[0])
    } else {
        res.status(500).send('用户填报健康表为空！')
   }
    
  }
//修改当天健康表
const peopleUpdatehealth = async function (req, res) {
    const query = req.body.form
    const h_id = req.body.h_id
    console.log(h_id);
    const updateHealth = {
        tempreture: query.tempreture,
        isHot:query.isHot,
        isRisk:query.isRisk,
        location:query.location,
        healthCode:query.healthCode,
        isSchool:query.isSchool,
        isTruth:query.isTruth,
    }
    const result = await userModel.updateHealth(updateHealth,h_id);
    if (result.affectedRows === 1) {
        res.send('修改成功！')
    }
}
//分页获取通知
// const peopleGetnotice=async function(req,res){
//     const query = req.query
//     const result = await userModel.getNotice(query.currPage,query.pageNum);
//     if (result.length != 0) {
//         // res.send(tokenhid)
//         res.send(result)
//         console.log(result);
//     } else {
//         res.status(500).send('notice为空！')
//     }
// }

// const peopleGetnotice=async function(req,res){
//     const result = await userModel.getNotice();
//     if (result.length != 0) {
//         // res.send(tokenhid)
//         res.send(result)
//         console.log(result);
//     } else {
//         res.status(500).send('notice为空！')
//     }
//     }

//获取个人信息
const peopleGetuser=async function(req,res){
    const result = await userModel.getUser(req.user.id);
    if (result.length != 0) {
        // res.send(tokenhid)
        res.send(result[0])
    } else {
        res.status(500).send('user为空！')
    }
    }
   //修改密码
   const peopleUpdatepwd=async function(req,res){
    const result = await userModel.updatePassword(req.body.newpassword,req.user.id,req.body.oldpassword);
    if (result.affectedRows === 1) {
        res.send('密码修改成功!')
    } else {
        res.send('修改失败！')
    }
    }
   //修改头像
   const peopleUpdateheadportrait=async function(req,res){
    const query = req.body
    const result = await userModel.updateHeadportrait(query.head_portrait,req.user.id);
    if (result.affectedRows === 1) {
        res.send('修改成功！')
    }
}
    //修改个人信息
const peopleUpdateuser = async function (req, res) {
        const result = await userModel.updateUser(req.body.form,req.user.id);
        if (result.affectedRows === 1) {
            res.send('修改成功！')
        }
        // console.log(result);
}
//获取假条
const getuserLeave = async function (req, res) {
    let u_id=req.user.id
    let data = await userModel.getuserLeave(u_id, req.query.currPage, req.query.pageNum)
    let total = await userModel.getuserLeavetotal(u_id)
    res.send({data, total: total[0].count})
}
module.exports = {
    userLogin,
    peopleUpdatehealth,
    peopleSethealth,
    peopleGetnowDayHealth,
    peopleUpdatepwd,
    peopleUpdateheadportrait,
    peopleUpdateuser,
    peopleGetuser,
    getuserLeave,
    peopleSetuser,
    checkUser,
    checkUserlogin
}