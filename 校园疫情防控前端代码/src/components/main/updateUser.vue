<template lang="">
    <div>
        <el-form ref="form" :model="form" label-width="80px" size="min">
            <el-form-item label="姓名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="住址">
                <el-input v-model="form.adress"></el-input>
            </el-form-item>
            <el-form-item label="班级">
                <el-input v-model="form.classes"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="form.type" placeholder="请选择类型" style="float:left">
                    <el-option label="管理员" :value="1"></el-option>
                    <el-option label="学生" :value="2"></el-option>
                    <el-option label="教师" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="large" >
                <el-button type="primary" @click="update" margin:0 auto>确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
    .el-form {
        width: 50%;
        margin: 50px 15%;
    }
</style>
<script>
    export default {
        data() {
            return {
                form: {
                    username: '',
                    phone: '',
                    adress: '',
                    type: '',
                    classes: ''
                },
            };
        },
        activated() {
            this.axios({
                method: 'GET',
                url: 'http://localhost:8001/getUser',
            }).then(result => {
                let data = result.data
                this.form.username = data.username
                this.form.phone = data.phone
                this.form.adress = data.adress
                this.form.type = data.type
                this.form.classes = data.classes
            })
        },
        methods: {
            update() {
                this.axios({
                    method: 'POST',
                    url: 'http://localhost:8001/updateUser',
                    data: {
                        form: this.form
                    }
                }).then(() => {
                    this.$message.success('修改成功！')
                }, () => {
                    this.$message.error('修改失败！')
                })
            }
        }
    }
</script>