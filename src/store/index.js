import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        //全局存储
        userData: sessionStorage.getItem('userData') ? sessionStorage.getItem('userData') : ''
    },
    getters: {

    },
    mutations: {
        setUserData: (state,userData)=>{
            state.userData = JSON.stringify(userData)
            sessionStorage.setItem('userData',userData)
        },
        delUserData: ()=>{
            sessionStorage.clear('userData')
        }
    }
})

export default store