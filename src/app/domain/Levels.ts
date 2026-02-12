import {Difficulty, none, u1, u2, u3, u4} from "./Difficulty";

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

export function toFirstDiff(levels: Levels): Difficulty {
  return levels?.u1 ? u1 : levels?.u2 ? u2 : levels?.u3 ? u3 : levels?.u4 ? u4 : none
}

export function anySelected(levels: Levels): boolean {
  return levels.u1 || levels.u2 || levels.u3 || levels.u4
}

export function fromDiff(difficulty: Difficulty) {
  return {
    u1: difficulty == "U1",
    u2: difficulty == "U2",
    u3: difficulty == "U3",
    u4: difficulty == "U4"
  }
}
