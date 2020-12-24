  <template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>

    </nav-bar>
    <tab-control @tabClick='tabClick' :titles="['流行','新款','精选']" ref='tabControl1' @class="tab-control"
      v-show="isTabFixed"></tab-control>
    <!-- 进行封装 -->
    <!-- <swiper>
      <swiper-item v-for="item in banners" :key="item.id">
        <a :href="item.link">
           <img :src='item.image' alt="">
        </a>
      </swiper-item>
    </swiper> -->


    <!-- 使用子组件 将banners传给子组件-->
    <!-- 这里probe-type加冒号，系统才会默认3为number类型 -->
    <scroll class='content' ref='scroll' :probe-type='3' @scroll="contentScroll" :pull-up-load="true"
      @pullingUp='loadMore'>
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad' />
      <recommend-view :recommends="recommends" />
      <featureView></featureView>
      <tab-control @tabClick='tabClick' ref='tabControl2' :titles="['流行','新款','精选']"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <!-- 监听组件的点击事件必须加native -->
    <back-top @click.native='backClick' v-show='isShowBackTop'></back-top>
  </div>
</template>

<script>

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'


  import NavBar from 'components/commen/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodList'
  import Scroll from 'components/commen/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  // import {Swiper,SwiperItem} from 'components/commen/swiper/index.js'

  import { getHomeMultidata, getHomeGoods } from "network/home";
  import { debounce } from "commen/utils"
  import { itemListenerMixin } from "commen/mixin"

  export default {
    name: "Home",
    components: {

      // Swiper,
      // SwiperItem
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list

      }

    },

    // 活跃
    activated() {
      // 当前页面重新活跃时迅速回到用户已经滚动的位置
      this.$refs.scroll.backScroll(0, this.saveY, 0)
      // 对scroll刷新
      this.$refs.scroll.refresh()

    },
    // 离开
    deactivated() {
      // 给saveY设置为当前滚动位置
      this.saveY = this.$refs.scroll.getScrollY();
      // 取消全局事件监听
      // 参数1：要取消的监听
      // 参数2：需要取消监听的函数
      this.$bus.$off('itemImgLoad', this.itemImgListener)


    },
    mixins: [itemListenerMixin],
    data() {
      return {
        // result:{},
        // 取出result中的banners
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] },
        },
        // showGoods:[],
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      //2. 请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      // // 调用debounce函数，并将refresh函数作为参数传递进去，并接收函数返回值
      // const refresh = debounce(this.$refs.scroll.refresh, 200)
      // // 监听item中图片加载完成
      // // 用事件总线的方式将item中的事件传到home中，用$on接收
      // // 不能在created里面执行监听，因为里面很有可能拿不到$refs
      // // 对监听的事件进行保存
      // this.itemImgListener=() => {
      //   refresh();
      // }
      // this.$bus.$on('itemImageLoad',  this.itemImgListener);
    },
    methods: {

      /**
       * 
       * 网络请求相关
      */
      getHomeMultidata() {

        // 首页组件创建后就请求主页的数据
        getHomeMultidata().then(res => {

          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })

      },
      getHomeGoods(type) {
        // 用了对象[属性]的方式
        const page = this.goods[type].page + 1;

        getHomeGoods(type, page).then(res => {
          // push 方法本身可以传递多个值
          // ...表示可以传递多个
          // 这种写法将res.data.list数组中的每个元素获取并push到goods中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1;
          // scroll默认加载一次，在加载完后调用finishPullUp函数用于多次加载
          this.$refs.scroll.finishPullUp()
        })

      },
      /**
       * 事件监听相关方法
      */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        // 让两个tab-control点击的位置一样
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        // 拿到组件的scroll对象就可以得到里面的属性scroll
        // 第三个参数表示上滑到指定位置所用时间，单位毫秒
        this.$refs.scroll.backScroll(0, 0, 500)

      },
      contentScroll(position) {
        // 判断backTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 决定tabControl是否吸顶（position:fixed;）
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 获取tab-control的OffsetTop
        // 这里获得的tabControl是组件，而组件有个属性$el可以用来获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;

      }

    }

  }
</script>
<!-- scoped表示作用域，其他地方相同的class只对当前有效 -->
<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }




  /* .content{
     calc函数中 运算符左右必须要留位置 
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;

  } */
  .content {
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>