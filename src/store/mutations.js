

//  mutations唯一的目的就是修改state中的数据
// 不应该处理多余的逻辑
import * as types from './mutation-types'

const mutations = {
    [types.ADD_TO_CART](state, goods) {
        state.cartList.push(goods)
    },
    [types.INCREMENT_COUNT](state, index) {
        state.cartList[index].count += 1
    }
}


export default mutations
