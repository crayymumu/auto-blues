<template>
  <section class="harmonica">
    <div class="cover">
      <span class="screws left" />
      <span class="plate" />
      <span class="screws right" />
    </div>
    <div class="reeds blow" />
    <div class="comb">
      <div
        v-for="(holeItem, holeKey) in cBottomHarmonicaHoles"
        :key="holeKey"
        class="holes"
        :data-hole="holeKey+1"
        @mousedown="handleClickHoles(holeItem, 10)"
        @mouseup="handleCancel(holeItem)"
      >
        <span class="reed" />
        <span class="rivet" />
      </div>
    </div>
    <div class="reeds draw" />
    <div class="cover">
      <span class="screws bottom left" />
      <span class="plate bottom" />
      <span class="screws bottom right" />
    </div>
  </section>
</template>

<script>
import WebAudioFontPlayer from 'webaudiofont'
import { reactive, toRefs, onMounted } from 'vue'
import tone from '@/lib/tone'

export default {
  props: {
    test: {
      type: String,
      required: true
    }
  },
  setup(props) {
    props.test

    const state = reactive({
      cTopHarmonicaHoles: [
        {
          name: 'C5',
          pitch: tone['C5'],
        },
        {
          name: 'E5',
          pitch: tone['E5'],
        },
        {
          name: 'G5',
          pitch: tone['G5'],
        },
        {
          name: 'C6',
          pitch: tone['C6'],
        },
        {
          name: 'E6',
          pitch: tone['E6'],
        },
        {
          name: 'G6',
          pitch: tone['G6'],
        },
        {
          name: 'C',
          pitch: tone['C7'],
        },
        {
          name: 'E',
          pitch: tone['E7'],
        },
        {
          name: 'G',
          pitch: tone['G7'],
        },
        {
          name: 'C',
          pitch: tone['C8'],
        },
      ],
      cBottomHarmonicaHoles: [
        {
          name: 'D',
          pitch: tone['D5']
        },
        {
          name: 'G',
          pitch: tone['G5']
        },
        {
          name: 'B',
          pitch: tone['B5']
        },
        {
          name: 'D',
          pitch: tone['D6']
        },
        {
          name: 'F',
          pitch: tone['F6']
        },
        {
          name: 'A',
          pitch: tone['A6']
        },
        {
          name: 'B',
          pitch: tone['B6']
        },
        {
          name: 'D',
          pitch: tone['D7']
        },
        {
          name: 'F',
          pitch: tone['F7']
        },
        {
          name: 'A',
          pitch: tone['A7']
        },
      ],
      instr: null,
      player: null,
      audioContext: null,
      cacheHole: {}
    })

    const AudioContextFunc = window.AudioContext || window.webkitAudioContext
    const audioContext = new AudioContextFunc()
    const player = new WebAudioFontPlayer()
    const path = 'https://blog-oss-file.oss-cn-shanghai.aliyuncs.com/blog-fileimages/audioFont/harmonica1.js'
    const name = '_tone_0220_Aspirin_sf2_file'
    player.loader.startLoad(audioContext, path, name)

    player.loader.waitLoad(() => {
      state.instr = window[name]
    })
    state.player = player
    state.audioContext = audioContext

    const display = (when, pitch, duration) => {
      return state.player.queueWaveTable(
        state.audioContext,
        state.audioContext.destination,
        state.instr,
        when,
        pitch,
        duration,
      )
    }

    const handleClickHoles = (item, duration, when = 0) => {
      state.cacheHole[item.pitch] = display(when, item.pitch, duration)
    }

    // bd谱 单音处理 B Blow 吹 D Draw 吸
    const displaySingleDb = (index, type, duration, when) => {
      if (type === 'B') {
        handleClickHoles(state.cTopHarmonicaHoles[index - 1], duration, when)
      } else if (type === 'D') {
        handleClickHoles(state.cBottomHarmonicaHoles[index - 1], duration, when)
      }
    }

    const displayDb = () => {
      let totalDuration = 0
      const dbList = [
        {
          note: '4B',
          duration: 1,
        },
        {
          note: '4D',
          duration: 1,
        },
        {
          note: '5B',
          duration: 1,
        },
        {
          note: '4B',
          duration: 1,
        },

        {
          note: '4B',
          duration: 1,
        },
        {
          note: '4D',
          duration: 1,
        },
        {
          note: '5B',
          duration: 1,
        },
        {
          note: '4B',
          duration: 1,
        },

        {
          note: '5B',
          duration: 1,
        },
        {
          note: '5D',
          duration: 1,
        },
        {
          note: '6B',
          duration: 1,
        },
        {
          note: '',
          duration: 1,
        },

        {
          note: '5B',
          duration: 1,
        },
        {
          note: '5D',
          duration: 1,
        },
        {
          note: '6B',
          duration: 1,
        },
        {
          note: '',
          duration: 1,
        },

        {
          note: '6B',
          duration: 0.5,
        },
        {
          note: '6D',
          duration: 0.5,
        },
        {
          note: '6B',
          duration: 1,
        },
        {
          note: '5D',
          duration: 1,
        },
        {
          note: '5B',
          duration: 1,
        },
        {
          note: '4B',
          duration: 1,
        },

        {
          note: '6B',
          duration: 0.5,
        },
        {
          note: '6D',
          duration: 0.5,
        },
        {
          note: '6B',
          duration: 1,
        },
        {
          note: '5D',
          duration: 1,
        },
        {
          note: '5B',
          duration: 1,
        },
        {
          note: '4B',
          duration: 1,
        },

        {
          note: '4B',
          duration: 1,
        },
        {
          note: '3B',
          duration: 1,
        },
        {
          note: '4B',
          duration: 1,
        },
        {
          note: '',
          duration: 1,
        },

        {
          note: '4B',
          duration: 1,
        },
        {
          note: '3B',
          duration: 1,
        },
        {
          note: '4B',
          duration: 1,
        },
        {
          note: '',
          duration: 1,
        },
      ]
      // const dbList2 = [
      //   '5B', '5B', '4D', '4B3D', '4B', '4D', '5B', '5B6B', '6D', '6D7D', '6D', '6B4D', '5B',
      //   '5B', '6B6D', '6D', '6B', '5D5B', '5D', '5B4D4B', '3D"', '3D', '4B', '5B4D', '3D', '3B', '3D"',
      // ]
      dbList.forEach(item => {
        totalDuration += item.duration
        // console.log(item.substring(0, 1), item.substring(1, 2))
        if (item.note) {
          displaySingleDb(item.note.substring(0, 1), item.note.substring(1, 2), item.duration, totalDuration)
        }
      })
    }

    onMounted(() => {
      setTimeout(() => {
        displayDb()
      }, 2000)
    })

    const handleCancel = item => {
      state.cacheHole[item.pitch].cancel()
    }

    return {
      ...toRefs(state),
      handleClickHoles,
      handleCancel,
    }
  }
}
</script>

<style lang="less">
.harmonica {
  display: flex;
  flex-direction: column;
  width: 405px;
  height: 82px;

  > .cover {
    display: flex;
    justify-content: center;

    > .screws {
      width: 32px;
      height: 2px;
      background: linear-gradient(to bottom, rgba(204, 204, 204, 1) 0%, rgba(51, 51, 51, 1) 95%, rgba(0, 0, 0, 1) 100%);
      align-self: flex-end;

      &.left {
        border-top-left-radius: 2px;
      }
      &.right {
        border-top-right-radius: 2px;
      }
      &.bottom {
        background: linear-gradient(to top, rgba(204, 204, 204, 1) 0%, rgba(51, 51, 51, 1) 95%, rgba(0, 0, 0, 1) 100%);
        align-self: flex-start;

        &.left {
          border-top-left-radius: 0;
          border-bottom-left-radius: 2px;
        }
        &.right {
          border-top-right-radius: 0;
          border-bottom-right-radius: 2px;
        }
      }
    }
    > .plate {
      display: flex;
      width: 333px;
      height: 24px;
      border-radius: 10px 10px 0 0;
      background: linear-gradient(to bottom, #000000 0%,#777777 5%,#000000 10%,#555555 30%,#888888 50%,#e2e2e2 70%,#cccccc 95%,#000000 100%,#000000 100%,#777777 100%);

      &.bottom {
        border-radius: 0 0 10px 10px;
        background: linear-gradient(to bottom, #777777 0%,#000000 0%,#000000 0%,#cccccc 5%,#e2e2e2 30%,#888888 50%,#555555 70%,#000000 90%,#777777 95%,#000000 100%);
      }
    }
  }

  > .reeds {
    height: 3px;
    background: linear-gradient(to bottom, rgba(156, 128, 68, 1) 20%,rgba(196, 161, 85, 1) 50%,rgba(156, 128, 68, 1) 80%);

    &.blow {
      border-radius: 2px 2px 0 0;
    }
    &.draw {
      border-radius: 0 0 2px 2px;
    }
  }

  > .comb {
    display: flex;
    justify-content: center;
    flex: 1;
    background-image: linear-gradient(90deg, rgba(133,68,12, .9) 50%, transparent 50%),
    linear-gradient(90deg, rgba(133,68,12, .9) 50%, transparent 50%),
    linear-gradient(90deg, transparent 50%, rgba(133,68,12, .9) 50%),
    linear-gradient(90deg, transparent 50%, rgba(133,68,12, .9) 50%);
    background-size: 2px, 3px, 4px, 6px;

    > .holes {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 18px;
      height: 100%;
      margin: 0 6.5px;
      background-color: black;
      position: relative;
      cursor: pointer;

      &:hover {
        background-color: white;
      }

      &:before {
        content: attr(data-hole);
        display: block;
        font-size: 12px;
        font-weight: 100;
        color: #ccc;
        text-align: center;
        position: absolute;
        top: -15px;
        left: 5px;
        user-select: none;
      }
      &:last-child {
        &:before {
          left: 1px;
        }
      }
      > .reed {
        display: flex;
        width: 15px;
        height: 1px;
        background: linear-gradient(to right, rgba(156, 128, 68, 1) 20%, rgba(196, 161, 85, 1) 50%, rgba(156, 128, 68, 1) 80%);
      }
      > .rivet {
        display: flex;
        width: 5px;
        height: 2px;
        background: linear-gradient(to right, rgba(19, 16, 8, 1) 1%, rgba(196, 161, 85, 1) 50%, rgba(19, 16, 8, 1) 100%);
      }
    }
  }
}
</style>
