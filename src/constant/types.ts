export interface DurationItem {
  duration: number;
  // status: 'success' | 'exception' | 'active';
  // updateTime: string;
  // title: string;
  // desc: string;
}

export interface NotationItem {
  speed: number;
  beat: number;
  sheetMusic: string;
  detail: {
    name: string;
    author: string;
    image: string;
  };
}

export interface TreatedNotation {
  note: string,
  duration: number
}
