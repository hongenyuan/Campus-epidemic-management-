import  Vue  from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 在actions做些异步操作，如下面的定时器操作，然后通过commit来提交mutations，然后通过commit来提交mutations
const actions = {
    add(context,value) {
        context.commit('Add', value);
    },
    minus(context, value) {
        context.commit('Minus',value)
    },
    addOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit('Addodd', value);
        }  
    },
    addWait(context,value) {
        setTimeout(() => {
            context.commit('Addwait', value);
        }, 500);
    },
}
const mutations = {
    Add(state, value) {
        state.sum += value
    },
    Minus(state, value) {
        state.sum -= value
    },
    Addodd(state, value) {
        state.sum += value
    },
    Addwait(state, value) {
        state.sum += value
    },
}
const state = {
    imgbase:''
}
const getters = {
    bigSum(state) {
        return state.sum*10
    }
}
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
});
