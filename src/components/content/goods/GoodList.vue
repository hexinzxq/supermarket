<template>
    <div class="goods">
        <!-- 这里的goods-item是用来传给子组件的 goodsItem=goods-item-->
        <good-list-item v-for="item in goods" :goods-item="item" :key="item.id"></good-list-item>
    </div>

</template>
<script>
     import GoodListItem from './GoodListItem'
    export default {
        name: 'GoodList',
        components:{
            GoodListItem
        },
        props: {
            goods: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
.goods{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;


}
</style>