<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部工具栏 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/commen/navbar/NavBar"

  import CartList from "./childComponents/CartList.vue"
  import CartBottomBar from "./childComponents/CartBottomBar.vue"
  
// vuex为我们提供的方法，能够使组件在计算属性直接获取到store中getters的方法
  import {mapGetters} from "vuex"


  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
      
    },
    computed: {
    //  cartLength(){
    //    return this.$store.getters.cartLength
    //  }

    // 第一种做法
    // ...mapGetters([
    //   "cartLength"
    // ])

    // 第二种做法，可以为方法起别名
    ...mapGetters({
      cartLength:'cartLength'
    })
    }
  }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color:white;
}
.cart{
  height: 100vh;
}
</style>
