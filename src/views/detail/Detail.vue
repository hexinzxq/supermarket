<template>
    <div id="detail">
        <!-- 导航 -->
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <!-- 轮播图 -->
            <detail-swiper :top-images='topImages'></detail-swiper>
            <detail-base-info :goods='goods'></detail-base-info>
            <detail-shop-info :shop='shop'></detail-shop-info>
            <detail-goods-info :detail-info='detailInfo' @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info ref="params" :param-info=" paramInfo"></detail-param-info>
            <detail-comment-info ref="comment" :comment-info=" commentInfo"></detail-comment-info>
            <good-list ref="recommends" :goods="recommends"></good-list>
        </scroll>
        <back-top @click.native='backTop' v-show='isShowBackTop'></back-top>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <toast ></toast>
        <router-view></router-view>
    </div>
</template>
<script>

    import DetailNavBar from "./childComponents/DetailNavBar.vue"
    import DetailSwiper from "./childComponents/DetailSwiper.vue"
    import DetailBaseInfo from "./childComponents/DetailBaseInfo.vue"
    import DetailShopInfo from "./childComponents/DetailShopInfo.vue"
    import DetailGoodsInfo from "./childComponents/DetailGoodsInfo.vue"
    import DetailParamInfo from "./childComponents/DetailParamInfo.vue"
    import DetailCommentInfo from "./childComponents/DetailCommentInfo.vue"
    import DetailBottomBar from "./childComponents/DetailBottomBar.vue"

    import Scroll from "components/commen/scroll/Scroll.vue"
    import GoodList from "components/content/goods/GoodList.vue"
    import Toast from "components/commen/toast/Toast.vue"

    import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail.js"

    import { itemListenerMixin, backTopMixin } from "commen/mixin"
    import { debounce } from "commen/utils"

    export default {
        name: 'Detail',
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,

            Scroll,
            GoodList,
            Toast

        },
        mixins: [itemListenerMixin, backTopMixin],
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeY: null,
                currentIndex: 0,
                // message:'',
                // show: false,

            }
        },
        created() {
            // 保存iid
            // 这里的iid要与路径中的名字一样
            this.iid = this.$route.params.iid
            // 根据iid请求详情数据
            getDetail(this.iid).then(res => {

                const data = res.result
                // 获取顶部的轮播数据
                this.topImages = data.itemInfo.topImages;
                // 获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                // 创建店铺信息
                this.shop = new Shop(data.shopInfo)
                // 保存商品的详情数据
                this.detailInfo = data.detailInfo;
                // 获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                // 获取评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }
                // // dom渲染完成后调用,避免取不到值,但图片未加载值仍然不对
                // this.$nextTick(() => {
                //     this.themeTopYs = [];
                //     // 获取相对组件的offsetTop值
                //     this.themeTopYs.push(0);
                //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                //     this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
                //     console.log(themeTopYs)

                // })

            })
            // 请求推荐数据
            getRecommend().then(res => {
                this.recommends = res.data.list
            });
            // 给getThemeY赋值
            this.getThemeY = debounce(() => {
                this.themeTopYs = [];
                // 获取相对组件的offsetTop值
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);

            }, 100)
        },

        methods: {
            imageLoad() {
                this.$refs.scroll.refresh();
                this.getThemeY()
            },
            titleClick(index) {
                this.$refs.scroll.backScroll(0, -this.themeTopYs[index], 200)

            },
            contentScroll(position) {
                // console.log(position)
                // 获取y值
                const positionY = -position.y;
                // position中的值与主题中的值对比
                let length = this.themeTopYs.length;
                for (let i = 0; i < length; i++) {
                    if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i]
                        && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
                        this.currentIndex = i;
                        this.$refs.nav.currentIndex = this.currentIndex

                    }
                }

                // 是否显示回到底部
                this.isShowBackTop = (-position.y) > 1000
            },
            addToCart(){
                // 获取购物车需要展示的信息
                const product={};
                product.image=this.topImages[0];
                product.title=this.goods.title;
                product.desc=this.goods.desc;
                product.price=this.goods.realPrice;
                product.iid=this.iid;
                product.checked=true;

                // 将商品添加到购物车
                // this.$store.cartList.push(product);
                // this.$store.commit('addCart',product);
                // dispatch方法自带promise,用来监听事件完成
                this.$store.dispatch('addToCart',product).then(res=>{
                //     this.message=res;
                //     this.show=true;
                //     clearInterval(time);
                //    const time= setTimeout(()=>{
                //         this.show=false;
                //         this.message=''

                //     },1500)
                this.$toast.show(res,2000);
                    
                })
            }

        },
        mounted() {

        },
        destroyed() {
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        }
    }
</script>
<style scoped>
    #detail {
        position: relative;
        z-index: 999;
        background-color: white;
        /* 固定高度 */
        height: 100vh;
    }

    .content {
        /* calc运算符左右必须要空格 */
        /* 100%相对于父元素detail 所以必须给父元素一个固定高度 */
        height: calc(100% - 102px);
    }

    .detail-nav {
        position: relative;
        z-index: 999;
        background-color: white;
    }
</style>