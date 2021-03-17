<template>
  <div class="home">
    <div class="layout-container">
      <div
        class="harmonica-container"
      >
        <div v-show="!getPlayStatus" class="switch-container">
          <div class="expSwitch">
            <input id="model" type="checkbox">
            <label for="model" @click="modeValue = !modeValue" />
            <span class="play-tips">Play</span>
            <span class="perform-tips">Perform</span>
          </div>
        </div>
        <div class="placeholder">&nbsp;</div>
        <div
          class="harmonica-item"
          :style="{
            zoom: modeValue ? 1.5 : 1
          }"
        >
          <Harmonica :mode="modeValue" />
        </div>
        <div v-show="!modeValue" class="display-color">
          <div
            v-for="item in DisplayType"
            :key="item"
            class="color-item"
            :style="{
              backgroundColor: HarmonicaBubbleColor[item]
            }"
          >{{ item }}</div>
        </div>
      </div>
      <div v-show="!modeValue" class="notations-container">
        <Notations />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Harmonica from '@/components/Harmonica.vue'
import { computed, reactive, toRefs, watch } from 'vue'
import { HarmonicaBubbleColor, DisplayType } from '@/constant'
import Notations from '@/components/Notations.vue';
import { notationStore } from '@/store/modules/notation.ts';

export default {
  components: {
    Harmonica,
    Notations
  },
  setup() {
    const state = reactive({
      modeValue: false,
      HarmonicaBubbleColor,
      DisplayType,
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

    const getPlayStatus = computed(() => {
      return notationStore.getPlayStatus
    });

    return {
      ...toRefs(state),
      getPlayStatus
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
      flex: 2;
      height: 100%;
      width: 100%;
    }
    .harmonica-container {
      flex: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .display-color {
        user-select: none;
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: row;
        .color-item {
          color: #fffeee;
          padding: 2px 4px;
          margin-left: 4px;
        }
      }
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
      .placeholder {
        flex: 1.5;
        user-select: none;
      }
      .harmonica-item {
        flex: 2;
      }
    }
  }

}
</style>
