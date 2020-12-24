<template>
    <div class="wrapper" ref='wrapper'>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BSCroll from "better-scroll"
    export default {
        name: "Scroll",
        data() {
            return {
                scroll: null,
            }
        },
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }

        },
        mounted() {
            // 创建scroll实例
            this.scroll = new BSCroll(this.$refs.wrapper, {
                // 如果是button 原本就可以点击
                // 但是对于div等元素就必须设置click为true
                click: true,
                // 考虑到并不是全部都需要实时监听滚动，所以封装时这个属性由用组件的人传入
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad
            });
            // 监听滚动事件
            this.scroll.on('scroll', (position) => {
                this.$emit('scroll', position)
            });
            // 监听上拉加载事件
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            })

        },
        methods: {
            backScroll(x, y, time) {
                this.scroll && this.scroll.scrollTo(x, y, time);
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            getScrollY() {
                // 判断用户是否已经滚动，有值就将他传递，没有就返回0
               return this.scroll ? this.scroll.y : 0
            }

        }
    }
</script>

<style scoped>

</style>