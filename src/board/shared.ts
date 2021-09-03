export function isInsideBoard (x: number, y: number, size: number) {
  return y >= 0 && x >= 0 && y < size && x < size
}