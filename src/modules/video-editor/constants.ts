export enum Rotate {
  D90 = '1',
  D180 = '2',
  D270 = '3',
}

export enum Flip {
  Horizontal = 'hflip',
  Vertical = 'vflip',
}

export enum FfmpegEvent {
  Edit = 'edit',
  Merge = 'merge',
  TrimBlankBorder = 'trim-blank-border',
  TakeScreenshot = 'take-screenshot',
}

export enum ProcessEvent {
  Start = 'start',
  End = 'end',
  Error = 'error',
}
