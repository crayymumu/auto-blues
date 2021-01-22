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
        v-for="(holeItem, holeKey) in harmonicaHoles"
        :key="holeKey"
        class="holes"
        :data-hole="holeKey+1"
      >
        <div
          class="tips-top bubble"
          :class="{
            'visible': holeItem.blow.bubbleVisible
          }"
        >
          吹
        </div>
        <div
          class="tips-bottom bubble"
          :class="{
            'visible': holeItem.draw.bubbleVisible
          }"
        >
          吸
        </div>
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
import { reactive, toRefs, onMounted, watch } from 'vue'
import tone from '@/lib/tone'
import { BarStandard, DisplayType } from '@/constant'
import { isNumber, parseInt } from 'lodash'
import { notationStore } from '@/store/modules/notation.ts';

export default {
  props: {
    mode: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    props.mode

    const state = reactive({
      harmonicaHoles: [
        {
          blow: {
            scale: 'do',
            scaleNumber: '1.',
            pitch: tone['C5'],
            special: [
              {
                type: DisplayType.OverBlow,
                scale: 're',
                scaleNumber: '2.#',
                pitch: tone['D#5'],
              }
            ],
          },
          draw: {
            scale: 're',
            scaleNumber: '2.',
            pitch: tone['D5'],
            special: [
              {
                type: DisplayType.OverBend,
                scale: 'do',
                scaleNumber: '2.b',
                pitch: tone['C#5'],
              },
            ]
          },
        },
        {
          blow: {
            scale: 'mi',
            scaleNumber: '3.',
            pitch: tone['E5'],
          },
          draw: {
            scale: 'so',
            scaleNumber: '5.',
            pitch: tone['G5'],
            special: [
              {
                type: DisplayType.OverBend,
                scale: 'fa',
                scaleNumber: '5.b',
                pitch: tone['F#5'],
              },
              {
                type: DisplayType.OverBend,
                scale: 'fa',
                scaleNumber: '4.',
                pitch: tone['F5'],
              },
            ]
          },
        },
        {
          blow: {
            scale: 'so',
            scaleNumber: '5.',
            pitch: tone['G5'],
          },
          draw: {
            scale: 'si',
            scaleNumber: '7.',
            pitch: tone['B5'],
            special: [
              {
                type: DisplayType.OverBend,
                scale: 'la',
                scaleNumber: '7.b',
                pitch: tone['A#5'],
              },
              {
                type: DisplayType.OverBend,
                scale: 'la',
                scaleNumber: '6.',
                pitch: tone['A5'],
              },
              {
                type: DisplayType.OverBend,
                scale: 'so',
                scaleNumber: '6.b',
                pitch: tone['G#5'],
              },
            ]
          },
        },
        {
          blow: {
            scale: 'do',
            scaleNumber: '1',
            pitch: tone['C6'],
            special: [
              {
                type: DisplayType.OverBlow,
                scale: 're',
                scaleNumber: '2#',
                pitch: tone['D#6'],
              }
            ],
          },
          draw: {
            scale: 're',
            scaleNumber: '2',
            pitch: tone['D6'],
            special: [
              {
                type: DisplayType.OverBend,
                scale: 're',
                scaleNumber: '2b',
                pitch: tone['C#6'],
              }
            ]
          },
        },
        {
          blow: {
            scale: 'mi',
            scaleNumber: '3',
            pitch: tone['E6'],
            special: [
              {
                type: DisplayType.OverBlow,
                scale: 'fa',
                scaleNumber: '4#',
                pitch: tone['F#6'],
              }
            ],
          },
          draw: {
            scale: 'fa',
            scaleNumber: '4',
            pitch: tone['F6']
          },
        },
        {
          blow: {
            scale: 'so',
            scaleNumber: '5',
            pitch: tone['G6'],
            special: [
              {
                type: DisplayType.OverBlow,
                scale: 'la',
                scaleNumber: '6#',
                pitch: tone['A#6'],
              },
              {
                type: DisplayType.OverBend,
                scale: 'so',
                scaleNumber: '5#',
                pitch: tone['G#6'],
              }
            ],
          },
          draw: {
            scale: 'la',
            scaleNumber: '6',
            pitch: tone['A6'],
            special: [
              {
                type: DisplayType.OverBend,
                scale: 'la',
                scaleNumber: '6b',
                pitch: tone['G#6'],
              }
            ]
          },
        },
        {
          blow: {
            scale: 'do',
            scaleNumber: '1。',
            pitch: tone['C7'],
          },
          draw: {
            scale: 'si',
            scaleNumber: '7',
            pitch: tone['B6'],
            special: [
              {
                type: DisplayType.OverDraw,
                scale: 'do',
                scaleNumber: '1。#',
                pitch: tone['C#7'],
              }
            ]
          },
        },
        {
          blow: {
            scale: 'mi',
            scaleNumber: '3。',
            pitch: tone['E7'],
            special: [
              {
                type: DisplayType.OverBend,
                scale: 're',
                scaleNumber: '3。b',
                pitch: tone['D#7'],
              }
            ],
          },
          draw: {
            scale: 're',
            scaleNumber: '2。',
            pitch: tone['D7']
          },
        },
        {
          blow: {
            scale: 'so',
            scaleNumber: '5。',
            pitch: tone['G7'],
            special: [
              {
                type: DisplayType.OverBend,
                scale: 'fa',
                scaleNumber: '5。b',
                pitch: tone['F#7'],
              }
            ],
          },
          draw: {
            scale: 'fa',
            scaleNumber: '4。',
            pitch: tone['F7'],
            special: [
              {
                type: DisplayType.OverDraw,
                scale: 'so',
                scaleNumber: '5。#',
                pitch: tone['G#7'],
              }
            ]
          },
        },
        {
          blow: {
            scale: 'do',
            scaleNumber: '5。。',
            pitch: tone['C8'],
            special: [
              {
                type: DisplayType.OverBend,
                scale: 'si',
                scaleNumber: '7。',
                pitch: tone['B7'],
              },
              {
                type: DisplayType.OverBend,
                scale: 'la',
                scaleNumber: '7。b',
                pitch: tone['A#7'],
              },
            ],
          },
          draw: {
            scale: 'la',
            scaleNumber: '6。',
            pitch: tone['A7']
          },
        },
      ],
      webAudioConfig: {
        audioContext: null,
        instr: null,
        player: null,
      },
      cacheHole: {},
      totalDuration: 0,
      lastDuration: 0,
      loading: false,
      holeDelay: [],
      notationCache: {}
    })

    // const getCurrentPlayStatus = computed(() => {
    //   return notationStore.getPlayStatus
    // });
    //
    // getCurrentPlayStatus

    // 初始化所有气泡状态
    const initAllBubble = (flag = false) => {
      state.harmonicaHoles.forEach(harmonicaItem => {
        harmonicaItem.draw.bubbleVisible = flag
        harmonicaItem.blow.bubbleVisible = flag
      })
    }

    // 加载 webAudio 对应音色
    const loadWebAudio = () => {
      const AudioContextFunc = window.AudioContext || window.webkitAudioContext
      state.webAudioConfig.audioContext = new AudioContextFunc()
      state.webAudioConfig.player = new WebAudioFontPlayer()
      const path = 'https://blog-oss-file.oss-cn-shanghai.aliyuncs.com/blog-fileimages/audioFont/harmonica1.js'
      const name = '_tone_0220_Aspirin_sf2_file'

      state.webAudioConfig.player.loader.startLoad(state.webAudioConfig.audioContext, path, name)
      state.webAudioConfig.player.loader.waitLoad(() => {
        state.loading = false
        state.webAudioConfig.instr = window[name]
      })
    }

    // 根据频率和持续时长发声
    const display = (when, pitch, duration) => {
      return state.webAudioConfig.player.queueWaveTable(
        state.webAudioConfig.audioContext,
        state.webAudioConfig.audioContext.destination,
        state.webAudioConfig.instr,
        when,
        pitch,
        duration,
      )
    }

    const handleCacheNote = (pitch, duration, when = 0) => {
      state.cacheHole[pitch] = display(when, pitch, duration)
    }

    const handleCancel = item => {
      state.cacheHole[item.pitch].cancel()
    }

    // 乐谱解析
    const analyzeNotation = (notation, defaultDuration) => {
      let notationResult = []
      notation
        // 1. 分拍拆分
        .split('|')
        // 2. 将每一拍中的乐符
        .forEach(notationItem => {
          let start = 0
          const notes = []
          for (let i = 1; i < notationItem.length; i++) {
            if (!isNaN(parseInt(notationItem.charAt(i))) && isNumber(parseInt(notationItem.charAt(i)))) {
              notes.push(notationItem.substring(start, i))
              start = i
            }
            if (i === notationItem.length - 1) {
              notes.push(notationItem.substring(start, i + 1))
            }
          }
          // console.log(notes)
          // 3. 将乐符及对应时间确认，最后拼凑成完整的乐谱
          const notesDisplay = notes.map(noteItem => {
            let duration = defaultDuration
            let note = noteItem.charAt(0)
            for (let i = 1; i < noteItem.length; i++) {
              const targetNote = noteItem.charAt(i)
              if (targetNote === '.' || targetNote === '。' || targetNote === '#' || targetNote === 'p') {
                note = note.concat(targetNote)
                continue
              }
              if (targetNote === '-') {
                duration += defaultDuration
              } else if (targetNote === ',') {
                duration += defaultDuration / 2
              } else if (targetNote === '_') {
                duration = duration / 2
              }
            }
            return {
              note,
              duration,
            }
          })
          notationResult = notationResult.concat(notesDisplay)
        })
      return notationResult
    }

    // 乐谱演奏
    const displayNotation = (notationResult, singleDuration) => {
      for (let i = 0; i < notationResult.length; i++) {
        let displayDuration = 0
        const notationItem = notationResult[i]
        if (notationItem.note !== '0') {
          state.harmonicaHoles.forEach(holeItem => {
            const allScale = []
            allScale.push(Object.assign(holeItem.blow, {
              type: DisplayType.Blow
            }))
            allScale.push(Object.assign(holeItem.draw, {
              type: DisplayType.Draw
            }))
            for (let i = 0; i < allScale.length; i++) {
              const scaleItem = allScale[i]
              let findHoleStatus = false
              let targetPitch = 0
              // 基本吹奏
              if (scaleItem.scaleNumber === notationItem.note) {
                const envelope = display(state.totalDuration, scaleItem.pitch, notationItem.duration * singleDuration)
                displayDuration = envelope.duration
                findHoleStatus = true
                targetPitch = scaleItem.pitch
              }
              // 技巧吹奏
              if (scaleItem.special && scaleItem.special.length > 0) {
                scaleItem.special.forEach(specialItem => {
                  if (specialItem.scaleNumber === notationItem.note) {
                    const envelope = display(state.totalDuration, specialItem.pitch, notationItem.duration * singleDuration)
                    displayDuration = envelope.duration
                    findHoleStatus = true
                    targetPitch = scaleItem.pitch
                  }
                })
              }
              if (findHoleStatus) {
                const delayDuration = state.totalDuration - state.lastDuration
                // 开始显示
                const delayStart = setTimeout(() => {
                  if (scaleItem.type === DisplayType.Blow) {
                    holeItem.blow.bubbleVisible = true
                  } else if (scaleItem.type === DisplayType.Draw) {
                    holeItem.draw.bubbleVisible = true
                  }
                }, delayDuration * 1000)
                // 结束显示
                const delayEnd = setTimeout(() => {
                  initAllBubble()
                }, (delayDuration + displayDuration) * 1000)
                state.holeDelay.push({
                  type: 'start',
                  when: delayDuration,
                  timeout: delayStart,
                  cache: {
                    when: state.totalDuration,
                    pitch: targetPitch,
                    duration: displayDuration
                  }
                })
                state.holeDelay.push({
                  type: 'end',
                  when: (delayDuration + displayDuration),
                  timeout: delayEnd
                })
              }
            }
          })
        } else {
          displayDuration = notationItem.duration * singleDuration
        }
        state.totalDuration += displayDuration
      }
    }

    const displayTargetNotion = (displayNotion = notationStore.getCurrentNotation) => {
      // hack：记录上一首谱子的持续时间，并将当前时间作为演绎的开始时间
      if (state.webAudioConfig.audioContext.state === 'running') {
        state.lastDuration = state.webAudioConfig.audioContext.currentTime
        state.totalDuration = state.webAudioConfig.audioContext.currentTime
      }
      const defaultDuration = BarStandard.semiquaver.multiple
      const notationResult = analyzeNotation(displayNotion.sheetMusic, defaultDuration)
      displayNotation(notationResult, displayNotion.speed)
      state.notationCache = {
        notation: notationResult,
        speed: displayNotion.speed
      }
    }

    state.loading = true

    initAllBubble()

    loadWebAudio()

    onMounted(() => {
      // getCurrentPlayStatus
    })

    watch(
      () => props.mode,
      (val) => {
        if (val) {
          initAllBubble(true)
        } else {
          initAllBubble()
        }
      }
    )

    watch(
      () => notationStore.getPlayStatus,
      (val) => {
        console.log('演奏持续时间', state.webAudioConfig.audioContext.currentTime - state.lastDuration)
        const durationTime = state.webAudioConfig.audioContext.currentTime - state.lastDuration
        if (val) {
          if (state.notationCache.notation && state.notationCache.notation.length > 0) {
            console.log('断点续奏')
            // hack：记录上一首谱子的持续时间，并将当前时间作为演绎的开始时间
            if (state.webAudioConfig.audioContext.state === 'running') {
              state.lastDuration = state.webAudioConfig.audioContext.currentTime
              state.totalDuration = state.webAudioConfig.audioContext.currentTime
            }
            displayNotation(state.notationCache.notation, state.notationCache.speed)
          } else {
            displayTargetNotion()
          }
        } else {
          console.log('暂停前', state.notationCache)
          state.webAudioConfig.player.cancelQueue(state.webAudioConfig.audioContext)
          state.holeDelay.forEach(delayItem => {
            clearTimeout(delayItem.timeout)
          })
          let currentTotal = 0
          state.notationCache.notation.forEach(notationItem => {
            currentTotal = currentTotal + notationItem.duration
            notationItem.totalDuration = currentTotal
          })
          state.notationCache.notation = state.notationCache.notation.filter(notationItem => notationItem.totalDuration >= durationTime)
          console.log('暂停后', state.notationCache)
        }
      }
    )

    return {
      ...toRefs(state),
      handleCacheNote,
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

      .tips-top {
        position: absolute;
        bottom: 60px;
      }

      .tips-bottom {
        position: absolute;
        top: 60px;
      }

      .bubble {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        color: white;
        background-image: linear-gradient(90deg, rgba(133,68,12, .9) 50%, transparent 50%),
        linear-gradient(90deg, rgba(133,68,12, .9) 50%, transparent 50%),
        linear-gradient(90deg, transparent 50%, rgba(133,68,12, .9) 50%),
        linear-gradient(90deg, transparent 50%, rgba(133,68,12, .9) 50%);
        transform: scale(0, 0);
        transition: transform 0.2s ease 0s;
      }

      .visible {
        transform: scale(1, 1);
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
