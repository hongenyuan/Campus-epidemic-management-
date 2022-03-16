<template lang="">
    <div>
        <div class="Box">账号信息</div>
        <div class="box">
            <ul>
                <li>
                    <span>姓名</span>
                    <div>{{user.username}}</div>
                </li>
                <li>
                    <span>电话</span>
                    <div>{{user.phone}}</div>
                </li>
                <li>
                    <span>地址</span>
                    <div>{{user.adress}}</div>
                </li>
                <li>
                    <span>班级</span>
                    <div>{{user.classes}}</div>
                </li>
                <li>
                    <span>类别</span>
                    <div>{{type}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user: '',
                type: ''
            }
        },
        activated() {
            this.axios({
                method: 'GET',
                url: 'http://localhost:8001/getUser',
            }).then(result => {
                this.user = result.data;
                if (result.data.type === 1) {
                    this.type = '管理员'
                } else if (result.data.type === 2) {
                    this.type = '学生'
                } else {
                    this.type = '教师'
                }
            })
        },
    }
</script>
<style scoped>
    ul {
        line-height: 20px;
    }

    li {
        text-align: left;
        list-style: none;
        line-height: 50px;
    }

    ul li div {
        display: inline-block;
        margin-left: 30px;
    }

    .Box {
        margin-bottom: 40px;
        color: rgba(18, 18, 18);
        font-weight: 700;
        height: 30px;
        text-align: left;
        line-height: 30px;
        border-bottom: solid 3px rgba(0, 102, 255);
    }

    ul li {
        box-shadow: 0 2px 0 rgba(235, 231, 231);
    }

    .box {
        font-size: 18px;
        color: rgba(18, 18, 18);
        font-weight: 600;
        box-shadow: 0 0 2px 2px rgb(235, 231, 231)
    }

    .box div {
        font-weight: 540;
    }
</style>