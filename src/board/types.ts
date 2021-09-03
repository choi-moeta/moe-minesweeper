import type { char_bomb, char_empty } from "src/utils/constants" 

export type GameEndStatus = 'win' | 'lose'

export type Pos = [number, number]

export type BombsAroundNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type BombsAroundString = `${BombsAroundNumber}` | typeof char_empty

export type Bomb = {
  type: 'bomb'
  text: typeof char_bomb
}

export type EmptyCell = {
  type: 'empty'
  text: BombsAroundString
}

export type Cell = {
  status: 'hidden' | 'open' | 'marked',
} & (Bomb | EmptyCell)

export type Board = Cell[][]

export type RoundedClasses = {
  tr: string
  br: string
  bl: string
  tl: string
} 