<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <!-- 保持活跃 记录状态 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar';

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>