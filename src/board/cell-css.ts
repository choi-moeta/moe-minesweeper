import { rounded_classes } from "./constants";
import { isInsideBoard } from "./shared";
import type { Board, Pos, RoundedClasses } from "./types";

export function cellCss(board: Board, [x, y]: Pos, classes?: RoundedClasses) {
  classes = classes ?? rounded_classes

  let css = [];
  let size = board.length
  let cell = board[y][x];

  let isInsideAndOpenOrOutside = (x, y) =>  isInsideBoard(x, y, size) ? isInsideBoard(x, y, size) && board[y][x].status == 'open' : true
  let isInsideAndHidden = (x, y) =>  isInsideBoard(x, y, size) && board[y][x].status != 'open'

  if (cell.status != 'open') {
    if (isInsideAndOpenOrOutside(x, y - 1) && isInsideAndOpenOrOutside(x + 1, y) && !isInsideAndHidden(x + 1, y - 1)) {
      css.push(classes.tr)
    }
    if (isInsideAndOpenOrOutside(x, y + 1) && isInsideAndOpenOrOutside(x + 1, y) && !isInsideAndHidden(x + 1, y + 1)) {
      css.push(classes.br)
    }
    if (isInsideAndOpenOrOutside(x, y + 1) && isInsideAndOpenOrOutside(x - 1, y) && !isInsideAndHidden(x - 1, y + 1)) {
      css.push(classes.bl)
    }
    if (isInsideAndOpenOrOutside(x, y - 1) && isInsideAndOpenOrOutside(x - 1, y) && !isInsideAndHidden(x - 1, y - 1)) {
      css.push(classes.tl)
    }
  }
  else if (cell.status == 'open') {
    if (isInsideAndHidden(x, y - 1) && isInsideAndHidden(x + 1, y)) {
      css.push(classes.tr)
    }
    if (isInsideAndHidden(x, y + 1) && isInsideAndHidden(x + 1, y)) {
      css.push(classes.br)
    }
    if (isInsideAndHidden(x, y + 1) && isInsideAndHidden(x - 1, y)) {
      css.push(classes.bl)
    }
    if (isInsideAndHidden(x, y - 1) && isInsideAndHidden(x - 1, y)) {
      css.push(classes.tl)
    }
  }

  return css.join(' ')
}
