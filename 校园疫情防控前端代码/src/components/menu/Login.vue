<template lang="">
    <div class="loginBox">
        <div class="loginTitle">
            <h2>校园疫情防控管理系统</h2>
        </div>
        <div style="width: 60%; margin:0 auto">
            <div style="position: relative;">
                <el-row>
                    <el-col>
                        <el-input id="name" v-model="username" placeholder="请输入姓名" @blur="checkName"
                            @focus="$refs.usernameErr.style.display='none'">
                            <template slot="prepend">姓名</template>
                        </el-input>
                    </el-col>
                </el-row>
                <span ref="usernameErr"></span>
            </div>
            <div style="position: relative;">
                <el-row>
                    <el-col>
                        <el-input id="studentnum" v-model="studentnum" type="text" placeholder="请输入学号"
                            @blur="checkStudentnum" @focus="$refs.studentNumErr.style.display='none'">
                            <template slot="prepend">学号</template>
                        </el-input>
                    </el-col>
                </el-row>
                <span ref="studentNumErr"></span>
            </div>
            <div style="position: relative;">
                <el-row>
                    <el-col>
                        <el-input id="password" v-model="password" type="password" show-password placeholder="请输入密码"
                            @blur="checkPassword" @focus="$refs.passwordErr.style.display='none'">
                            <template slot="prepend">密码</template>
                        </el-input>
                    </el-col>
                </el-row>
                <span ref="passwordErr"></span>
            </div>
            <div style=" width: 258px; margin: 25px auto;">
                <el-radio-group v-model="type">
                    <el-radio :label="1">管理员</el-radio>
                    <el-radio :label="2">学生</el-radio>
                    <el-radio :label="3">教师</el-radio>
                </el-radio-group>
            </div>
            <div>
                <el-row style="width: 100%; margin: 15px auto;">
                    <el-col>
                        <el-button id="login" style="width:100%" type="primary" @click="login">登录</el-button>
                    </el-col>
                </el-row>
                没账号？<el-link href=" http://localhost:8080/register" type="primary">去注册</el-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                studentnum: '',
                type: 1,
            }
        },
        methods: {
            checkName() {
                if (this.username.length == 0) {
                    this.$refs.usernameErr.innerHTML = '账号不能为空！'
                    this.$refs.usernameErr.style.display = 'block'
                }
            },
            checkPassword() {
                if (this.password.length == 0) {
                    this.$refs.passwordErr.innerHTML = '密码不能为空！'
                    this.$refs.passwordErr.style.display = 'block'
                }
            },
            checkStudentnum() {
                if (this.studentnum.length == 0) {
                    this.$refs.studentNumErr.innerHTML = '学号不能为空！'
                    this.$refs.studentNumErr.style.display = 'block'
                }
            },
            async login() {
                if (!this.username.length || !this.studentnum.length || !this.password.length) {
                    this.$message.error('输入不能为空！')
                    return
                } else {
                    const result = await this.axios({
                        method: 'POST',
                        url: 'http://localhost:8001/api/checkUserlogin',
                        data: {
                            studentnum: this.studentnum
                        }
                    })
                    if (result.data === '该用户未注册') {
                        this.$message.error('不存在该用户！请注册')
                        return
                    }
                }
                this.axios({
                    method: 'POST',
                    url: 'http://localhost:8001/api/login',
                    data: {
                        username: this.username,
                        password: this.password,
                        type: this.type
                    }
                }).then(response => {
                    window.localStorage.setItem('isLogin', JSON.stringify(true))
                    window.localStorage.setItem('token', response.data.tokenStr)
                    window.localStorage.setItem('username', response.data.result[0].username)
                    window.localStorage.setItem("u_id", response.data.result[0].id);
                    window.localStorage.setItem("classes", response.data.result[0].classes);
                    this.$message.success('登录成功！')
                    if (this.type === 1) {

                        window.location.href = 'http://localhost:8080/admin'
                    }
                    if (this.type === 2) {
                        window.location.href = 'http://localhost:8080/student'
                    }
                    if (this.type === 3) {
                        window.location.href = 'http://localhost:8080/teacher'
                    }
                }, err => {
                    if (err.response) {
                        if (err.response.status == 500) {
                            this.$message.error('输入信息有误，请重新输入');
                            this.password = ''
                        }
                    } else {
                        console.log(err.response);
                    }
                })
            }

        },
    }
</script>
<style scoped>
    .loginBox {
        /* border: 1px solid #999; */
        box-shadow: rgb(212, 204, 204) 1px 1px 5px;
        width: 600px;
        height: 400px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    h2 {
        box-sizing: border-box;
        padding: 40px 0;
        width: 300px;
        margin: 0 auto;
        color: #666;
    }

    span {
        position: absolute;
        top: 10px;
        right: -90px;
        color: rgb(243, 66, 66);
        display: none;
        font-size: 12px;
    }
</style>