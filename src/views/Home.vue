<template>
  <div class="home">
    <Harmonica :test="value" />
  </div>
</template>

<script lang="ts">
import Harmonica from '@/components/Harmonica.vue'
import { reactive, toRefs, onBeforeMount } from 'vue'

export default {
  components: {
    Harmonica
  },
  setup() {
    const state = reactive({
      value: 123
    })

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

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="less">
.home {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
