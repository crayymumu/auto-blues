/**
 * 节拍标准
 */
export const BarStandard: object = {
  semibreve: {
    multiple: 4
  },
  minim: {
    multiple: 2
  },
  dottedCrotchet: {
    multiple: 1
  },
  quaver: {
    multiple: 1 / 2
  },
  semiquaver: {
    multiple: 1 / 4
  },
  demisemiquaver: {
    multiple: 1 / 8
  },
  hemidemisemiquaver: {
    multiple: 1 / 16
  }
}

// 口琴演奏种类
export enum DisplayType {
  Blow = 'blow',
  Draw = 'draw',
  // 超吹
  OverBlow = 'overBlow',
  // 压音
  OverBend = 'OverBend',
  // 超吸
  OverDraw = 'overDraw'
}

// 口琴主题色
export const HarmonicaBubbleColor: object = {
  [DisplayType.Blow]: '#ddcecd',
  [DisplayType.Draw]: '#eee5e5',
  [DisplayType.OverBlow]: '#28afb0',
  [DisplayType.OverDraw]: '#575B49',
  [DisplayType.OverBend]: '#19647e',
}
