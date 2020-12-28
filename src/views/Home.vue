<template>
  <div class="home">
    <Harmonica />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Harmonica from '@/components/Harmonica.vue';

@Options({
  components: {
    Harmonica
  },
})
export default class Home extends Vue {}
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
