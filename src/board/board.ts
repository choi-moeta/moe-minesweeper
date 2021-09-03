import { char_bomb, char_empty } from "src/utils/constants"
import type { Board, BombsAroundString, Cell, Pos } from "./types"
import { sides } from "./constants"
import { isInsideBoard } from "./shared"

export function printBoard(board: Board, showHidden = false) {
  if (!board) return

  if (showHidden)
    console.table(board.map(row => row.map(el => el.text)))
  else
    console.table(board.map(row => row.map(el => el.status == 'open' ? el.text : '?')))
}

function createEmptyCell(): Cell {
  return {
    type: 'empty',
    text: char_empty,
    status: 'hidden',
  }
}

function createBomb(): Cell {
  return {
    type: 'bomb',
    text: char_bomb,
    status: 'hidden',
  }
}

function copyBoard(board: Board) {
  let size = board.length
  return new Array(size)
    .fill(0)
    .map((_, y) => new Array(size)
      .fill(0)
      .map((_, x) => ({ ...board[y][x] }))
    )
}

export function createBoard(size: number, bombs: number) {
  // create board of empty cells
  let board = new Array(size)
    .fill(0)
    .map(() => new Array(size)
      .fill(0)
      .map(() => createEmptyCell())
    )

  // insert bombs
  let occupiedSpots: string[] = []
  for (let i = 0; i < bombs; i++) {
    let rnd = () => Math.floor(Math.random() * size)
    let [x, y] = [rnd(), rnd()]
    
    if (occupiedSpots.includes(String([x, y])))
      i--
    else
      board[y][x] = createBomb()

    occupiedSpots.push(String([x, y]))
  }

  // set text to bombs around
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let cell = board[y][x]

      if (cell.type == 'bomb')
        continue

      let bombsAround = 0
      for (let [dx, dy] of sides) {
        if (isInsideBoard(x + dx, y + dy, size)) {
          let adjCell = board[y + dy][x + dx]

          if (adjCell.type == 'bomb')
            bombsAround++
        }
      }

      cell.text = String(bombsAround) as BombsAroundString
    }
  }

  return board
}

export function clickBoard(board: Board, pos: Pos) {
  let [x, y] = pos
  if (board[y][x].status == 'marked')
    return board

  let boardCopy = copyBoard(board)
  let size = board.length
  let toCheck = [pos]

  let safe = 10000
  while(toCheck.length && safe--) {
    let [x, y] = toCheck.pop()
    let cell = boardCopy[y][x]

    if (cell.status == 'open')
      continue

    if (cell.status != 'marked' && cell.type != 'bomb')
      cell.status = 'open'

    for (let [dx, dy] of sides) {
      if (
        isInsideBoard(x + dx, y + dy, size)
        && cell.type != 'bomb'
        && cell.status != "marked"
        && cell.text == '0'
      ) {
        toCheck.push([x + dx, y + dy])
      }
    }
  }

  return boardCopy
}

export function markBoard(board: Board, [x, y]: Pos) {
  let boardCopy = copyBoard(board)
  let cell = boardCopy[y][x]

  if (cell.status == 'marked') {
    cell.status = 'hidden'
  } else {
    cell.status = 'marked'
  }

  return boardCopy
}

export function showAllBombs(board: Board) {
  return copyBoard(board).map(row => row.map(el => ({...el, status: el.type == 'bomb' ? 'open' : el.status})))
}

export function isWon(board: Board) {
  return !board.find(row => row.find(el => el.type == 'empty' && el.status == 'hidden'))
}

export function isLose(board: Board, [x, y]: Pos) {
  return board[y][x].type == 'bomb'
}
