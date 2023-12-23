import { tileAt, initGrid, setTileAt } from "./grid";

export type VisitedGrid = boolean[][];

export function initVisitedGrid(height: number, width: number) {
    return initGrid(height, width, false);
}

export function hasBeenVisitedAt(grid: VisitedGrid, row: number, col: number) {
    return tileAt(grid, row, col);
}

export function markVisitedAt(grid: VisitedGrid, row: number, col: number) {
    setTileAt(grid, row, col, true);
}
