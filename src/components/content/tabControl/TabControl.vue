<template>
    <div class="tab-control">
        <!-- 在这里只是文字不一样，可以不使用插槽 -->
        <div v-for="(item,index) in titles" :key="item.id" class="tab-control-item"
            :class="{active:index===currentIndex}" @click='tabControlItemClick(index)'>
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    // 导出的同时定义子组件
    export default {
        name: 'TabControl',
        props: {
            titles: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            tabControlItemClick(index) {
                this.currentIndex = index;
                this.$emit('tabClick',index);
            }

        }
    }
</script>

<style>
    .tab-control {
        display: flex;
        text-align: center;
        font-size: 15px;
        background-color: #fff;
    }

    .tab-control-item {
        flex: 1;
        height: 40px;
        line-height: 40px;

    }
    

    .active {
        color: rgb(235, 157, 170);
    }

    .active span {
        padding: 3px;
        border-bottom: 3px solid rgb(235, 157, 170);
    }
</style>