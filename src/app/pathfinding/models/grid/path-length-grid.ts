import { tileAt, initGrid, setTileAt } from "./grid";

export type PathLengthGrid = number[][];

export const LENGTH_NOT_CALCULATED_YET = Number.POSITIVE_INFINITY;

export function initPathLengthGrid(height: number, width: number) {
    return initGrid(height, width, LENGTH_NOT_CALCULATED_YET);
}

export function pathLengthAt(grid: PathLengthGrid, row: number, col: number) {
    return tileAt(grid, row, col);
}

export function setPathLengthAt(grid: PathLengthGrid, row: number, col: number, length: number) {
    setTileAt(grid, row, col, length);
}