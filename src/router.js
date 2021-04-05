import Vue from 'vue'
import Router from 'vue-router'

import Login from './pages/Login'
import Home from './pages/Home'
import Student from './pages/student'
import Dormitory from './pages/dormitory'
import Late from './pages/late'
import Record from './pages/record'
import UserInfo from './pages/userInfo'

const routes = [
    {
        path:'/',
        redirect:'/login'
    },
    {
        path: '/login',
        title: '登录',
        component: Login
    },
    {
        path: '/home',
        title:'首页',
        component: Home,
        children: [
            {
                path: '/student',
                title:'学生管理',
                component: Student
            },{
                path: '/dormitory',
                title:'宿舍管理',
                component: Dormitory
            },{
                path: '/late',
                title:'晚归记录',
                component: Late
            },{
                path: '/record',
                title:'离返校登记',
                component: Record
            },{
                path: '/userInfo',
                title:'个人信息',
                component: UserInfo
            }
        ]
    }
]

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes
})

export default router