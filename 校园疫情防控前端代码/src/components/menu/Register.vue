<template lang="">
    <div class="loginBox" style="width: 80%;">
        <h2>校园疫情防控管理系统</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="margin-top: 10px; ">
            <el-form-item prop="username">
                <el-input type="text" placeholder="姓名" v-model="ruleForm.username" required="required">
                    <template slot="prepend">姓名</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="studentnum">
                <el-input class="phone-input" placeholder="学号" v-model="ruleForm.studentnum">
                    <template slot="prepend">学号</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input class="phone-input" placeholder="手机号" v-model="ruleForm.phone">
                    <template slot="prepend">手机号</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="classes">
                <el-input type="text" placeholder="班级" required="required" v-model="ruleForm.classes">
                    <template slot="prepend">班级</template></el-input>
            </el-form-item>
            <el-form-item prop="adress">
                <el-input type="text" placeholder="家庭住址" required="required" v-model="ruleForm.adress">
                    <template slot="prepend">家庭住址</template></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" show-password placeholder="请输入密码" v-model="ruleForm.password">
                    <template slot="prepend">输入密码</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" show-password placeholder="再次输入密码" v-model="ruleForm.checkPass">
                    <template slot="prepend">再次输入密码</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="type">
                <el-select v-model="ruleForm.type" clearable placeholder="用户类别">
                    <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="sex" class="sex">
                <el-select v-model="ruleForm.sex" clearable placeholder="用户性别">
                    <el-option v-for="item in sexs" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="btn-form">
                <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>
<style scoped>
    .loginBox {
        box-shadow: rgb(212, 204, 204) 1px 1px 5px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding-top: 10px;
        box-sizing: border-box;
    }

    .el-form-item {
        width: 60%;
        margin: 0 auto;
        margin-bottom: 30px;
    }

    h2 {
        box-sizing: border-box;
        padding: 15px 0;
        width: 300px;
        margin: 0 auto;
        color: #666;
    }

    .el-button {
        display: block;
        margin: 0 auto;
    }


    .el-input--suffix {
        margin: 0 auto;
        /* width: 660px; */
        position: relative;
    }

    .el-select {
        width: 100%;
    }

    .el-input--suffix::before {
        padding-left: 20px;
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 35%;
        height: 40px;
        line-height: 40px;
        color: #909399;
        content: '类别';
        background-color: rgba(245, 247, 250);
        border-radius: 4px;
        border: 1px solid #DCDFE6;
    }

    .sex .el-input--suffix::before {
        content: '性别';
    }

    .el-select .el-input__inner {
        display: inline-block;
        margin-left: 34%;
        width: 65%;
    }

    .el-input-group__prepend {
        width: 35%;
    }
</style>
<script>
    export default {
        data() {
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'))
                } else {
                    if (value) {
                        callback()
                    }
                }
            }
            var validatePhone = (rule, value, callback) => {
                if (value.length == 0) {
                    callback(new Error('手机号不能为空'))
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    if ((reg.test(value))) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的手机号'))
                    }
                }
            }
            var validateStudentnum = (rule, value, callback) => {
                if (value.length == 0) {
                    callback(new Error('学号号不能为空'))
                } else {
                    const reg = /[1-9][0-9]{11}/
                    if ((reg.test(value))) {
                        this.axios({
                            method: 'POST',
                            url: 'http://localhost:8001/api/checkUser',
                            data: {
                                studentnum: this.ruleForm.studentnum
                            }
                        }).then(result => {
                            callback()
                        }, err => {
                            return callback(new Error('该用户已经被注册！'))
                        })
                    } else {
                        callback(new Error('请输入正确的学号'))
                    }
                }
            }
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass')
                    }
                    callback()
                }
            }
            var validateCheckpass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                types: [{
                    value: 1,
                    label: '管理员'
                }, {
                    value: 2,
                    label: '学生'
                }, {
                    value: 3,
                    label: '教师'
                }],
                sexs: [{
                    value: '男',
                    label: '男'
                }, {
                    value: '女',
                    label: '女'
                }],
                ruleForm: {
                    username: '',
                    phone: '',
                    studentnum: '',
                    adress: '',
                    classses: '',
                    sex: '',
                    type: '',
                    password: '',
                    checkPass: '',
                    imgbase: ''
                },
                rules: {
                    username: [{
                        required: true,
                        validator: validateUser,
                        trigger: 'blur'
                    }],
                    phone: [{
                        required: true,
                        validator: validatePhone,
                        trigger: 'blur'
                    }],
                    studentnum: [{
                        required: true,
                        validator: validateStudentnum,
                        trigger: 'blur'
                    }],
                    //校验班级与住址
                    adress: [{
                        required: true,
                        message: '地址不能为空！',
                        trigger: 'blur'
                    }],
                    classes: [{
                        required: true,
                        message: '班级不能为空！',
                        trigger: 'blur'
                    }],
                    sex: [{
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    }],
                    type: [{
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    }],
                    // 密码
                    password: [{
                            required: true,
                            validator: validatePass,
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            message: '长度在不少于6个字符',
                            trigger: 'blur'
                        }
                    ],
                    // 校验密码
                    checkPass: [{
                            required: true,
                            validator: validateCheckpass,
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            message: '长度在不少于6个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            register() {
                this.axios({
                    method: 'POST',
                    url: 'http://localhost:8001/api/register',
                    data: {
                        form: this.ruleForm
                    }
                }).then(result => {
                    this.$message.success(result.data)
                }).catch(err => {
                    this.$message.error(err.response)
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.register()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
    }
</script>
<style lang="">

</style>