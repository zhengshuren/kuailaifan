// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: [],
    count: 0
  },
  mutations: {
    add: (state, data) => {
      // console.log(data);
      let flag = true;
      state.cartList.forEach(item => {
        if (item.id === data.id) {
          flag = false
          item.number = data.number;
          return;
        }
      });
      if (flag) {
        state.cartList.push(data)
      }
      let sum = 0;
      state.cartList.forEach(item => {
        sum += item.price * item.number;
      });
      state.count = sum;
      // console.log(state.count);
      
    },
    // getsum: (state) => {
    //   let sum = 0;
    //   state.cartList.forEach(item => {
    //     sum += item.price * item.number;
    //   });
    //   return state.count = sum;
    // }
  }

  
})

export default store
