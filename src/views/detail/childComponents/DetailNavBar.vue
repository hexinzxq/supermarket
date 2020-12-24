<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles" :key="item.id" class="title-item"
                    :class="{active:index ==currentIndex}" @click='itemClick(index)'>{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
    import NavBar from "components/commen/navbar/NavBar"
    export default {
        name: 'DetailNavBar',
        components: {
            NavBar

        },
        data() {
            return {
                titles: ['商品', '参数', '评论', '推荐'],
                currentIndex: 0,
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index;
                // 为详情页的内容联动
                this.$emit('titleClick',index)
            },
            backClick() {
                this.$router.back();
                // 
            }
        }
    }
</script>
<style scoped>
    .title {
        display: flex;
        flex-flow: wrap;
        font-size: 13px;
    }

    .title-item {
        flex: 1;
    }

    .active {
        color: var(--color-high-text);
    }

    .back img {
        margin-top: 10px;
    }
</style>