export interface Levels {
  u1: boolean
  u2: boolean
  u3: boolean
  u4: boolean
}

export function toCode(levels: Levels): string {
  return levels?.u1 ? '1' : ''
    .concat(levels?.u2 ? '2' : '')
    .concat(levels?.u3 ? '3' : '')
    .concat(levels?.u4 ? '4' : '')
}
