export interface DurationItem {
  duration: number;
  // status: 'success' | 'exception' | 'active';
  // updateTime: string;
  // title: string;
  // desc: string;
}

export interface NotationItem {
  speed: number,
  sheetMusic: string,
  detail: { name: string; author: string; }
  // detail: {
  //   [string:string]: {
  //     name: string,
  //     author: string,
  //   }
  //   // name: string;
  //   // author: string,
  // }
}
