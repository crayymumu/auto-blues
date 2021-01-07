<template>
  <div class="home">
    <Harmonica :test="value" />
  </div>
</template>

<script lang="ts">
import Harmonica from '@/components/Harmonica.vue'
import { reactive, toRefs } from 'vue'

export default {
  components: {
    Harmonica
  },
  setup() {
    const state = reactive({
      value: 123
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
