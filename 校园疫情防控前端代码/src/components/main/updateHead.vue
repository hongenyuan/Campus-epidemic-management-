<template>
    <div style="width: 100%; height: 100%; position: relative;;">
        <el-avatar v-if="!imgbase" icon="el-icon-user-solid"></el-avatar>
        <el-avatar v-if="imgbase" :src="imgbase"></el-avatar>
        <!-- 通过label绑定上传文件的input框的id -->
        <!-- 然后通过label标签触发选择文件的输入框 -->
        <label for="img_upload" class="btn">
            立即上传
        </label>
        <input type="file" id="img_upload" style="display: none;">
    </div>
</template>
<style scoped>
    .el-avatar {
        position: absolute;
        top: 40%;
        left: 40%;
        transform: translate(-50%, -50%);

    }

    .btn {
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
        position: absolute;
        top: 60%;
        left: 21%;
        width: 40%;
        height: 40px;
        outline: none;
    }

    .el-avatar {
        width: 120px;
        height: 120px;
        line-height: 100px;
        border-radius: 50%;
    }

    .el-avatar--icon {
        font-size: 45px;
    }
</style>
<script>
    export default {
        data() {
            return {
                imgbase: ''
            }
        },
        mounted() {
            let _this = this;
            let img_upload = document.getElementById("img_upload"); // 获取文件框
            //绑定input上传照片时的回调函数
            img_upload.addEventListener('change', function readFile() {
                let file = this.files[0];
                const isLt2M = file.size / 1024 / 1024 < 0.07; //不能超过80kb大小
                if (!/image\/\w+/.test(file.type)) { //是图片就行不管什么格式
                    _this.$message.error('上传头像应为图片类型！')
                    return false;
                }

                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    if (!isLt2M) {
                        _this.$message.error('上传头像大小不能超过 70kb!');
                        return false
                    }
                    _this.imgbase = this.result; //照片的路径
                    _this.$store.state.imgbase = this.result //将路径保存在vuex里
                    _this.axios({
                        //将图片url更新到数据库中
                        method: "POST",
                        url: 'http://localhost:8001/updateHeadportrait',
                        data: {
                            head_portrait: _this.imgbase
                        }
                    }).then(result => {
                        _this.$message.success('头像上传成功！')
                    }, err => {
                        _this.$message.error('头像上传失败！')
                    })
                }
            }, false);
        },
        methods: {}
    }
</script>