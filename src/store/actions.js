import * as types from './mutation-types'

const actions = {
	addToCart({state, commit}, info) {
		return new Promise((resolve) => {
			// 1.查看该商品是否已经添加到cartList中
			const oldInfo = state.cartList.find(item => item.iid === info.iid)

			// 2.如果oldInfo存在, 那么原来的数量加1
			if (oldInfo) {
				const index = state.cartList.indexOf(oldInfo)
                commit(types.INCREMENT_COUNT, index)
                resolve('当前的商品数量加1')
			} else {
				info.count = 1
				info.checked = true
                commit(types.ADD_TO_CART, info);
                resolve("商品添加成功")
			}

			
		})
	}
}

export default actions
