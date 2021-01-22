import { TreatedNotation } from '@/constant/types.ts';
import { isNumber, isNaN } from 'lodash'

/**
 * 解析语义简谱
 * @param sheetMusic
 * @param beat
 */
export function analyzeNotation(sheetMusic: string, beat: number) {
  let notationResult: Array<TreatedNotation> = []
  sheetMusic
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
      const notesDisplay: Array<TreatedNotation> = notes.map(noteItem => {
        let duration = beat
        let note = noteItem.charAt(0)
        for (let i = 1; i < noteItem.length; i++) {
          const targetNote = noteItem.charAt(i)
          if (targetNote === '.' || targetNote === '。' || targetNote === '#' || targetNote === 'p') {
            note = note.concat(targetNote)
            continue
          }
          if (targetNote === '-') {
            duration += beat
          } else if (targetNote === ',') {
            duration += beat / 2
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

/**
 * 获取解析后的简谱演奏总时长
 * @param notationResult
 * @param speed
 */
export function getNotationTotalDuration(notationResult: TreatedNotation[], speed: number) {
  let duration = 0
  notationResult.forEach(treatedNotationItem => {
    duration += treatedNotationItem.duration * speed
  })
  return duration
}

