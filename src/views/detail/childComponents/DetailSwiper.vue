<template>
        <swiper class="detail-swiper">
            <swiper-item v-for="item in topImages"  :key="item.id">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
</template>
<script>
    // swiper 文件夹下的index.js文件
    import { Swiper, SwiperItem } from 'components/commen/swiper'


    export default {
        name: "DetailSwiper",
        props: {
            topImages: {
                type: Array,
                default() {
                    return []
                }
            }

        },
        components: {
            Swiper,
            SwiperItem,
        }
    }
</script>
<style scoped>
    .detail-swiper{
        height: 300px;
        overflow: hidden;

    }
</style>