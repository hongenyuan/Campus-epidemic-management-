<template lang="">
    <div>
        <el-col :span="12">
            <el-card>
                <div style="text-align:center;">
                    <el-input prefix-icon="el-icon-lock" placeholder="请输入旧密码" v-model="old_pwd" show-password
                        style="margin-top:10px;"></el-input>
                    <el-input prefix-icon="el-icon-lock" placeholder="请输入新密码" v-model="new_pwd1" show-password
                        style="margin-top:10px"></el-input>
                    <el-input prefix-icon="el-icon-lock" placeholder="请再输入密码" v-model="new_pwd2" show-password
                        style="margin-top:10px"></el-input>
                    <el-button type="primary" style="margin-top:10px" @click="repwd">提交修改</el-button>
                </div>
            </el-card>
        </el-col>
    </div>
</template>
<style scoped>
    .el-col {
        width: 100%;
    }

    .el-card {
        line-height: 10px;
        width: 50%;
        margin: 40px 20%;
        background-color: rgba(233, 238, 243)
    }

    .el-input {
        height: 50px;
    }
</style>
<script>
    export default {
        data() {
            return {
                old_pwd: '',
                new_pwd1: '',
                new_pwd2: '',
            }
        },
        activated() {

        },
        methods: {
            repwd() {
                let reg = /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{8,}$/
                if (this.new_pwd1 === this.new_pwd2) {
                    if (reg.test(this.new_pwd1)) {
                        this.$confirm('确认修改？', '提示', { //$confirm 在Vue的原型对象上，由element-ui引进来的
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.updatePwd()
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提交'
                            })
                        })
                    } else this.open("密码至少8位数,并且需要字母与数字混合", 'warning')
                } else {
                    this.open("密码至少8位数, 并且需要字母与数字混合", 'warning')
                }
            },
            open(message, type) {
                this.$message({
                    message: message,
                    type: type
                })
            },
            updatePwd() {
                this.axios({
                    method: 'POST',
                    url: 'http://localhost:8001/updatepassword',
                    data: {
                        oldpassword: this.old_pwd,
                        newpassword: this.new_pwd2
                    }
                }).then((result) => {
                    if (result.data === '密码修改成功!') {
                        this.open(result.data, 'success')
                    } else {
                        this.open(result.data, 'error')
                    }
                })
            }
        },

    }
</script>