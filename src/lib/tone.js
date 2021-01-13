/**
 * A1: 21 A2: 33 A3: 45 A4: 57 A5: 69 A6: 81 A7: 93 A8: 105
 * A#1:22 A#2: 34 A#3: 46 A#4: 58 A#5: 70 A#6: 82 A#7: 94 A#8: 106
 * B1: 23 B2: 35 B3: 47 B4: 59 B5: 71 B6: 83 B7: 95 B8: 107
 * C1: 12 C2: 24 C3: 36 C4: 48 C5: 60 C6: 72 C7: 84 C8: 96
 * C#1: 13 C#2: 25 C#3: 37 C#4: 49 C#5: 61 C#6: 73 C#7: 85 C#8: 97
 * D1: 14 D2: 26 D3: 38 D4: 50 D5: 62 D6: 74 D7: 86 D8: 98
 * D#1: 15 D#2: 27 D#3: 39 D#4: 51 D#5: 63 D#6: 75 D#7: 87 D#8: 99
 * E1: 16 E2: 28 E3: 40 E4: 52 E5: 64 E6: 76 E7: 88 E8: 100
 * F1: 17 F2: 29 F3: 41 F4: 53 F5: 65 F6: 77 F7: 89 F8: 101
 * F#1: 18 F#2: 30 F#3: 42 F#4: 54 F#5: 66 F#6: 78 F#7: 90 F#8: 102
 * G1: 19 G2: 31 G3: 43 G4: 55 G5: 67 G6: 79 G7: 91 G8: 103
 * G#1: 20 G#2: 32 G#3: 44 G#4: 56 G#5: 68 G#6: 80 G#7: 92 G#8: 104
 * @returns {{}}
 */
const tone = () => {
  const originTone = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ]
  const result = {}
  for (let i = 1; i < 9; i++) {
    originTone.forEach((toneItem, toneIndex) => {
      result[`${toneItem}${i}`] = 12 * i + toneIndex
    })
  }
  return result
}

export default tone()
