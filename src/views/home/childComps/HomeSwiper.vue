<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.id">
      <!-- 图片是被a链接包裹的 -->
      <a :href="item.link">
        <img :src="item.image" alt="" @load='imageLoad'>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/commen/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        // 数组和对象设置默认值时必须通过函数的形式
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        if (!this.isLoad) {
          // 只需要发送一次
          this.$emit('swiperImageLoad');
          this.isLoad = true;
        }

      }
    }
  }
</script>

<style scoped>

</style>