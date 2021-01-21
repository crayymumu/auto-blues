<template>
  <div class="home">
    <div class="layout-container">
      <div class="notations-container">
        <Notations />
      </div>
      <div class="harmonica-container">
        <div class="switch-container">
          <div class="expSwitch">
            <input id="model" type="checkbox">
            <label for="model" @click="modeValue = !modeValue" />
            <span class="play-tips">Play</span>
            <span class="perform-tips">Perform</span>
          </div>
        </div>
        <Harmonica :mode="modeValue" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Harmonica from '@/components/Harmonica.vue'
import { reactive, toRefs, watch } from 'vue'
import Notations from '@/components/Notations.vue';

export default {
  components: {
    Harmonica,
    Notations
  },
  setup() {
    const state = reactive({
      modeValue: false
    })

    watch(
      () => state.modeValue,
      (val) => {
        if (val) {
          console.log('播放模式')
        } else {
          console.log('演奏模式')
        }
      }
    )

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
  position: relative;
  background: linear-gradient(to bottom, #afa4a1 0%, #eae6e0 70%, #fffeee 100%) no-repeat;

  .layout-container {
    display: flex;
    padding: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    .notations-container {
      flex: 1;
      height: 100%;
      width: 100%;
    }
    .harmonica-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .switch-container {
        position: absolute;
        top: 0;
        .expSwitch {
          background: linear-gradient(to left, #ba6326, #c0884d 60%, #eaaa32);
          border-radius: 50px;
          box-shadow: inset 0 10px 10px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.2);
          height: 50px;
          margin: 20px auto;
          position: relative;
          width: 200px;
          z-index: 2;
          &:before {
            background: transparent;
            border: 3px solid #EAE6E0;
            border-radius: 55px;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.2);
            content: '';
            height: 62px;
            left: 10px;
            margin: -9px -19px;
            position: absolute;
            width: 212px;
            z-index: 0;
          }
          &:after {
            /* the outermost layer */
            background: none;
            border: none;
            border-radius: 55px;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(255, 255, 255, 0.2);
            content: '';
            width: 220px;
            height: 70px;
            left: -20px;
            margin: -10px 10px;
            position: absolute;
            right: 10px;
            z-index: 0;
          }

          label {
            background: linear-gradient(to top, #afa4a1 0%, #eae6e0 70%, #fffeee 100%);
            border-radius: 50px;
            box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.7);
            cursor: pointer;
            display: block;
            height: 60px;
            left: -5px;
            position: absolute;
            top: -5px;
            transition: all .4s ease;
            width: 120px;
            z-index: 1;
            user-select: none;
            user-focus: none;
            &:after {
              /* the inner circle */
              display: block;
              width: 30px;
              height: 30px;
              border-radius: 30px;
              position: relative;
              left: 50px;
              top: -5px;
              margin-top: 20px;
              margin-left: 20px;
              content:"";
              z-index: 2;
              background: linear-gradient(to bottom, #afa4a1 0%, #eae6e0 70%, #fffeee 100%);
            }
          }
          input[type=checkbox] {
            visibility: hidden;
          }
          input[type=checkbox]:checked + label {
            left: 85px;
          }

          .play-tips {
            user-select:none;
            color: #fffeee;
            position: absolute;
            font-size: 16px;
            font-weight: bold;
            left: 28px;
            top: 14px;
          }

          .perform-tips {
            user-select:none;
            color: #fffeee;
            position: absolute;
            font-size: 16px;
            font-weight: bold;
            right: 20px;
            top: 14px;
          }
        }
      }
    }
  }

}

</style>
