import Vue from 'vue'
import Router from 'vue-router'
// Vue Components
import login from '@/components/login'
import firstLogin from '@/components/firstLogin'
import verification from '@/components/verification'
import changePassword from '@/components/changePassword'
import accountList from '@/components/accountList'
import commentList from '@/components/commentList'
import statistic from '@/components/statistic'
import history from '@/components/history'
import competition from '@/components/competition'
import commentDetails from '@/components/commentDetails'
import accountDetial from '@/components/accountDetial'
import forgetPassword from '@/components/forgetPassword'
import competitionCommentList from '@/components/competitionCommentList'
import competitionCommentDetails from '@/components/competitionCommentDetails'
// For test only
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/login',
            name: 'login-origin',
            component: login
        },
        {
            path: '/firstLogin',
            name: 'firstLogin',
            component: firstLogin
        },
        {
            path: '/verification/:userID',
            name: 'verification',
            component: verification
        },
        {
            path: '/changePassword',
            name: 'changePassword',
            component: changePassword
        },
        {
            path: '/accountList',
            name: 'accountList',
            component: accountList
        },
        {
            path: '/commentList',
            name: 'commentList',
            component: commentList
        },
        {
            path: '/commentDetails/:_id',
            name: 'commentDetails',
            component: commentDetails
        },
        {
            path: '/statistic',
            name: 'statistic',
            component: statistic
        },
        {
            path: '/statistic/:time',
            name: 'statistic-item',
            component: statistic
        },
        {
            path: '/competition/:collections',
            name: 'competition',
            component: competition
        },
        {
            path: '/accountDetial/:userID',
            name: 'accountDetial',
            component: accountDetial
        },
        {
            path: '/forgetPassword',
            name: 'forgetPassword',
            component: forgetPassword
        },
        {
            path: '/competitionCommentList/:collections',
            name: 'competitionCommentList',
            component: competitionCommentList
        },
        {
            path: '/competitionCommentDetails/:collections/:_id',
            name: 'competitionCommentDetails',
            component: competitionCommentDetails
        },
        {
            path: '/history/:company',
            name: 'history',
            component: history
        },
        {
            path: '/history/:company/:record',
            name: 'history_spec',
            component: history
        },
        {
            path: '/HelloWorld',
            name: 'HelloWorld',
            component: HelloWorld
        }
    ]
});