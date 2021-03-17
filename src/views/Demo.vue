<template>
  <el-container>
    <el-header>简易乐理演示</el-header>
    <el-main>
      <div style="width: 100%;display: flex;align-items: center;justify-content: center;text-align: left">
        <div style="width: 800px;">
          <el-form ref="form" :label-position="'left'" :model="demoForm" label-width="80px">
            <el-form-item label="乐器类型">
              <el-select v-model="demoForm.select" placeholder="请选择" @change="handleChangeSelect">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="音调">
              <el-select v-model="demoForm.tone" placeholder="请选择">
                <el-option
                  v-for="item in toneOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="handleDisplaySingle">单音</el-button>
            </el-form-item>
            <el-form-item label="速度">
              <el-input-number v-model="demoForm.speed" :min="60" :max="200" />
            </el-form-item>
            <el-form-item label="简谱">
              <el-input v-model="demoForm.desc" type="textarea" :rows="6" />
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="handleDisplayTarget">简谱</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import WebAudioFontPlayer from 'webaudiofont'
import tone from '@/lib/tone'
import { reactive, toRefs, ref } from 'vue'
import { isNumber, parseInt } from 'lodash'
import { DEMO_WEBFONT_LIST, DisplayType, BarStandard } from '@/constant'
import { notationStore } from '@/store/modules/notation.ts';
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElButton
} from 'element-plus'

export default {
  name: 'Demo',
  components: {
    ElHeader,
    ElContainer,
    ElMain,
    ElSelect,
    ElOption,
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElButton
  },
  setup() {
    const demoForm = ref({
      select: 0,
      speed: 110,
      tone: 'C5',
    })
    const state = reactive({
      harmonicaHoles: [
        {
          blow: {
            scaleCN: 'do',
            scale: 'C',
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
            scaleCN: 're',
            scale: 'D',
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
            scaleCN: 'mi',
            scale: 'E',
            scaleNumber: '3.',
            pitch: tone['E5'],
          },
          draw: {
            scaleCN: 'so',
            scale: 'G',
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
            scaleCN: 'so',
            scale: 'G',
            scaleNumber: '5.',
            pitch: tone['G5'],
          },
          draw: {
            scaleCN: 'si',
            scale: 'B',
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
            scaleCN: 'do',
            scale: 'C',
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
            scaleCN: 're',
            scale: 'D',
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
            scaleCN: 'mi',
            scale: 'E',
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
            scaleCN: 'fa',
            scale: 'F',
            scaleNumber: '4',
            pitch: tone['F6']
          },
        },
        {
          blow: {
            scaleCN: 'so',
            scale: 'G',
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
            scaleCN: 'la',
            scale: 'A',
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
            scaleCN: 'do',
            scale: 'C',
            scaleNumber: '1。',
            pitch: tone['C7'],
          },
          draw: {
            scaleCN: 'si',
            scale: 'B',
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
            scaleCN: 'mi',
            scale: 'E',
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
            scaleCN: 're',
            scale: 'D',
            scaleNumber: '2。',
            pitch: tone['D7']
          },
        },
        {
          blow: {
            scaleCN: 'so',
            scale: 'G',
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
            scaleCN: 'fa',
            scale: 'F',
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
            scaleCN: 'do',
            scale: 'C',
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
            scaleCN: 'la',
            scale: 'A',
            scaleNumber: '6。',
            pitch: tone['A7']
          },
        },
      ],
      options: [
        {
          value: 0,
          label: '钢琴'
        },
        {
          value: 1,
          label: '口琴'
        },
        {
          value: 2,
          label: '吉他'
        },
        {
          value: 3,
          label: '长笛'
        }
      ],
      toneOptions: [
        {
          value: 'C5',
          label: 'C'
        },
        {
          value: 'C#5',
          label: 'C#'
        },
        {
          value: 'D5',
          label: 'D'
        },
        {
          value: 'D#5',
          label: 'D#'
        },
        {
          value: 'E5',
          label: 'E'
        },
        {
          value: 'F5',
          label: 'F'
        },
        {
          value: 'F#5',
          label: 'F#'
        },
        {
          value: 'G5',
          label: 'G'
        },
        {
          value: 'G#5',
          label: 'G#'
        },
        {
          value: 'A5',
          label: 'A'
        },
        {
          value: 'A#5',
          label: 'A#'
        },
        {
          value: 'B5',
          label: 'B'
        },
      ],
      webAudioConfig: {
        audioContext: null,
        instr: null,
        player: null,
      },
      totalDuration: 0,
      lastDuration: 0,
      notationCache: {},
      lastNotionEnd: null,
    })

    // 加载 webAudio 对应音色
    const loadWebAudio = () => {
      const currentSelect = demoForm.value.select
      const AudioContextFunc = window.AudioContext || window.webkitAudioContext
      state.webAudioConfig.audioContext = new AudioContextFunc()
      state.webAudioConfig.player = new WebAudioFontPlayer()
      const path = DEMO_WEBFONT_LIST[currentSelect].path
      const value = DEMO_WEBFONT_LIST[currentSelect].value
      state.webAudioConfig.player.loader.startLoad(state.webAudioConfig.audioContext, path, value)
      state.webAudioConfig.player.loader.waitLoad(() => {
        state.webAudioConfig.instr = window[value]
      })
    }

    // 停止演奏
    const stopDisplay = () => {
      state.webAudioConfig.player.cancelQueue(state.webAudioConfig.audioContext)
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

    // 乐谱解析
    const analyzeNotation = (notation, defaultDuration) => {
      let notationResult = []
      notation
        // 1. 分拍拆分
        .split('|')
        // 2. 将每一拍中的乐符独立拆分
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
              } else if (targetNote === '=') {
                duration = duration / 4
              } else if (targetNote === '~') {
                duration = duration / 8
              } else if (targetNote === '≈') {
                duration = duration / 16
              }
            }
            return {
              note,
              duration,
            }
          })
          notationResult = notationResult.concat(notesDisplay)
        })
      console.log(notationResult)
      return notationResult
    }

    // 乐谱演奏
    const displayNotation = (notationResult, singleDuration) => {
      if (state.lastNotionEnd) {
        clearTimeout(state.lastNotionEnd)
      }
      for (let i = 0; i < notationResult.length; i++) {
        let displayDuration = 0
        const notationItem = notationResult[i]
        if (notationItem.note !== '0') {
          state.harmonicaHoles.forEach(holeItem => {
            const allScale = []
            allScale.push(Object.assign(holeItem.blow, {
              type: DisplayType.Blow,
              displayType: DisplayType.Blow,
            }))
            allScale.push(Object.assign(holeItem.draw, {
              type: DisplayType.Draw,
              displayType: DisplayType.Draw,
            }))
            for (let i = 0; i < allScale.length; i++) {
              const scaleItem = allScale[i]
              // 基本吹奏
              if (scaleItem.scaleNumber === notationItem.note) {
                const envelope = display(state.totalDuration, scaleItem.pitch, notationItem.duration * singleDuration)
                displayDuration = envelope.duration
                scaleItem.displayType = scaleItem.type
              }
              // 技巧吹奏
              if (scaleItem.special && scaleItem.special.length > 0) {
                scaleItem.special.forEach(specialItem => {
                  if (specialItem.scaleNumber === notationItem.note) {
                    const envelope = display(state.totalDuration, specialItem.pitch, notationItem.duration * singleDuration)
                    displayDuration = envelope.duration
                    scaleItem.displayType = specialItem.type
                  }
                })
              }
            }
          })
        } else {
          displayDuration = notationItem.duration * singleDuration
        }
        state.totalDuration += displayDuration
      }
      state.lastNotionEnd = setTimeout(() => {
        stopDisplay()
        notationStore.pauseNotation()
      }, (state.totalDuration - state.lastDuration) * 1000)
    }

    // 简谱演绎
    const handleDisplayTarget = () => {
      // hack：记录上一首谱子的持续时间，并将当前时间作为演绎的开始时间
      if (state.webAudioConfig.audioContext.state === 'running') {
        state.lastDuration = state.webAudioConfig.audioContext.currentTime
        state.totalDuration = state.webAudioConfig.audioContext.currentTime
      }
      const defaultDuration = BarStandard.semiquaver.multiple
      const notationResult = analyzeNotation(demoForm.value.desc, defaultDuration)
      displayNotation(notationResult, demoForm.value.speed / 60)
      state.notationCache = {
        notation: notationResult,
        speed: demoForm.value.speed / 60
      }
    }

    // 单音演奏
    const handleDisplaySingle = () => {
      display(state.totalDuration, tone[demoForm.value.tone], 0.5)
    }

    const handleChangeSelect = () => {
      loadWebAudio()
    }

    loadWebAudio()

    return {
      ...toRefs(state),
      demoForm,
      handleDisplaySingle,
      handleDisplayTarget,
      handleChangeSelect
    }
  }
}
</script>

<style lang="less">
section {
  height: 100%;
  width: 100%;
}
</style>
