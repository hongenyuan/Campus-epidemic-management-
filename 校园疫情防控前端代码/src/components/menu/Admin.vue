<template lang="">
    <div style="height: 650px;">
        <el-container style="height:100%;width:75%; margin:0 auto">
            <el-header>校园疫情管理系统</el-header>
            <el-container>
                <el-aside width="200px" style="background-color:rgba(52, 58, 63);">
                    <div class="user">
                        <el-avatar :src="imgbase"></el-avatar>
                        <span class="username">{{username}}</span>
                    </div>
                    <el-row>
                        <el-col :span="12">
                            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                                @close="handleClose" background-color="#545c64" text-color="#fff"
                                active-text-color="#ffd04b" :default-active="$route.path" :router="true">
                                <el-submenu index="1">
                                    <template slot="title">
                                        <i class="el-icon-location"></i>
                                        <span>个人设置</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="/teacher/showUser">个人信息</el-menu-item>
                                        <el-menu-item index="/teacher/updateUser">信息修改</el-menu-item>
                                        <el-menu-item index="/teacher/updatePwd">密码重设</el-menu-item>
                                        <el-menu-item index="/teacher/updateHead">头像设置</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-menu-item index="/admin/setNotice">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">填报统计</span>
                                </el-menu-item>
                                <el-menu-item index="/admin/adminManage">
                                    <i class="el-icon-setting"></i>
                                    <span slot="title">通知管理</span>
                                </el-menu-item>
                                <el-submenu index="5">
                                    <template slot="title">
                                        <i class="el-icon-location"></i>
                                        <span>健康填报</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item :index="setHealthurl">今日填报</el-menu-item>
                                        <el-menu-item index="1-1">填报历史</el-menu-item>
                                    </el-menu-item-group>

                                </el-submenu>
                            </el-menu>
                        </el-col>
                    </el-row>
                    <el-button @click="singOut" type="info"
                        style=" font-family:  Helvetica Neue, Helvetica, Arial, sans-serif; background-color: rgba(84, 92, 100);">
                        退出
                    </el-button>
                </el-aside>
                <el-container>
                    <el-main>
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </el-main>
                    <el-footer style="height: 100px;"></el-footer>
                </el-container>
            </el-container>
        </el-container> -->

    </div>
</template>
<script>
    export default {
        data() {
            return {
                imgbaseMysql: '',
                username: '',
                // setHealthurl:'/student/getNowdayHeal'
            }
        },
        methods: {
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            },
            singOut() {
                //退出登录
                window.localStorage.setItem('isLogin', JSON.stringify(false));
                window.localStorage.setItem('token', 0) //将token值设为0，保证安全性
                this.$router.push('/login')
            }
        },
        computed: {
            imgbase() {
                //刚打开页面时就用数据库里的头像url
                if (this.$store.state.imgbase.length == 0) {
                    return this.imgbaseMysql
                } else {
                    //修改头像后就用vuex里保存的那个头像url
                    return this.$store.state.imgbase
                }
            },
            changeImgbase() {
                //这个属性主要用于促使页面的渲染，每当修改完头像后在updateHead哪里就修改vuex里的imgbase，其改变之后就会引起student的重新渲染
                return this.$store.state.imgbase
            },
            setHealthurl() { //菜单栏的index不能跟函数要跟属性
                const date = new Date()
                if (JSON.parse(localStorage.getItem('updateHealthtime')) === date.getDate()) {
                    return '/teacher/getNowdayHeal'
                } else {
                    return '/teacher/setHealth'
                }
            }
        },
        //用来渲染main模块的初始页面
        created() {
            this.$router.push({
                path: '/admin/adminManage',
            })
        },
        mounted() {
            this.handleClose() //关闭下拉菜单
            this.axios({
                method: 'GET',
                url: 'http://localhost:8001/getUser',
            }).then(result => {
                this.username = result.data.username,
                    this.imgbaseMysql = result.data.head_portrait
            })
        },
    }
</script>
<style scoped>
    .username {
        position: absolute;
        top: 10px;
        left: 70px;
        color: rgb(255, 255, 255);
        font-size: 10px;
        /* font-weight: 600; */
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .el-col-12 {
        width: 100%;
    }

    .el-row {
        margin-top: 50px;
    }

    .el-avatar {
        position: absolute;
        top: 3px;
        left: 0px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: rgba(192, 196, 204);
    }

    .el-menu {
        height: 200px;
        margin-bottom: 10px;
    }

    .user {
        position: relative;
        width: 100%;
        height: 70px;
        line-height: 30px;
        margin-top: 10PX;
        /* border-top: 0.5px solid rgba(192, 196, 204);
        border-bottom: 0.5px solid rgba(192, 196, 204); */
        box-shadow: 0 0.5px rgba(192, 196, 204);

    }


    .el-header {
        background-color: rgb(255, 255, 255);
        color: rgb(64, 158, 255);
        text-align: center;
        line-height: 60px;
        border-bottom: solid 1px rgb(220, 223, 230);
        margin: 20px 0;
        font-size: 32px;
        font-weight: bold;
    }

    .el-footer {
        background-color: #D3DCE6;
        color: #333;
        background: url(../../../public/dist/img/footer.jpg) 10px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: rgb(144, 153, 160);
        color: #333;
        text-align: center;
        line-height: 160px;
        overflow: scroll;
        height: 700px;
    }

    body>.el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>