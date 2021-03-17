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
  Blow = 'Blow',
  Draw = 'Draw',
  // 超吹
  OverBlow = 'OverBlow',
  // 压音
  OverBend = 'OverBend',
  // 超吸
  OverDraw = 'OverDraw'
}

// 口琴主题色
export const HarmonicaBubbleColor: object = {
  [DisplayType.Blow]: '#caa78d',
  [DisplayType.Draw]: '#cca085',
  [DisplayType.OverBlow]: '#28afb0',
  [DisplayType.OverDraw]: '#5f7880',
  [DisplayType.OverBend]: '#d3d5d4',
}

// 口琴音色
export const HARMONICA_WEBFONT: object = {
  path: 'https://blog-oss-file.oss-cn-shanghai.aliyuncs.com/blog-fileimages/audioFont/harmonica1.js',
  name: '_tone_0220_Aspirin_sf2_file',
  // path: 'https://surikov.github.io/webaudiofontdata/sound/0220_SoundBlasterOld_sf2.js',
  // name: '_tone_0220_SoundBlasterOld_sf2'
}

export const DEMO_WEBFONT_LIST: Array<object> = [
  {
    path: 'https://blog-oss-file.oss-cn-shanghai.aliyuncs.com/blog-fileimages/audioFont/gangqing.js',
    value: '_tone_0000_Chaos_sf2_file',
    name: '钢琴'
  },
  {
    path: 'https://blog-oss-file.oss-cn-shanghai.aliyuncs.com/blog-fileimages/audioFont/harmonica1.js',
    value: '_tone_0220_Aspirin_sf2_file',
    name: '口琴'
  },
  {
    path: 'https://blog-oss-file.oss-cn-shanghai.aliyuncs.com/blog-fileimages/audioFont/jita.js',
    value: '_tone_0240_Aspirin_sf2_file',
    name: '吉他'
  },
  {
    path: 'https://blog-oss-file.oss-cn-shanghai.aliyuncs.com/blog-fileimages/audioFont/changdi.js',
    value: '_tone_0730_Aspirin_sf2_file',
    name: '长笛'
  },
]
