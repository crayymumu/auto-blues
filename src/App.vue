<template>
  <router-view />
</template>

<script lang="ts">
import { onBeforeMount } from 'vue'

export default {
  setup() {
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const $wrapper = document.getElementById('app')
      let style = '';
      if (width >= height) { // 横屏
        style += 'width:' + width + 'px;'; // 注意旋转后的宽高切换
        style += 'height:' + height + 'px;';
        style += '-webkit-transform: rotate(0); transform: rotate(0);';
        style += '-webkit-transform-origin: 0 0;';
        style += 'transform-origin: 0 0;';
      } else { // 竖屏
        style += 'width:' + height + 'px;';
        style += 'height:' + width + 'px;';
        style += '-webkit-transform: rotate(90deg); transform: rotate(90deg);';
        // 注意旋转中点的处理
        style += '-webkit-transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;';
        style += 'transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;';
      }
      // eslint-disable-next-line
      ($wrapper as any).style.cssText = style;
    }

    onBeforeMount(() => {
      window.addEventListener('resize', resize)
      resize()
    })
  }
}
</script>

<style lang="less">
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
