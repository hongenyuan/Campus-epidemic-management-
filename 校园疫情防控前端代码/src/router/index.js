import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
export default new Router({
    mode:'history',
    routes: [
        {
            path: '*',
            redirect:'/'
        },
        {
            path: '/',
            name: 'Login',
            component: () => import('@/components/menu/Login.vue')
        },   
        {
            path: '/register',
            name: 'Register',
            component:()=>import('@/components/menu/Register.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/components/menu/Login.vue')
        },
        {
            path: '/admin',
            name: 'Admin',
            meta:{requireAuth:true},
            component: () => import('@/components/menu/Admin.vue'),
            children: [
                {
                    path: '/admin/adminManage',
                    name: 'AdminManage',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/adminManage.vue')
                },
                {
                    path: '/admin/iskAreapeople',
                    name: 'IskAreapeople',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/iskAreapeople.vue')
                },
                {
                    path: '/admin/updateUser',
                    name: 'updateUser',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/updateUser.vue')
                },
                {
                    path: '/admin/updatePwd',
                    name: 'updatePwd',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/updatePwd.vue')
                },
                {
                    path: '/admin/showUser',
                    name: 'showUser',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/showUser.vue')
                },
                {
                    path: '/admin/setHealth',
                    name: 'setHealth',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/setHealth.vue')
                },
                {
                    path: '/admin/getNowdayHeal',
                    name: 'getNowdayHeal',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/getNowdayHeal.vue')
                },
                {
                    path: '/admin/updateHead',
                    name: 'updateHead',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/updateHead.vue')
                },
            ]
        },
        {
            path: '/student',
            name: 'Student',
            meta:{requireAuth:true},
            component: () => import('@/components/menu/Student.vue'),
            children:[
                {
                    path: '/student/notice',
                    name: 'Notice',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/Notice.vue')
                },
                {
                    path: '/student/updateUser',
                    name: 'updateUser',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/updateUser.vue')
                },
                {
                    path: '/student/updatePwd',
                    name: 'updatePwd',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/updatePwd.vue')
                },
                {
                    path: '/student/showUser',
                    name: 'showUser',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/showUser.vue')
                },
                {
                    path: '/student/setHealth',
                    name: 'setHealth',
                    component:()=>import('@/components/main/setHealth.vue')
                },
                {
                    path: '/student/setLeave',
                    name: 'setLeave',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/setLeave.vue')
                },
                {
                    path: '/student/getNowdayHeal',
                    name: 'getNowdayHeal',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/getNowdayHeal.vue')
                },
                {
                    path: '/student/updateHead',
                    name: 'updateHead',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/updateHead.vue')
                },
            ]
        },
        {
            path: '/teacher',
            name: 'Teacher',
            meta:{requireAuth:true},
            component: () => import('@/components/menu/Teacher.vue'),
            children: [
                {
                    path: '/teacher/manageLeave',
                    name: 'manageLeave',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/manageLeave.vue')
                },
                {
                    path: '/teacher/notice',
                    name: 'Notice',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/Notice.vue')
                },
                {
                    path: '/teacher/updateUser',
                    name: 'updateUser',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/updateUser.vue')
                },
                {
                    path: '/teacher/updatePwd',
                    name: 'updatePwd',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/updatePwd.vue')
                },
                {
                    path: '/teacher/showUser',
                    name: 'showUser',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/showUser.vue')
                },
                {
                    path: '/teacher/setHealth',
                    name: 'setHealth',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/setHealth.vue')
                },
                {
                    path: '/teacher/getNowdayHeal',
                    name: 'getNowdayHeal',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/getNowdayHeal.vue')
                },
                {
                    path: '/teacher/updateHead',
                    name: 'updateHead',
                    meta:{requireAuth:true},
                    component:()=>import('@/components/main/updateHead.vue')
                },
            ]
        }
    ]
}) 
    
