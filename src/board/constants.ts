export let sides = [
  [-1,-1],
  [-1,0],
  [-1,1],
  [0,-1],
  [0,1],
  [1,-1],
  [1,0],
  [1,1]
] as const

export let rounded_classes = {
  tr: 'rounded-tr-xl',
  br: 'rounded-br-xl',
  bl: 'rounded-bl-xl',
  tl: 'rounded-tl-xl',
} as const