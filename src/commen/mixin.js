import { debounce } from "commen/utils"
import backTop from "components/content/backTop/BackTop"
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }

    },
    mounted() {
        // 调用debounce函数，并将refresh函数作为参数传递进去，并接收函数返回值
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        this.itemImgListener = () => {
            // 监听item中图片加载完成
            // 用事件总线的方式将item中的事件传到home中，用$on接收
            // 不能在created里面执行监听，因为里面很有可能拿不到$refs
            // 对监听的事件进行保存
            refresh()

        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
    }
}


//将回到顶部混入
export const backTopMixin = {
    components: {
        backTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.backScroll(0, 0, 300)
        }
    }
}