import {Difficulty} from "./Difficulty";

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

export function fromDiff(difficulty: Difficulty) {
  return {
    u1: difficulty == "UMPIRE_1",
    u2: difficulty == "UMPIRE_2",
    u3: difficulty == "UMPIRE_3",
    u4: difficulty == "UMPIRE_4"
  }
}
